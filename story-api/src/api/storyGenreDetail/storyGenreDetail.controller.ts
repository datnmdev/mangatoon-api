import { plainToClass } from 'class-transformer'
import { NextFunction, Request, Response } from 'express'

import { CreateStoryGenreDetailRequestDTO } from './dtos/createStoryGenreDetail.dto'
import { StoryGenreDetailService } from './storyGenreDetail.service'
import { AppResponse } from '../../helpers/response.helper'
import { DeleteStoryGenreDetailRequestDTO } from './dtos/deleteStoryGenreDetailRequest.dto'
import { GetStoryGenreDetailRequestDTO } from './dtos/getStoryGenreDetail.dto'

export class StoryGenreDetailController {

    static createStoryGenreDetail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createStoryGenreDetailRequestData = plainToClass(CreateStoryGenreDetailRequestDTO, req.body)
            await StoryGenreDetailService.createStoryGenreDetail(createStoryGenreDetailRequestData)
            return res.send(new AppResponse(true, null))
        } catch (error) {
            return next(error)
        }
    }

    static deleteStoryGenreDetail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deleteStoryGenreDetailRequestData = plainToClass(DeleteStoryGenreDetailRequestDTO, req.body)
            const deletedCount = await StoryGenreDetailService.deleteStoryGenreDetail(deleteStoryGenreDetailRequestData)
            if (deletedCount > 0) {
                return res.send(new AppResponse(true, null))
            }
            return res.send(new AppResponse(false, null))
        } catch (error) {
            return next(error)
        }
    } 

    static getStoryGenreDetails = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getStoryGenreDetailRequestData = plainToClass(GetStoryGenreDetailRequestDTO, req.query)
            const storyGenreDetails = await StoryGenreDetailService.getStoryGenreDetail(getStoryGenreDetailRequestData)
            return res.send(new AppResponse(storyGenreDetails, null))
        } catch (error) {
            console.log(error);
            return next(error)
        }
    } 

}