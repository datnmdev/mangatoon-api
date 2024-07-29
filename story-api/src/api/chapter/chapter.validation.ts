import { NextFunction, Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { validateOrReject } from 'class-validator'

import { Errors } from '../../helpers/error.helper'
import { CreateChapterRequestDTO } from './dtos/createChapterRequest.dto'
import { UpdateChapterRequestBodyDTO, UpdateChapterRequestParamDTO } from './dtos/updateChapterRequest.dto'
import { GetChapterRequestDTO } from './dtos/getChapterRequest.dto'
import { TransformerGroup } from './dtos/enums/group.enum'
import { SearchChapterReqDTO } from './dtos/searchChapterRequest.dto'

export class ChapterValidation {

    static createChapter = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createChapterRequestData = plainToClass(CreateChapterRequestDTO, req.body)
            await validateOrReject(createChapterRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static updateChapter = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updateChapterRequestParamData = plainToClass(UpdateChapterRequestParamDTO, req.params)
            const updateChapterRequestBodyData = plainToClass(UpdateChapterRequestBodyDTO, req.body)
            await validateOrReject(updateChapterRequestParamData)
            await validateOrReject(updateChapterRequestBodyData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static getChapter = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getChapterRequestData = plainToClass(GetChapterRequestDTO, req.query, {
                groups: [
                    TransformerGroup.EXCLUDE_PAGE_LIMIT
                ]
            })            
            await validateOrReject(getChapterRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static searchChapter = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const searchChapterReqData = plainToClass(SearchChapterReqDTO, req.query)
            await validateOrReject(searchChapterReqData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

}