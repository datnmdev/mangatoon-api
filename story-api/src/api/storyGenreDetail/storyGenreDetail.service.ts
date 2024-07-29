import { Exclude, plainToClass } from 'class-transformer'

import { Models } from '../../database/mysql.config'
import { CreateStoryGenreDetailRequestDTO } from './dtos/createStoryGenreDetail.dto'
import { DeleteStoryGenreDetailRequestDTO } from './dtos/deleteStoryGenreDetailRequest.dto'
import { GetStoryGenreDetailRequestDTO } from './dtos/getStoryGenreDetail.dto'

export class StoryGenreDetailService {

    static createStoryGenreDetail = (storyGenreDetailData: CreateStoryGenreDetailRequestDTO) => {
        return Models.storyGenreDetail.create(storyGenreDetailData)
    }

    static deleteStoryGenreDetail = (storyGenreDetailData: DeleteStoryGenreDetailRequestDTO) => {
        return Models.storyGenreDetail.destroy({
            where: {
                ...storyGenreDetailData
            }
        })
    }

    static getStoryGenreDetail = (queries: GetStoryGenreDetailRequestDTO) => {
        return Models.storyGenreDetail.findAndCountAll({
            include: [
                {
                    model: Models.story,
                    as: 'story'
                },
                {
                    model: Models.genre,
                    as: 'genre'
                }
            ],
            attributes: {
                exclude: [
                    'storyId',
                    'genreId'
                ]
            },
            where: {
                ...plainToClass(Object, {
                    genreId: queries?.genreId,
                    storyId: queries?.storyId,
                    '$story.status$': queries?.status,
                    '$story.countryId$': queries?.countryId
                }, {
                    exposeUnsetFields: false
                })
            },
            order: [
                [
                    { 
                        model: Models.story, 
                        as: 'story' 
                    },
                    'updatedAt',
                    'DESC'
                ]
            ],
            offset: (queries.page - 1) * queries.limit,
            limit: queries.limit
        })
    }
}