import { Router } from 'express'

import { StoryFollowDetailValidation } from './storyFollowDetail.validation'
import { StoryFollowDetailController } from './storyFollowDetail.controller'
import { JwtMiddleware } from '../../jwt/jwt.middleware'

export const StoryFollowDetailRouter = Router()

StoryFollowDetailRouter.post('/', JwtMiddleware.authentication, StoryFollowDetailValidation.createStoryFollowDetail, StoryFollowDetailController.createStoryFollowDetail)
StoryFollowDetailRouter.delete('/', JwtMiddleware.authentication, StoryFollowDetailValidation.deleteStoryFollowDetail, StoryFollowDetailController.deleteStoryFollowDetail)
StoryFollowDetailRouter.get('/', StoryFollowDetailValidation.getStoryFollowDetail, StoryFollowDetailController.getStoryFollowDetail)
StoryFollowDetailRouter.get('/story/:storyId/followCount', StoryFollowDetailValidation.getFollowCountOfStory, StoryFollowDetailController.getFollowCountOfStory)
StoryFollowDetailRouter.get('/story/topFollowCount', StoryFollowDetailValidation.getTopStoriesByFollowCount, StoryFollowDetailController.getTopStoriesByFollowCount)