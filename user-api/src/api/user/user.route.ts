import { Router } from 'express'
import { JwtMiddleware } from '../../jwt/jwt.middleware'
import { UserController } from './user.controller'
import { UserValidation } from './user.validation'
import { uploader } from '../../multer/multer.config'

export const UserRouter = Router()

UserRouter.get('/getProfile', JwtMiddleware.authentication, UserController.getProfile)
UserRouter.post('/updateProfile', JwtMiddleware.authentication, uploader().single('avatar'), UserValidation.updateProfile, UserController.updateProfile)
UserRouter.get('/:id', UserController.getUserInfo)