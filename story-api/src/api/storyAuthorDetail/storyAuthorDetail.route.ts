import { Router } from 'express'

import { JwtMiddleware } from '../../jwt/jwt.middleware'
import { StoryAuthorDetailAuthorization } from './storyAuthorDetail.authorization'
import { StoryAuthorDetailValidation } from './storyAuthorDetail.validation'
import { StoryAuthorDetailController } from './storyAuthorDetail.controller'

export const StoryAuthorDetailRouter = Router()

StoryAuthorDetailRouter.post('/', JwtMiddleware.authentication, StoryAuthorDetailAuthorization.createStoryAuthorDetail, StoryAuthorDetailValidation.createStoryAuthorDetail, StoryAuthorDetailController.createStoryAuthorDetail)
StoryAuthorDetailRouter.delete('/', JwtMiddleware.authentication, StoryAuthorDetailAuthorization.deleteStoryAuthorDetail, StoryAuthorDetailValidation.deleteStoryAuthorDetail, StoryAuthorDetailController.deleteStoryAuthorDetail)
StoryAuthorDetailRouter.get('/', StoryAuthorDetailValidation.getStoryAuthorDetails, StoryAuthorDetailController.getStoryAuthorDetails)