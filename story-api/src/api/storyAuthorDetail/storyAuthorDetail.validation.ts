import { plainToClass } from 'class-transformer'
import { NextFunction, Request, Response } from 'express'
import { validateOrReject } from 'class-validator'

import { CreateStoryAuthorDetailRequestDTO } from './dtos/createStoryAuthorDetailRequest.dto'
import { Errors } from '../../helpers/error.helper'
import { DeleteStoryAuthorDetailRequestDTO } from './dtos/deleteStoryAuthorDetailRequest.dto'
import { GetStoryAuthorDetailRequestDTO } from './dtos/GetStoryAuthorDetailRequest.dto'

export class StoryAuthorDetailValidation {

    static createStoryAuthorDetail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createStoryAuthorDetailRequestData = plainToClass(CreateStoryAuthorDetailRequestDTO, req.body)
            await validateOrReject(createStoryAuthorDetailRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static deleteStoryAuthorDetail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deleteStoryAuthorDetailRequestData = plainToClass(DeleteStoryAuthorDetailRequestDTO, req.body)
            await validateOrReject(deleteStoryAuthorDetailRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static getStoryAuthorDetails = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getStoryAuthorDetailRequestData = plainToClass(GetStoryAuthorDetailRequestDTO, req.query)
            await validateOrReject(getStoryAuthorDetailRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

}