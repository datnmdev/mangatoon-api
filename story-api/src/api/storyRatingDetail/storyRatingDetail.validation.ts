import { NextFunction, Request, Response } from 'express'
import { validateOrReject } from 'class-validator'
import { plainToClass } from 'class-transformer'

import { Errors } from '../../helpers/error.helper'
import { CreateStoryRatingDetailRequestDTO } from './dtos/createStoryRatingDetailRequest.dto'
import { UpdateStoryRatingDetailRequestDTO } from './dtos/updateStoryRatingDetailRequest.dto'
import { GetStoryRatingDetailRequestDTO } from './dtos/getStoryRatingDetailRequest.dto'
import { GetTopStoriesByRatingRequestDTO } from './dtos/getTopStoriesByRatingRequest.dto'
import { GetRatingOfStoryRequestDTO } from './dtos/getRatingOfStoryRequest.dto'

export class StoryRatingDetailValidation {

    static createStoryRatingDetail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createStoryRatingDetailRequestData = plainToClass(CreateStoryRatingDetailRequestDTO, req.body)
            await validateOrReject(createStoryRatingDetailRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static updateStoryRatingDetail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updateStoryRatingDetailRequestData = plainToClass(UpdateStoryRatingDetailRequestDTO, req.body)
            await validateOrReject(updateStoryRatingDetailRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static getStoryRatingDetail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getStoryRatingDetailRequestData = plainToClass(GetStoryRatingDetailRequestDTO, req.query)
            await validateOrReject(getStoryRatingDetailRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static getTopStoriesByRating = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getTopStoriesByRatingRequestData = plainToClass(GetTopStoriesByRatingRequestDTO, req.query)
            await validateOrReject(getTopStoriesByRatingRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static getRatingOfStory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getRatingOfStoryRequestData = plainToClass(GetRatingOfStoryRequestDTO, req.params)
            await validateOrReject(getRatingOfStoryRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }
    
}