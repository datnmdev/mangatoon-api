import { Router } from 'express'

import { JwtMiddleware } from '../../jwt/jwt.middleware'
import { CommentValidation } from './comment.validation'
import { CommentController } from './comment.controller'

export const CommentRouter = Router()

CommentRouter.post('/', JwtMiddleware.authentication, CommentValidation.createComment, CommentController.createComment)
CommentRouter.put('/:id', JwtMiddleware.authentication, CommentValidation.updateComment, CommentController.updateComment)
CommentRouter.get('/', CommentValidation.getComment, CommentController.getComment)