import { Router } from 'express'

import { ChapterValidation } from './chapter.validation'
import { JwtMiddleware } from '../../jwt/jwt.middleware'
import { ChapterAuthorization } from './chapter.authorization'
import { ChapterController } from './chapter.controller'

export const ChapterRouter = Router()

ChapterRouter.post('/', ChapterValidation.createChapter, JwtMiddleware.authentication, ChapterAuthorization.createChapter, ChapterController.createChapter)
ChapterRouter.post('/:id', ChapterValidation.updateChapter, JwtMiddleware.authentication, ChapterAuthorization.updateChapter, ChapterController.updateChapter)
ChapterRouter.get('/',ChapterValidation.getChapter, ChapterController.getChapter)
ChapterRouter.get('/search', ChapterValidation.searchChapter, ChapterController.searchChapter)