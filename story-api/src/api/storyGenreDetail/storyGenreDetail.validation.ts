import { validateOrReject } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { plainToClass } from 'class-transformer'

import { Errors } from '../../helpers/error.helper'
import { CreateStoryGenreDetailRequestDTO } from './dtos/createStoryGenreDetail.dto'
import { DeleteStoryGenreDetailRequestDTO } from './dtos/deleteStoryGenreDetailRequest.dto'
import { GetStoryGenreDetailRequestDTO } from './dtos/getStoryGenreDetail.dto'

export class StoryGenreDetailValidation {

    static createStoryGenreDetail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createStoryGenreDetailRequestData = plainToClass(CreateStoryGenreDetailRequestDTO, req.body)
            await validateOrReject(createStoryGenreDetailRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static deleteStoryGenreDetail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deleteStoryGenreDetailRequestData = plainToClass(DeleteStoryGenreDetailRequestDTO, req.body)
            await validateOrReject(deleteStoryGenreDetailRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static getStoryGenreDetails = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getStoryGenreDetailsRequestData = plainToClass(GetStoryGenreDetailRequestDTO, req.query)
            await validateOrReject(getStoryGenreDetailsRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

}