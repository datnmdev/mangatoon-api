import { Router } from 'express'

import { AuthValidation } from './auth.validation'
import { AuthController } from './auth.controller'

export const AuthRouter = Router()

AuthRouter.post('/signUp/emailPassword', AuthValidation.signUpWithEmailPassword, AuthController.signUpWithEmailPassword)
AuthRouter.post('/signIn/emailPassword', AuthValidation.signInWithEmailPassword, AuthController.signInWithEmailPassword)
AuthRouter.post('/signIn/emailPassword/admin', AuthValidation.signInWithEmailPassword, AuthController.signInWithEmailPasswordForAdmin)
AuthRouter.post('/signIn/google', AuthValidation.signInWithGoogle, AuthController.signInWithGoogle)
AuthRouter.post('/signIn/facebook', AuthValidation.signInWithFacebook, AuthController.signInWithFacebook)
AuthRouter.post('/signOut', AuthValidation.signOut, AuthController.signOut)
AuthRouter.post('/refreshToken', AuthValidation.refreshToken, AuthController.refreshToken)