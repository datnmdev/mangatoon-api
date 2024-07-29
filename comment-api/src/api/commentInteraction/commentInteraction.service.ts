import { plainToClass } from 'class-transformer'
import { Models, sequelize } from '../../database/mysql.config'
import { CreateCommentInteractionRequestDTO } from './dtos/createCommentInteractionRequest.dto'
import { UpdateCommentInteractionRequestDTO } from './dtos/updateCommentInteractionRequest.dto'
import { GetCommentInteractionRequestDTO } from './dtos/getCommentInteractionRequest.dto'
import { GetCommentInteractionCountOfCommentRequestDTO } from './dtos/getCommentInteractionCountOfCommentRequest.dto'

export class CommentInteractionService {

    static createCommentInteraction = (commentInteractionData: CreateCommentInteractionRequestDTO) => {
        return Models.commentInteraction.create(commentInteractionData)
    }

    static updateCommentInteraction = (commentInteractionData: UpdateCommentInteractionRequestDTO) => {
        return Models.commentInteraction.update(plainToClass(Object, plainToClass(UpdateCommentInteractionRequestDTO, commentInteractionData), {
            exposeUnsetFields: false
        }), {
            where: {
                commentId: commentInteractionData.commentId,
                userId: commentInteractionData.userId
            }
        })
    }

    static deleteCommentInteraction = (commentId: number, userId: number) => {
        return Models.commentInteraction.destroy({
            where: {
                commentId,
                userId
            }
        })
    }

    static getCommentInteraction = (queries: GetCommentInteractionRequestDTO) => {
        return Models.commentInteraction.findAll({
            where: {
                ...plainToClass(Object, queries, {
                    exposeUnsetFields: false
                })
            }
        })
    }

    static getCommentInteractionCountOfComment = (commentId: number) => {
        return sequelize.query('CALL GetCommentInteractionCountOfComment(:commentId)', {
            replacements: {
                commentId
            },
        })
    }

}