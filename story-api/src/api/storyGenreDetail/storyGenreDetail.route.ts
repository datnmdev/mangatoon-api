import { Router } from 'express'

import { JwtMiddleware } from '../../jwt/jwt.middleware'
import { StoryGenreDetailAuthorization } from './storyGenreDetail.authorization'
import { StoryGenreDetailValidation } from './storyGenreDetail.validation'
import { StoryGenreDetailController } from './storyGenreDetail.controller'

export const StoryGenreDetailRouter = Router()

StoryGenreDetailRouter.post('/', JwtMiddleware.authentication, StoryGenreDetailAuthorization.createStoryGenreDetail, StoryGenreDetailValidation.createStoryGenreDetail, StoryGenreDetailController.createStoryGenreDetail)
StoryGenreDetailRouter.delete('/', JwtMiddleware.authentication, StoryGenreDetailAuthorization.deleteStoryGenreDetail, StoryGenreDetailValidation.deleteStoryGenreDetail, StoryGenreDetailController.deleteStoryGenreDetail)
StoryGenreDetailRouter.get('/', StoryGenreDetailValidation.getStoryGenreDetails, StoryGenreDetailController.getStoryGenreDetails)