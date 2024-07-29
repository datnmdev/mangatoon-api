import { plainToClass } from 'class-transformer'
import { Sequelize, Transaction } from 'sequelize'

import { CreateChapterRequestDTO } from './dtos/createChapterRequest.dto'
import { Models } from '../../database/mysql.config'
import { UpdateChapterRequestBodyDTO } from './dtos/updateChapterRequest.dto'
import { GetChapterRequestDTO } from './dtos/getChapterRequest.dto'
import { TransformerGroup } from './dtos/enums/group.enum'
import { SearchChapterReqDTO } from './dtos/searchChapterRequest.dto'
import { Op } from 'sequelize'
import { ChapterStatus } from '../../enums/chapter.enum'

export class ChapterService {

    static createChapter = (chapterData: CreateChapterRequestDTO, transaction?: Transaction) => {
        return Models.chapter.create(chapterData, {
            transaction
        })
    }

    static updateChapter = (id: number, chapterData: UpdateChapterRequestBodyDTO) => {
        return Models.chapter.update(plainToClass(Object, chapterData, {
            exposeUnsetFields: false
        })
            , {
                where: {
                    id
                }
            })
    }

    static getChapter = (queries: GetChapterRequestDTO) => {
        return Models.chapter.findAndCountAll({
            where: {
                ...plainToClass(Object, plainToClass(GetChapterRequestDTO, queries, {
                    groups: [
                        TransformerGroup.EXCLUDE
                    ]
                }), {
                    exposeUnsetFields: false
                }),
                status: ChapterStatus.RELEASED
            },
            order: [
                ['order', 'DESC']
            ],
            offset: (queries.page - 1) * queries.limit,
            limit: queries.limit
        })
    }

    static searchChapter = async (queries: SearchChapterReqDTO) => {
        if (queries.keyword == '') {
            return Models.chapter.findAndCountAll({
                where: {
                    status: {
                        [Op.or]: queries.status instanceof Number ? [queries.status] : queries.status
                    },
                    storyId: queries.storyId
                },
                order: [
                    ['order', 'DESC']
                ],
                offset: (queries.page - 1) * queries.limit,
                limit: queries.limit
            })
        }

        if (!isNaN(Number(queries.keyword))) {
            return Models.chapter.findAndCountAll({
                where: {
                    [Op.and]: [
                        {
                            [Op.or]: [
                                Sequelize.literal(`MATCH (name) AGAINST ('${queries.keyword}')`),
                                {
                                    id: Number(queries.keyword)
                                },
                                {
                                    order: Number(queries.keyword)
                                }
                            ]
                        },
                        {
                            status: {
                                [Op.or]: queries.status instanceof Number ? [queries.status] : queries.status
                            }
                        },
                        {
                            storyId: queries.storyId
                        }
                    ]
                },
                offset: (queries.page - 1) * queries.limit,
                limit: queries.limit
            })
        }

        return Models.chapter.findAndCountAll({
            where: {
                [Op.and]: [
                    Sequelize.literal(`MATCH (name) AGAINST ('${queries.keyword}')`),
                    {
                        status: {
                            [Op.or]: queries.status instanceof Number ? [queries.status] : queries.status
                        }
                    },
                    {
                        storyId: queries.storyId
                    }
                ]
            },
            offset: (queries.page - 1) * queries.limit,
            limit: queries.limit
        })
    }
}