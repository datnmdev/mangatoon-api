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
            return res.send(new AppResponse(storyFollowDetails, null))
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
            const data = await StoryFollowDetailService.getTopStoriesByFollowCount(getTopStoriesByFollowCountRequestData)
            return res.send(new AppResponse(data, null))
        } catch (error) {
            return next(error)
        }
    }

}