import { plainToClass } from 'class-transformer'
import { NextFunction, Request, Response } from 'express'
import path from 'path'

import { CreateStoryRequestDTO } from './dtos/createStoryRequest.dto'
import { validateOrReject } from 'class-validator'
import { Errors, handler } from '../../helpers/error.helper'
import { FsHelper } from '../../helpers/fs.helper'
import { UpdateStoryRequestBodyDTO, UpdateStoryRequestParamDTO } from './dtos/updateStoryRequest.dto'
import { GetStoriesRequestDTO } from './dtos/getStoriesRequest.dto'
import { SearchStoryRequestDTO } from './dtos/searchStoriesRequest.dto'
import TransformGroup from './dtos/transform.group'
import { GetTopChartDataReqDTO } from './dtos/getTopChartDataReq.dto'

export class StoryValidation {

    static createStory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createStoryRequestData = plainToClass(CreateStoryRequestDTO, {
                coverImageUrl: req.file?.path,
                ... req.body
            } as CreateStoryRequestDTO)
            await validateOrReject(createStoryRequestData)
            return next()
        } catch (error) {
            handler(async () => {
                if (req.file) {
                    await FsHelper.deleteFile(req.file.path)
                }
            })
            return next(Errors.BadRequest)
        }
    }

    static updateStory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updateStoryRequestParamData = plainToClass(UpdateStoryRequestParamDTO, req.params)
            const updateStoryRequestBodyData = plainToClass(UpdateStoryRequestBodyDTO, {
                coverImageUrl: req.file?.path,
                ...req.body
            } as UpdateStoryRequestBodyDTO)
            await validateOrReject(updateStoryRequestParamData)
            await validateOrReject(updateStoryRequestBodyData)
            return next()
        } catch (error) {
            handler(async () => {
                if (req.file) {
                    await FsHelper.deleteFile(req.file.path)
                }
            })
            return next(Errors.BadRequest)
        }
    }

    static getStories = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getStoriesRequestData = plainToClass(GetStoriesRequestDTO, req.query, {
                groups: [
                    TransformGroup.EXPOSE_PAGINATION,
                    TransformGroup.EXPOSE_STATUS
                ],
                exposeDefaultValues: true
            })
            await validateOrReject(getStoriesRequestData)
            return next()
        } catch (error) {           
            return next(Errors.BadRequest)
        }
    }

    static searchStories = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const searchStoryRequestData = plainToClass(SearchStoryRequestDTO, req.query)
            await validateOrReject(searchStoryRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static getTopChartData = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getTopChartDataRequestData = plainToClass(GetTopChartDataReqDTO, req.query)
            await validateOrReject(getTopChartDataRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

}