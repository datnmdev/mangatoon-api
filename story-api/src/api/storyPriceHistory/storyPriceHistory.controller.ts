import { plainToClass } from 'class-transformer'
import { NextFunction, Request, Response } from 'express'

import { CreateStoryPriceHistoryRequestDTO } from './dtos/createStoryPriceHistoryRequest.dto'
import { StoryPriceHistoryService } from './storyPriceHistory.service'
import { AppResponse } from '../../helpers/response.helper'
import { GetStoryPriceHistoryRequestDTO } from './dtos/getStoryPriceHistoryRequest.dto'
import { GetStoryPriceAtPresentRequestDTO } from './dtos/getStoryPriceAtPresentRequest.dto'

export class StoryPriceHistoryController {

    static createStoryPriceHistory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createStoryPriceHistoryRequestData = plainToClass(CreateStoryPriceHistoryRequestDTO, req.body)
            await StoryPriceHistoryService.createStoryPriceHistory(createStoryPriceHistoryRequestData)
            return res.send(new AppResponse(true, null))
        } catch (error) {
            return next(error)
        }
    }

    static getStoryPriceHistory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getStoryPriceHistoryRequestData = plainToClass(GetStoryPriceHistoryRequestDTO, req.query)
            const storyPriceHistory = await StoryPriceHistoryService.getStoryPriceHistory(getStoryPriceHistoryRequestData)
            return res.send(new AppResponse(storyPriceHistory, null))
        } catch (error) {
            return next(error)
        }
    }

    static getStoryPriceAtPresent = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getStoryPriceAtPresentRequestData = plainToClass(GetStoryPriceAtPresentRequestDTO, req.params)
            const storyPriceAtPresent = await StoryPriceHistoryService.getStoryPriceAtPresent(getStoryPriceAtPresentRequestData.storyId)
            return res.send(new AppResponse(storyPriceAtPresent, null))
        } catch (error) {
            return next(error)
        }
    }

}