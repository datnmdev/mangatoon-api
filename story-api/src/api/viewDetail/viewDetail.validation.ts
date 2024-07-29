import { NextFunction, Request, Response } from 'express'
import { validateOrReject } from 'class-validator'
import { plainToClass } from 'class-transformer'

import { Errors } from '../../helpers/error.helper'
import { CreateViewDetailRequestDTO } from './dtos/createViewDetailRequest.dto'
import { GetViewOfChapterRequestParamDTO, GetViewOfChapterRequestQueryDTO } from './dtos/getViewOfChapterRequest.dto'
import { GetTopStoriesByViewCountRequestDTO } from './dtos/getTopStoriesByViewCountRequest.dto'
import { GetViewOfStoryRequestDTO } from './dtos/getViewOfStoryRequest.dto'

export class ViewDetailValidation {

    static createViewDetail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createViewDetailRequestData = plainToClass(CreateViewDetailRequestDTO, req.body)
            await validateOrReject(createViewDetailRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static getViewOfChapter = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getViewOfChapterRequestParamData = plainToClass(GetViewOfChapterRequestParamDTO, req.params)
            const getViewOfChapterRequestQueryData = plainToClass(GetViewOfChapterRequestQueryDTO, req.query)
            await validateOrReject(getViewOfChapterRequestParamData)
            await validateOrReject(getViewOfChapterRequestQueryData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static getTopStoriesByViewCount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getTopStoriesByViewCountRequestData = plainToClass(GetTopStoriesByViewCountRequestDTO, req.query)
            await validateOrReject(getTopStoriesByViewCountRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static getViewOfStory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getViewOfStoryRequestData = plainToClass(GetViewOfStoryRequestDTO, req.params)
            await validateOrReject(getViewOfStoryRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

}