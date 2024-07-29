import { Router } from 'express'
import { OtpValidation } from './otp.validation'
import { OtpController } from './otp.controller'

export const OtpRouter = Router()

OtpRouter.post('/sendVerifyingAccountCode', OtpValidation.sendOtpCode, OtpController.sendVerifyingAccountCode)