import { Router } from 'express'

import { ViewDetailValidation } from './viewDetail.validation'
import { ViewDetailController } from './viewDetail.controller'

export const ViewDetailRouter = Router()

ViewDetailRouter.post('/', ViewDetailValidation.createViewDetail, ViewDetailController.createViewDetail)
ViewDetailRouter.get('/chapter/:chapterId/viewCount', ViewDetailValidation.getViewOfChapter, ViewDetailController.getViewOfChapter)
ViewDetailRouter.get('/story/topViewCount', ViewDetailValidation.getTopStoriesByViewCount, ViewDetailController.getTopStoriesByViewCount)
ViewDetailRouter.get('/story/:storyId/viewCount', ViewDetailValidation.getViewOfStory, ViewDetailController.getViewOfStory)