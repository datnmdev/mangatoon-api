import { plainToClass } from 'class-transformer'
import { NextFunction, Request, Response } from 'express'

import { CreateViewDetailRequestDTO } from './dtos/createViewDetailRequest.dto'
import { ViewDetailService } from './viewDetail.service'
import { AppResponse } from '../../helpers/response.helper'
import { TransformerGroup } from './dtos/enums/group.enum'
import { GetViewOfChapterRequestParamDTO, GetViewOfChapterRequestQueryDTO } from './dtos/getViewOfChapterRequest.dto'
import { GetTopStoriesByViewCountRequestDTO } from './dtos/getTopStoriesByViewCountRequest.dto'
import { GetViewOfStoryRequestDTO } from './dtos/getViewOfStoryRequest.dto'

export class ViewDetailController {

    static createViewDetail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createViewDetailRequestData = plainToClass(CreateViewDetailRequestDTO, req.body)
            const isInserted = await ViewDetailService.createViewDetail(createViewDetailRequestData)
            if (isInserted) {
                return res.send(new AppResponse(true, null))
            }
            return res.send(new AppResponse(false, null))
        } catch (error) {
            return next(error)
        }
    }

    static getViewOfChapter = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getViewOfChapterRequestParamData = plainToClass(GetViewOfChapterRequestParamDTO, req.params, {
                groups: [
                    TransformerGroup.EXCLUDE
                ]
            })
            const getViewOfChapterRequestQueryData = plainToClass(GetViewOfChapterRequestQueryDTO, req.query, {
                groups: [
                    TransformerGroup.EXCLUDE
                ]
            })
            const viewCount = await ViewDetailService.getViewOfChapter(getViewOfChapterRequestParamData.chapterId, getViewOfChapterRequestQueryData)
            return res.send(new AppResponse({ viewCount }, null))
        } catch (error) {
            return next(error)
        }
    }

    static getTopStoriesByViewCount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getTopStoriesByViewCountRequestData = plainToClass(GetTopStoriesByViewCountRequestDTO, req.query, {
                groups: [
                    TransformerGroup.EXCLUDE
                ]
            })
            const data = await ViewDetailService.getTopStoriesByViewCount(getTopStoriesByViewCountRequestData)
            return res.send(new AppResponse(data, null))
        } catch (error) {
            return next(error)
        }
    }

    static getViewOfStory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getViewOfStoryRequestData = plainToClass(GetViewOfStoryRequestDTO, req.params, {
                groups: [
                    TransformerGroup.EXCLUDE
                ]
            })
            const data = await ViewDetailService.getViewOfStory(getViewOfStoryRequestData.storyId)
            return res.send(new AppResponse(data[0], null))
        } catch (error) {
            return next(error)
        }
    }

}