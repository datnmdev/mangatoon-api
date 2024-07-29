import { Router } from 'express'

import { CommentRouter } from '../api/comment/comment.route'
import { CommentInteractionRouter } from '../api/commentInteraction/commentInteraction.route'

export const AppRouter = Router()

AppRouter.use('/comment', CommentRouter)
AppRouter.use('/commentInteraction', CommentInteractionRouter)