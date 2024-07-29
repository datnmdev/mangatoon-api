import { plainToClass } from 'class-transformer'
import { Op } from 'sequelize'

import { Models } from '../../database/mysql.config'
import { CreateStoryPriceHistoryRequestDTO } from './dtos/createStoryPriceHistoryRequest.dto'
import { GetStoryPriceHistoryRequestDTO } from './dtos/getStoryPriceHistoryRequest.dto'

export class StoryPriceHistoryService {

    static createStoryPriceHistory = (storyPriceHistoryData: CreateStoryPriceHistoryRequestDTO) => {
        return Models.storyPriceHistory.create(storyPriceHistoryData)
    }

    static findStoryPriceHistoryByStartTime = (startTime: Date) => {
        return Models.storyPriceHistory.findAndCountAll({
            where: {
                startTime
            }
        })
    }

    static getStoryPriceHistory = (queries: GetStoryPriceHistoryRequestDTO) => {
        return Models.storyPriceHistory.findAll({
            where: {
                ...plainToClass(Object, queries, {
                    exposeUnsetFields: false
                })
            }
        })
    }

    static getStoryPriceAtPresent = async (storyId: number) => {
        const res = await Models.storyPriceHistory.findAll({
            where: {
                storyId,
                startTime: {
                    [Op.lte]: new Date()
                }
            },
            order: [
                ['startTime', 'DESC']
            ],
            limit: 1
        })
        return res?.[0] ? res[0] : null
    }
 
}