import { Router } from 'express'

import { StoryValidation } from './story.validation'
import { JwtMiddleware } from '../../jwt/jwt.middleware'
import { StoryAuthorization } from './story.authorization'
import { StoryController } from './story.controller'
import { uploader } from '../../multer/multer.config'

export const StoryRouter = Router()

StoryRouter.post('/', JwtMiddleware.authentication, StoryAuthorization.createStory, uploader().single('coverImage'), StoryValidation.createStory, StoryController.createStory)
StoryRouter.post('/:id', JwtMiddleware.authentication, StoryAuthorization.updateStory, uploader().single('coverImage'), StoryValidation.updateStory, StoryController.updateStory)
StoryRouter.get('/', StoryValidation.getStories, StoryController.getStories)
StoryRouter.get('/search', StoryValidation.searchStories, StoryController.searchStories)
StoryRouter.get('/chart', StoryValidation.getTopChartData, StoryController.getTopChartData)
new Date()