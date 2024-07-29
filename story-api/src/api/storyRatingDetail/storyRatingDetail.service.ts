import { plainToClass } from 'class-transformer'

import { Models, sequelize } from '../../database/mysql.config'
import { CreateStoryRatingDetailRequestDTO } from './dtos/createStoryRatingDetailRequest.dto'
import { GetStoryRatingDetailRequestDTO } from './dtos/getStoryRatingDetailRequest.dto'
import { UpdateStoryRatingDetailRequestDTO } from './dtos/updateStoryRatingDetailRequest.dto'
import { GetTopStoriesByRatingRequestDTO } from './dtos/getTopStoriesByRatingRequest.dto'

export class StoryRatingDetailService {

    static createStoryRatingDetail = (storyRatingDetailData: CreateStoryRatingDetailRequestDTO) => {
        return Models.storyRatingDetail.create(storyRatingDetailData)
    }

    static updateStoryRatingDetail = (storyRatingDetailData: UpdateStoryRatingDetailRequestDTO) => {
        return Models.storyRatingDetail.update({
            star: storyRatingDetailData.star
        }, {
            where: {
                storyId: storyRatingDetailData.storyId,
                userId: storyRatingDetailData.userId
            }
        })
    }

    static getStoryRatingDetail = (queries: GetStoryRatingDetailRequestDTO) => {
        return Models.storyRatingDetail.findAndCountAll({
            where: {
                ...plainToClass(Object, queries, {
                    exposeUnsetFields: false
                })
            }
        })
    }

    static getTopStoriesByRating = (queries: GetTopStoriesByRatingRequestDTO) => {
        return sequelize.query('CALL GetTopStoriesByRating(:page, :limit)', {
            replacements: {
                page: queries.page,
                limit: queries.limit
            }
        })
    }

    static getRatingOfStory = (storyId: number) => {
        return sequelize.query('CALL GetRatingOfStory(:storyId)', {
            replacements: {
                storyId
            }
        })
    }

}