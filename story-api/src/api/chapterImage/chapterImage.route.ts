import { Router } from 'express'

import { ChapterImageAuthorization } from './chapterImage.authorization'
import { JwtMiddleware } from '../../jwt/jwt.middleware'
import { ChapterImageController } from './chapterImage.controller'
import { ChapterImagesValidation } from './chapterImage.validation'
import { uploader } from '../../multer/multer.config'

export const ChapterImageRouter = Router()

ChapterImageRouter.post('/', JwtMiddleware.authentication, uploader().array('chapterImages'), ChapterImagesValidation.createChapterImages, ChapterImageAuthorization.createChapterImages, ChapterImageController.createChapterImages)
ChapterImageRouter.post('/:id', JwtMiddleware.authentication, ChapterImageAuthorization.updateChapterImage, ChapterImagesValidation.updateChapterImage, ChapterImageController.updateChapterImage)
ChapterImageRouter.delete('/:id', JwtMiddleware.authentication, ChapterImageAuthorization.deleteChapterImage, ChapterImagesValidation.deleteChapterImage, ChapterImageController.deleteChapterImage)
ChapterImageRouter.get('/', JwtMiddleware.authentication, ChapterImagesValidation.getChapterImagesByChapterId, ChapterImageAuthorization.getChapterImagesByChapterId, ChapterImageController.getChapterImagesByChapterId)
ChapterImageRouter.post('/image/blob', ChapterImagesValidation.getImage, ChapterImageController.getImage)
ChapterImageRouter.delete('/', JwtMiddleware.authentication, ChapterImageAuthorization.deleteChapterImageByChapterId, ChapterImagesValidation.deleteChapterImageByChapterId, ChapterImageController.deleteChapterImageByChapterId)