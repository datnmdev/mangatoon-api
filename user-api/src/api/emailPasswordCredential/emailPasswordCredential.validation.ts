import { NextFunction, Request, Response } from 'express'
import { Errors } from '../../helpers/error.helper'
import { plainToClass } from 'class-transformer'
import { CheckEmailReqDTO } from './dtos/checkEmailReq.dto'
import { validateOrReject } from 'class-validator'
import { SendVerifyingEmailCodeToResetPasswordReqDTO } from './dtos/sendVerifyingEmailToResetPasswordReq.dto'
import { VerifyCodeToResetPasswordReqDTO } from './dtos/verifyCodeToResetPasswordReq.dto'
import { ResetPasswordReqDTO } from './dtos/resetPasswordReq.dto'
import { ChangePasswordReqDTO } from './dtos/changePasswordReq.dto'

export class EmailPasswordCredentialValidation {
    static checkEmail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const checkEmailRequestData = plainToClass(CheckEmailReqDTO, req.body)
            await validateOrReject(checkEmailRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static sendVerifyingEmailCodeToResetPassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const sendVerifyingEmailCodeToResetPasswordData = plainToClass(SendVerifyingEmailCodeToResetPasswordReqDTO, req.body)
            await validateOrReject(sendVerifyingEmailCodeToResetPasswordData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static verifyCodeToResetPassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const verifyCodeToResetPasswordReqData = plainToClass(VerifyCodeToResetPasswordReqDTO, req.body)
            await validateOrReject(verifyCodeToResetPasswordReqData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static resetPassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const resetPasswordReqData = plainToClass(ResetPasswordReqDTO, req.body)
            await validateOrReject(resetPasswordReqData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static changePassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const changePasswordReqData = plainToClass(ChangePasswordReqDTO, req.body)
            await validateOrReject(changePasswordReqData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }
}