import { NextFunction, Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { validateOrReject } from 'class-validator'

import { Errors } from '../../helpers/error.helper'
import { CreateStoryPriceHistoryRequestDTO } from './dtos/createStoryPriceHistoryRequest.dto'
import { GetStoryPriceHistoryRequestDTO } from './dtos/getStoryPriceHistoryRequest.dto'
import { GetStoryPriceAtPresentRequestDTO } from './dtos/getStoryPriceAtPresentRequest.dto'

export class StoryPriceHistoryValidation {

    static createStoryPriceHistory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createStoryPriceHistoryRequestData = plainToClass(CreateStoryPriceHistoryRequestDTO, req.body)
            await validateOrReject(createStoryPriceHistoryRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static getStoryPriceHistory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getStoryPriceHistoryRequestData = plainToClass(GetStoryPriceHistoryRequestDTO, req.query)
            await validateOrReject(getStoryPriceHistoryRequestData)
            return next()
        } catch (error) {
            return next(error)
        }
    }

    static getStoryPriceAtPresent = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getStoryPriceAtPresentRequestData = plainToClass(GetStoryPriceAtPresentRequestDTO, req.params)
            await validateOrReject(getStoryPriceAtPresentRequestData)
            return next()
        } catch (error) {
            return next(error)
        }
    }

}