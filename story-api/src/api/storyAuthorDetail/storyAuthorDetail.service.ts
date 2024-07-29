import { plainToClass } from 'class-transformer'

import { Models } from '../../database/mysql.config'
import { GetStoryAuthorDetailRequestDTO } from './dtos/GetStoryAuthorDetailRequest.dto'
import { CreateStoryAuthorDetailRequestDTO } from './dtos/createStoryAuthorDetailRequest.dto'
import { DeleteStoryAuthorDetailRequestDTO } from './dtos/deleteStoryAuthorDetailRequest.dto'

export class StoryAuthorDetailService {

    static createStoryAuthorDetail = (storyAuthorDetailData: CreateStoryAuthorDetailRequestDTO) => {
        return Models.storyAuthorDetail.create(storyAuthorDetailData)
    }

    static deleteStoryAuthorDetail = (storyAuthorDetailId: DeleteStoryAuthorDetailRequestDTO) => {
        return Models.storyAuthorDetail.destroy({
            where: {
                ...storyAuthorDetailId
            }
        })
    }

    static getStoryAuthorDetail = (queries: GetStoryAuthorDetailRequestDTO) => {
        return Models.storyAuthorDetail.findAndCountAll({
            include: [
                {
                    model: Models.story,
                    as: 'story'
                },
                {
                    model: Models.author,
                    as: 'author'    
                }
            ],
            attributes:{
                exclude:[
                    'storyId',
                    'authorId'
                ]
            },
            where: {
                ...plainToClass(Object, {
                    authorId: queries.authorId,
                    storyId: queries.storyId,
                    '$story.status$': queries.status
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