import { Op } from 'sequelize'

import { Models, sequelize } from '../../database/mysql.config'
import { CreateViewDetailRequestDTO } from './dtos/createViewDetailRequest.dto'
import { GetViewOfChapterRequestQueryDTO } from './dtos/getViewOfChapterRequest.dto'
import { GetTopStoriesByViewCountRequestDTO } from './dtos/getTopStoriesByViewCountRequest.dto'

export class ViewDetailService {

    static createViewDetail = async (viewDetailData: CreateViewDetailRequestDTO) => {
        const mostRecentViewDetail = await Models.viewDetail.findAll({
            where: {
                chapterId: viewDetailData.chapterId,
                clientId: viewDetailData.clientId
            },
            order: [
                ['createdAt', 'DESC']
            ],
            limit: 1
        })

        if (mostRecentViewDetail.length > 0) {
            if (Date.now() - mostRecentViewDetail[0].dataValues.createdAt.getTime() > 2 * 60 * 1000) {
                await Models.viewDetail.create(viewDetailData)
                return true
            } else {
                return false
            }
        }

        await Models.viewDetail.create(viewDetailData)
        return true
    }

    static getViewOfChapter = async (chapterId: number, queries: GetViewOfChapterRequestQueryDTO) => {
        const viewCount = await Models.viewDetail.findAndCountAll({
            where: {
                chapterId,
                createdAt: {
                    [Op.gte]: queries.from,
                    [Op.lte]: queries.to
                }
            }
        })
        return viewCount.count
    }

    static getTopStoriesByViewCount = (queries: GetTopStoriesByViewCountRequestDTO) => {
        const from = queries.from.toISOString().slice(0, 19).replace('T', ' ')
        const to = queries.to.toISOString().slice(0, 19).replace('T', ' ')
        return sequelize.query('CALL GetTopStoriesByViewCount(:from_date, :to_date, :page, :limit)', {
            replacements: {
                'from_date': from,
                'to_date': to,
                page: queries.page,
                limit: queries.limit
            }
        })
    }

    static getViewOfStory = (storyId: number) => {
        return sequelize.query('CALL GetTotalViewOfStory(:storyId)', {
            replacements: {
                storyId
            }
        })
    }

}