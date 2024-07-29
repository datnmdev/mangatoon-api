import { plainToClass } from 'class-transformer'
import { validateOrReject } from 'class-validator'
import { NextFunction, Request, Response } from 'express'

import { CreateStoryFollowDetailRequestDTO } from './dtos/createStoryFollowDetailRequest.dto'
import { Errors } from '../../helpers/error.helper'
import { DeleteStoryFollowDetailRequestDTO } from './dtos/deleteStoryFollowDetailRequest.dto'
import { GetStoryFollowDetailRequestDTO } from './dtos/getStoryFollowDetailRequest.dto'
import { GetFollowCountOfStoryRequestDTO } from './dtos/getFollowCountOfStoryRequest.dto'
import { GetTopStoriesByFollowCountRequestDTO } from './dtos/getTopStoriesByFollowCountRequest.dto'
import { TransformGroup } from './dtos/enums/group.enum'

export class StoryFollowDetailValidation {

    static createStoryFollowDetail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createStoryFollowDetailRequestData = plainToClass(CreateStoryFollowDetailRequestDTO, req.body)
            await validateOrReject(createStoryFollowDetailRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static deleteStoryFollowDetail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deleteStoryFollowDetailRequestData = plainToClass(DeleteStoryFollowDetailRequestDTO, req.body)
            await validateOrReject(deleteStoryFollowDetailRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static getStoryFollowDetail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getStoryFollowDetailRequestData = plainToClass(GetStoryFollowDetailRequestDTO, req.query, {
                groups: [
                    TransformGroup.EXPOSE_PAGINATION
                ]
            })
            await validateOrReject(getStoryFollowDetailRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static getFollowCountOfStory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getFollowCountOfStoryRequestData = plainToClass(GetFollowCountOfStoryRequestDTO, req.params)
            await validateOrReject(getFollowCountOfStoryRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static getTopStoriesByFollowCount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getTopStoriesByFollowCountRequestData = plainToClass(GetTopStoriesByFollowCountRequestDTO, req.query)
            await validateOrReject(getTopStoriesByFollowCountRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

}