import { plainToClass } from 'class-transformer'
import { NextFunction, Request, Response } from 'express'

import { StoryAuthorDetailService } from './storyAuthorDetail.service'
import { CreateStoryAuthorDetailRequestDTO } from './dtos/createStoryAuthorDetailRequest.dto'
import { AppResponse } from '../../helpers/response.helper'
import { DeleteStoryAuthorDetailRequestDTO } from './dtos/deleteStoryAuthorDetailRequest.dto'
import { GetStoryAuthorDetailRequestDTO } from './dtos/GetStoryAuthorDetailRequest.dto'
import { generateSignedUrl } from '../../helpers/signingUrl.helper'
import { getStorage } from 'firebase-admin/storage'

export class StoryAuthorDetailController {
    
    static createStoryAuthorDetail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createStoryAuthorDetailRequestData = plainToClass(CreateStoryAuthorDetailRequestDTO, req.body)
            await StoryAuthorDetailService.createStoryAuthorDetail(createStoryAuthorDetailRequestData)
            return res.send(new AppResponse(true, null))
        } catch (error) {
            return next(error)
        }
    }

    static deleteStoryAuthorDetail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deleteStoryAuthorDetailRequestData = plainToClass(DeleteStoryAuthorDetailRequestDTO, req.body)
            const deletedCount = await StoryAuthorDetailService.deleteStoryAuthorDetail(deleteStoryAuthorDetailRequestData)
            if (deletedCount === 1) {
                return res.send(new AppResponse(true, null))
            }
            return res.send(new AppResponse(false, null))
        } catch (error) {
            return next(error)
        }
    }

    static getStoryAuthorDetails = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getStoryAuthorDetailRequestData = plainToClass(GetStoryAuthorDetailRequestDTO, req.query)
            const storyAuthorDetails = await StoryAuthorDetailService.getStoryAuthorDetail(getStoryAuthorDetailRequestData)
            const rows = []
            for (let row of storyAuthorDetails.rows) {
                rows.push({
                    author: (row.dataValues as any).author.dataValues,
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
                count: storyAuthorDetails.count,
                rows
            }, null))
        } catch (error) {
            return next(error)
        }
    }

}