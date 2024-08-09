import { plainToClass } from 'class-transformer'
import { Op, Sequelize } from 'sequelize'

import { Models, sequelize } from '../../database/mysql.config'
import { CreateStoryRequestDTO } from './dtos/createStoryRequest.dto'
import { UpdateStoryRequestBodyDTO } from './dtos/updateStoryRequest.dto'
import { GetStoriesRequestDTO } from './dtos/getStoriesRequest.dto'
import { SearchStoryRequestDTO } from './dtos/searchStoriesRequest.dto'
import { GetTopChartDataReqDTO } from './dtos/getTopChartDataReq.dto'
import moment from 'moment'
import { generateSignedUrl } from '../../helpers/signingUrl.helper'
import { getStorage } from 'firebase-admin/storage'
import { getMillisecondsToRoundedTime } from '../../helpers/time.helper'

export class StoryService {

    static createStory = (storyData: CreateStoryRequestDTO) => {
        return Models.story.create(storyData)
    }

    static updateStory = (id: number, storyData: UpdateStoryRequestBodyDTO) => {
        return Models.story.update(plainToClass(Object, storyData, {
            exposeUnsetFields: false
        }), {
            where: {
                id
            }
        })
    }

    static getStories = (queries: GetStoriesRequestDTO) => {
        return Models.story.findAndCountAll({
            where: {
                ...plainToClass(Object, plainToClass(GetStoriesRequestDTO, queries), {
                    exposeUnsetFields: false
                }),
                status: {
                    [Op.or]: queries.status instanceof Number ? [queries.status] : queries.status
                }
            },
            order: [
                ['updatedAt', 'DESC']
            ],
            offset: (queries.page - 1) * queries.limit,
            limit: queries.limit
        })
    }

    static searchStories = async (queries: SearchStoryRequestDTO) => {
        if (queries.keyword == '') {
            return Models.story.findAndCountAll({
                where: {
                    status: {
                        [Op.or]: queries.status instanceof Number ? [queries.status] : queries.status
                    }
                },
                order: [
                    ['updatedAt', 'DESC']
                ],
                offset: (queries.page - 1) * queries.limit,
                limit: queries.limit
            })
        }

        if (!isNaN(Number(queries.keyword))) {
            return Models.story.findAndCountAll({
                where: {
                    [Op.and]: [
                        {
                            [Op.or]: [
                                Sequelize.literal(`MATCH (title) AGAINST ('${queries.keyword}')`),
                                {
                                    id: Number(queries.keyword)
                                }
                            ]
                        },
                        {
                            status: {
                                [Op.or]: queries.status instanceof Number ? [queries.status] : queries.status
                            }
                        }
                    ]
                },
                offset: (queries.page - 1) * queries.limit,
                limit: queries.limit
            })
        }

        return Models.story.findAndCountAll({
            where: {
                [Op.and]: [
                    Sequelize.literal(`MATCH (title) AGAINST ('${queries.keyword}')`),
                    {
                        status: {
                            [Op.or]: queries.status instanceof Number ? [queries.status] : queries.status
                        }
                    }
                ]
            },
            offset: (queries.page - 1) * queries.limit,
            limit: queries.limit
        })
    }

    static getTopChartData = async (queries: GetTopChartDataReqDTO) => {
        // Lấy top 3 bộ truyện có lượt xem cao nhất hiện tại
        const topThreeStories: any[] = (await sequelize.query('CALL GetViewCountOfStory(:startDateTime,:endDateTime,:storyId)', {
            replacements: {
                startDateTime: '1970-01-01 00:00:00',
                endDateTime: moment(getMillisecondsToRoundedTime()).format('YYYY-MM-DD HH:mm:ss'),
                storyId: null
            }
        })).slice(0, 3)

        // Tính tổng lượt xem tại mõi thời điểm
        const data: Array<{ storyId: number, data: number[] }> = []
        for (let story of topThreeStories) {
            let from = queries.from
            const viewArr = []
            while (from <= queries.to) {
                const viewCount: any = (await sequelize.query('CALL GetViewCountOfStory(:startDateTime,:endDateTime,:storyId)', {
                    replacements: {
                        startDateTime: from === queries.from ? '1970-01-01 00:00:00' : moment(from - queries.step).format('YYYY-MM-DD HH:mm:ss'),
                        endDateTime: moment(from).format('YYYY-MM-DD HH:mm:ss'),
                        storyId: story.storyId
                    }
                }))[0]
                viewArr.push(viewCount !== undefined ? viewCount.count : 0)
                from += queries.step
            }
            data.push({
                storyId: story.storyId,
                data: viewArr
            })
        }

        // Tính tỉ lệ trung bình lượt xem tại mỗi thời điểm
        const result: Array<{ storyId: number, title?: string, status?: number, coverImageUrl?: string, data: number[] }> = []
        let rowIndex = 0
        for (let dataRow of data) {
            const storyInfo = await Models.story.findByPk(dataRow.storyId)
            const _data = dataRow.data.map((viewCount, index) => {
                if (rowIndex != 2) {
                    return Math.ceil(viewCount * 100 / (data[0].data[index] + data[1].data[index] + data[2].data[index]))
                } else {
                    return 100 - result[0].data[index] - result[1].data[index]
                }
            })

            result.push({
                storyId: dataRow.storyId,
                title: storyInfo!.dataValues.title,
                status: storyInfo!.dataValues.status,
                coverImageUrl: generateSignedUrl({
                    url: storyInfo!.dataValues.coverImageUrl.startsWith('http')
                        ? storyInfo!.dataValues.coverImageUrl
                        : (await getStorage().bucket().file(storyInfo!.dataValues.coverImageUrl).getSignedUrl({
                            action: 'read',
                            expires: Date.now() + 5 * 60 * 1000
                        }))[0],
                    expireAt: Date.now() + 5 * 60 * 1000
                }),
                data: _data
            })
            ++rowIndex
        }

        return result
    }

}