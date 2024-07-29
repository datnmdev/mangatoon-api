import { plainToClass } from 'class-transformer'
import { NextFunction, Request, Response } from 'express'

import { CreateCommentRequestDTO } from './dtos/createCommentRequest.dto'
import { CommentService } from './comment.service'
import { AppResponse } from '../../helpers/response.helper'
import { UpdateCommentRequestBodyDTO, UpdateCommentRequestParamDTO } from './dtos/updateCommentRequest.dto'
import { GetCommentRequestDTO } from './dtos/getCommentRequest.dto'
import { TransformerGroup } from './dtos/enums/group.enum'

export class CommentController {

    static createComment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createCommentRequestData = plainToClass(CreateCommentRequestDTO, {
                ...req.body,
                userId: req.user!.userId
            })
            const newComment = await CommentService.createComment(createCommentRequestData)
            return res.send(new AppResponse({
                ...newComment.dataValues,
                id: newComment.id
            }, null))
        } catch (error) {
            return next(error)
        }
    }

    static updateComment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updateCommentRequestParamData = plainToClass(UpdateCommentRequestParamDTO, req.params)
            const updateCommentRequestBodyData = plainToClass(UpdateCommentRequestBodyDTO, {
                ...req.body,
                userId: req.user!.userId
            })
            const affectedCount = await CommentService.updateComment(updateCommentRequestParamData.id, updateCommentRequestBodyData)
            if (affectedCount[0] > 0) {
                return res.send(new AppResponse(true, null))
            }
            return res.send(new AppResponse(false, null))
        } catch (error) {
            return next(error)
        }
    }

    static getComment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getCommentRequestData = plainToClass(GetCommentRequestDTO, req.query, {
                groups: [
                    TransformerGroup.EXCLUDE
                ]
            })
            const comments = await CommentService.getComment(getCommentRequestData)
            return res.send(new AppResponse(comments, null))
        } catch (error) {
            return next(error)
        }
    }

}