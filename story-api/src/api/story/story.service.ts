import { plainToClass } from 'class-transformer'
import { Op, Sequelize } from 'sequelize'

import { Models } from '../../database/mysql.config'
import { CreateStoryRequestDTO } from './dtos/createStoryRequest.dto'
import { UpdateStoryRequestBodyDTO } from './dtos/updateStoryRequest.dto'
import { GetStoriesRequestDTO } from './dtos/getStoriesRequest.dto'
import { SearchStoryRequestDTO } from './dtos/searchStoriesRequest.dto'

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

}