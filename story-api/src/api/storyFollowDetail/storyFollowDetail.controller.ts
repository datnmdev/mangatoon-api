import { plainToClass } from 'class-transformer'
import { NextFunction, Request, Response } from 'express'

import { CreateStoryFollowDetailRequestDTO } from './dtos/createStoryFollowDetailRequest.dto'
import { StoryFollowDetailService } from './storyFollowDetail.service'
import { AppResponse } from '../../helpers/response.helper'
import { DeleteStoryFollowDetailRequestDTO } from './dtos/deleteStoryFollowDetailRequest.dto'
import { GetStoryFollowDetailRequestDTO } from './dtos/getStoryFollowDetailRequest.dto'
import { GetFollowCountOfStoryRequestDTO } from './dtos/getFollowCountOfStoryRequest.dto'
import { GetTopStoriesByFollowCountRequestDTO } from './dtos/getTopStoriesByFollowCountRequest.dto'
import { TransformGroup } from './dtos/enums/group.enum'
import { generateSignedUrl } from '../../helpers/signingUrl.helper'
import { getStorage } from 'firebase-admin/storage'

export class StoryFollowDetailController {

    static createStoryFollowDetail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createStoryFollowDetailRequestData = plainToClass(CreateStoryFollowDetailRequestDTO, {
                ...req.body,
                userId: req.user!.userId
            })
            await StoryFollowDetailService.createStoryFollowDetail(createStoryFollowDetailRequestData)
            return res.send(new AppResponse(true, null))
        } catch (error) {
            return next(error)
        }
    }

    static deleteStoryFollowDetail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deleteStoryFollowDetailRequestData = plainToClass(DeleteStoryFollowDetailRequestDTO, {
                ...req.body,
                userId: req.user!.userId
            })
            const deletedCount = await StoryFollowDetailService.deleteStoryFollowDetail(deleteStoryFollowDetailRequestData)
            if (deletedCount > 0) {
                return res.send(new AppResponse(true, null))
            }
            return res.send(new AppResponse(false, null))
        } catch (error) {
            return next(error)
        }
    }

    static getStoryFollowDetail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getStoryFollowDetailRequestData = plainToClass(GetStoryFollowDetailRequestDTO, req.query, {
                groups: [
                    TransformGroup.EXPOSE_PAGINATION
                ]
            })
            const storyFollowDetails = await StoryFollowDetailService.getStoryFollowDetail(getStoryFollowDetailRequestData)
            const rows = []
            for (let row of storyFollowDetails.rows) {
                rows.push({
                    userId: row.dataValues.userId,
                    story: {
                        ...(row.dataValues as any).story.dataValues,
                        coverImageUrl: generateSignedUrl({
                            url: (row.dataValues as any).story.dataValues.coverImageUrl.startsWith('http')
                                ? (row.dataValues as any).story.dataValues.coverImageUrl
                                : (await getStorage().bucket().file((row.dataValues as any).story.dataValues.coverImageUrl).getSignedUrl({
                                    action: 'read',
                                    expires: Date.now() + 5 * 60 * 1000
                                }))[0],
                            expireAt: Date.now() + 5 * 60 * 1000
                        })
                    }
                })
            }

            return res.send(new AppResponse({
                count: storyFollowDetails.count,
                rows
            }, null))
        } catch (error) {
            return next(error)
        }
    }

    static getFollowCountOfStory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getFollowCountOfStoryRequestData = plainToClass(GetFollowCountOfStoryRequestDTO, req.params)
            const followCount = await StoryFollowDetailService.getFollowCountOfStory(getFollowCountOfStoryRequestData.storyId)
            return res.send(new AppResponse(followCount[0], null))
        } catch (error) {
            return next(error)
        }
    }

    static getTopStoriesByFollowCount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getTopStoriesByFollowCountRequestData = plainToClass(GetTopStoriesByFollowCountRequestDTO, req.query)
            const rows = await StoryFollowDetailService.getTopStoriesByFollowCount(getTopStoriesByFollowCountRequestData)
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

}