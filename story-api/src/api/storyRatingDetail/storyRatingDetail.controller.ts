import { plainToClass } from 'class-transformer'
import { NextFunction, Request, Response } from 'express'

import { CreateStoryRatingDetailRequestDTO } from './dtos/createStoryRatingDetailRequest.dto'
import { StoryRatingDetailService } from './storyRatingDetail.service'
import { AppResponse } from '../../helpers/response.helper'
import { UpdateStoryRatingDetailRequestDTO } from './dtos/updateStoryRatingDetailRequest.dto'
import { GetStoryRatingDetailRequestDTO } from './dtos/getStoryRatingDetailRequest.dto'
import { GetTopStoriesByRatingRequestDTO } from './dtos/getTopStoriesByRatingRequest.dto'
import { GetRatingOfStoryRequestDTO } from './dtos/getRatingOfStoryRequest.dto'
import { generateSignedUrl } from '../../helpers/signingUrl.helper'
import { getStorage } from 'firebase-admin/storage'

export class StoryRatingDetailController {

    static createStoryRatingDetail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createStoryRatingDetailRequestData = plainToClass(CreateStoryRatingDetailRequestDTO, {
                ...req.body,
                userId: req.user!.userId
            })
            await StoryRatingDetailService.createStoryRatingDetail(createStoryRatingDetailRequestData)
            return res.send(new AppResponse(true, null))
        } catch (error) {
            return next(error)
        }
    }

    static updateStoryRatingDetail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updateStoryRatingDetailRequestData = plainToClass(UpdateStoryRatingDetailRequestDTO, {
                ...req.body,
                userId: req.user!.userId
            })
            const affectedCount = await StoryRatingDetailService.updateStoryRatingDetail(updateStoryRatingDetailRequestData)
            if (affectedCount[0] > 0) {
                return res.send(new AppResponse(true, null))
            }
            return res.send(new AppResponse(false, null))
        } catch (error) {
            return next(error)
        }
    }

    static getStoryRatingDetail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getStoryRatingDetailRequestData = plainToClass(GetStoryRatingDetailRequestDTO, req.query)
            const storyRatingDetails = await StoryRatingDetailService.getStoryRatingDetail(getStoryRatingDetailRequestData)
            return res.send(new AppResponse(storyRatingDetails, null))
        } catch (error) {
            return next(error)
        }
    }

    static getTopStoriesByRating = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getTopStoriesByRatingRequestData = plainToClass(GetTopStoriesByRatingRequestDTO, req.query)
            const rows = await StoryRatingDetailService.getTopStoriesByRating(getTopStoriesByRatingRequestData)
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

    static getRatingOfStory =  async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getRatingOfStoryRequestData = plainToClass(GetRatingOfStoryRequestDTO, req.params)
            const data = await StoryRatingDetailService.getRatingOfStory(getRatingOfStoryRequestData.storyId)
            return res.send(new AppResponse(data[0], null))
        } catch (error) {
            return next(error)
        }
    }

}