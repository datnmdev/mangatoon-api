import { plainToClass } from 'class-transformer'
import { NextFunction, Request, Response } from 'express'

import { CreateCommentInteractionRequestDTO } from './dtos/createCommentInteractionRequest.dto'
import { CommentInteractionService } from './commentInteraction.service'
import { AppResponse } from '../../helpers/response.helper'
import { UpdateCommentInteractionRequestDTO } from './dtos/updateCommentInteractionRequest.dto'
import { TransformerGroup } from './dtos/enums/group.enum'
import { DeleteCommentInteractionRequestDTO } from './dtos/deleteCommentInteractionRequest.dto'
import { GetCommentInteractionRequestDTO } from './dtos/getCommentInteractionRequest.dto'
import { GetCommentInteractionCountOfCommentRequestDTO } from './dtos/getCommentInteractionCountOfCommentRequest.dto'
import { CommentInteractionType } from '../../enums/commentInteractionType.enum'

export class CommentInteractionController {

    static createCommentInteraction = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createCommentInteractionRequestData = plainToClass(CreateCommentInteractionRequestDTO, {
                ...req.body,
                userId: req.user!.userId
            })
            await CommentInteractionService.createCommentInteraction(createCommentInteractionRequestData)
            return res.send(new AppResponse(true, null))
        } catch (error) {
            return next(error)
        }
    }

    static updateCommentInteraction = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updateCommentInteractionRequestData = plainToClass(UpdateCommentInteractionRequestDTO, {
                ...req.body,
                userId: req.user!.userId
            })
            const affectedCount = await CommentInteractionService.updateCommentInteraction(updateCommentInteractionRequestData)
            if (affectedCount[0] > 0) {
                return res.send(new AppResponse(true, null))
            }
            return res.send(new AppResponse(false, null))
        } catch (error) {
            return next(error)
        }
    }

    static deleteCommentInteraction = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deleteCommentInteractionRequestData = plainToClass(DeleteCommentInteractionRequestDTO, {
                ...req.body,
                userId: req.user!.userId
            })
            const deletedCount = await CommentInteractionService.deleteCommentInteraction(deleteCommentInteractionRequestData.commentId, deleteCommentInteractionRequestData.userId)
            if (deletedCount > 0) {
                return res.send(new AppResponse(true, null))
            }
            return res.send(new AppResponse(false, null))
        } catch (error) {
            return next(error)
        }
    }

    static getCommentInteraction = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getCommentInteractionRequestData = plainToClass(GetCommentInteractionRequestDTO, {
                ...req.query,
                userId: req.user!.userId
            })
            const commentInteractions = await CommentInteractionService.getCommentInteraction(getCommentInteractionRequestData)
            return res.send(new AppResponse(commentInteractions, null))
        } catch (error) {
            return next(error)
        }
    }

    static getCommentInteractionCountOfComment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getCommentInteractionCountOfCommentRequestData = plainToClass(GetCommentInteractionCountOfCommentRequestDTO, req.params)
            const data = await CommentInteractionService.getCommentInteractionCountOfComment(getCommentInteractionCountOfCommentRequestData.commentId)
            const likeCountInfo: any = data.filter((row: any) => row.interactionType === CommentInteractionType.LIKE)?.[0]
            const dislikeCountInfo: any = data.filter((row: any) => row.interactionType === CommentInteractionType.DISLIKE)?.[0]
            const commentInteractionCountInfo = {
                likeCount: likeCountInfo ? likeCountInfo.count : 0,
                dislikeCount: dislikeCountInfo ? dislikeCountInfo.count : 0,
            }
            return res.send(new AppResponse(commentInteractionCountInfo, null))
        } catch (error) {
            return next(error)
        }
    }

}