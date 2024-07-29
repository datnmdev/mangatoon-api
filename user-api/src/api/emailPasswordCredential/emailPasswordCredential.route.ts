import { Router } from 'express'
import { EmailPasswordCredentialValidation } from './emailPasswordCredential.validation'
import { EmailPasswordCredentialController } from './emailPasswordCredential.controller'
import { JwtMiddleware } from '../../jwt/jwt.middleware'

export const EmailPasswordCredentialRouter = Router()

EmailPasswordCredentialRouter.post('/checkEmail', EmailPasswordCredentialValidation.checkEmail, EmailPasswordCredentialController.checkEmail)
EmailPasswordCredentialRouter.post('/sendCodeToResetPassword', EmailPasswordCredentialValidation.sendVerifyingEmailCodeToResetPassword, EmailPasswordCredentialController.sendVerifyingEmailCodeToResetPassword)
EmailPasswordCredentialRouter.post('/verifyCodeToResetPassword', EmailPasswordCredentialValidation.verifyCodeToResetPassword, EmailPasswordCredentialController.verifyCodeToResetPassword)
EmailPasswordCredentialRouter.post('/resetPassword', EmailPasswordCredentialValidation.resetPassword, EmailPasswordCredentialController.resetPassword)
EmailPasswordCredentialRouter.post('/changePassword', JwtMiddleware.authentication, EmailPasswordCredentialValidation.changePassword, EmailPasswordCredentialController.changePassword)