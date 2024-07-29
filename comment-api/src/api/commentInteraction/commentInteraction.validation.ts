import { NextFunction, Request, Response } from 'express'
import { validateOrReject } from 'class-validator'
import { plainToClass } from 'class-transformer'

import { Errors } from '../../helpers/error.helper'
import { CreateCommentInteractionRequestDTO } from './dtos/createCommentInteractionRequest.dto'
import { UpdateCommentInteractionRequestDTO } from './dtos/updateCommentInteractionRequest.dto'
import { TransformerGroup } from './dtos/enums/group.enum'
import { DeleteCommentInteractionRequestDTO } from './dtos/deleteCommentInteractionRequest.dto'
import { GetCommentInteractionRequestDTO } from './dtos/getCommentInteractionRequest.dto'
import { GetCommentInteractionCountOfCommentRequestDTO } from './dtos/getCommentInteractionCountOfCommentRequest.dto'

export class CommentInteractionValidation {
    
    static createCommentInteraction = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createCommentInteractionRequestData = plainToClass(CreateCommentInteractionRequestDTO, req.body)
            await validateOrReject(createCommentInteractionRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static updateCommentInteraction = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updateCommentInteractionRequestData = plainToClass(UpdateCommentInteractionRequestDTO, req.body, {
                groups: [
                    TransformerGroup.EXCLUDE
                ]
            })
            await validateOrReject(updateCommentInteractionRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static deleteCommentInteraction = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deleteCommentInteractionRequestData = plainToClass(DeleteCommentInteractionRequestDTO, req.body)
            await validateOrReject(deleteCommentInteractionRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static getCommentInteraction = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getCommentInteractionRequestData = plainToClass(GetCommentInteractionRequestDTO, req.query)
            await validateOrReject(getCommentInteractionRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static getCommentInteractionCountOfComment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getCommentInteractionCountOfCommentRequestData = plainToClass(GetCommentInteractionCountOfCommentRequestDTO, req.params)
            await validateOrReject(getCommentInteractionCountOfCommentRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

}