import { NextFunction, Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { validateOrReject } from 'class-validator'

import { Errors } from '../../helpers/error.helper'
import { CreateCommentRequestDTO } from './dtos/createCommentRequest.dto'
import { UpdateCommentRequestBodyDTO, UpdateCommentRequestParamDTO } from './dtos/updateCommentRequest.dto'
import { TransformerGroup } from './dtos/enums/group.enum'
import { GetCommentRequestDTO } from './dtos/getCommentRequest.dto'

export class CommentValidation {

    static createComment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createCommentRequestData = plainToClass(CreateCommentRequestDTO, req.body)
            await validateOrReject(createCommentRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static updateComment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updateCommentRequestParamData = plainToClass(UpdateCommentRequestParamDTO, req.params)
            const updateCommentRequestBodyData = plainToClass(UpdateCommentRequestBodyDTO, req.body)
            await validateOrReject(updateCommentRequestParamData)
            await validateOrReject(updateCommentRequestBodyData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static getComment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getCommentRequestData = plainToClass(GetCommentRequestDTO, req.query)
            await validateOrReject(getCommentRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

}