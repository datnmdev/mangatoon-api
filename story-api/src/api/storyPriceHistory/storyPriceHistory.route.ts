import { Router } from 'express'

import { JwtMiddleware } from '../../jwt/jwt.middleware'
import { StoryPriceHistoryAuthorization } from './storyPriceHistory.authorization'
import { StoryPriceHistoryValidation } from './storyPriceHistory.validation'
import { StoryPriceHistoryController } from './storyPriceHistory.controller'

export const StoryPriceHistoryRouter = Router()

StoryPriceHistoryRouter.post('/', JwtMiddleware.authentication, StoryPriceHistoryAuthorization.createStoryPriceHistory, StoryPriceHistoryValidation.createStoryPriceHistory, StoryPriceHistoryController.createStoryPriceHistory)
StoryPriceHistoryRouter.get('/', StoryPriceHistoryValidation.getStoryPriceHistory, StoryPriceHistoryController.getStoryPriceHistory)
StoryPriceHistoryRouter.get('/price/:storyId', StoryPriceHistoryValidation.getStoryPriceAtPresent, StoryPriceHistoryController.getStoryPriceAtPresent)