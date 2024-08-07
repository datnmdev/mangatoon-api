import { plainToClass } from 'class-transformer'
import { NextFunction, Request, Response } from 'express'

import { CreateViewDetailRequestDTO } from './dtos/createViewDetailRequest.dto'
import { ViewDetailService } from './viewDetail.service'
import { AppResponse } from '../../helpers/response.helper'
import { TransformerGroup } from './dtos/enums/group.enum'
import { GetViewOfChapterRequestParamDTO, GetViewOfChapterRequestQueryDTO } from './dtos/getViewOfChapterRequest.dto'
import { GetTopStoriesByViewCountRequestDTO } from './dtos/getTopStoriesByViewCountRequest.dto'
import { GetViewOfStoryRequestDTO } from './dtos/getViewOfStoryRequest.dto'
import { generateSignedUrl } from '../../helpers/signingUrl.helper'
import { getStorage } from 'firebase-admin/storage'

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
            const rows = await ViewDetailService.getTopStoriesByViewCount(getTopStoriesByViewCountRequestData)
            const data = []
            for (let row of (rows as any[])) {
                data.push({
                    ...row,
                    coverImageUrl: generateSignedUrl({
                        url: row.coverImageUrl.startsWith('http')
                            ? row.coverImageUrl
                            : (await getStorage().bucket().file(row.coverImageUrl).getSignedUrl({
                                action: 'read',
                                expires: Date.now() + 5 * 60 * 1000
                            }))[0],
                        expireAt: Date.now() + 5 * 60 * 1000
                    })
                })
            }

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