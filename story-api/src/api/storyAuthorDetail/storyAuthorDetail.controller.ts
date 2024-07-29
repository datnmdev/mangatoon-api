import { plainToClass } from 'class-transformer'
import { NextFunction, Request, Response } from 'express'

import { StoryAuthorDetailService } from './storyAuthorDetail.service'
import { CreateStoryAuthorDetailRequestDTO } from './dtos/createStoryAuthorDetailRequest.dto'
import { AppResponse } from '../../helpers/response.helper'
import { DeleteStoryAuthorDetailRequestDTO } from './dtos/deleteStoryAuthorDetailRequest.dto'
import { GetStoryAuthorDetailRequestDTO } from './dtos/GetStoryAuthorDetailRequest.dto'

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
            return res.send(new AppResponse(storyAuthorDetails, null))
        } catch (error) {
            return next(error)
        }
    }

}