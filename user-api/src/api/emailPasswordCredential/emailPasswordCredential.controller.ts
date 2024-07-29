import { plainToClass } from 'class-transformer'
import { NextFunction, Request, Response } from 'express'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import randomString from 'randomstring'
import { CheckEmailReqDTO } from './dtos/checkEmailReq.dto'
import { EmailPasswordCredentialService } from './emailPasswordCredential.service'
import { AppResponse } from '../../helpers/response.helper'
import { SendVerifyingEmailCodeToResetPasswordReqDTO } from './dtos/sendVerifyingEmailToResetPasswordReq.dto'
import { redisClient } from '../../redis/redis.config'
import { RedisKeyGenerator } from '../../helpers/redisKey.helper'
import { MailPublisher } from '../../amqp/publisher/mailPublisher.class'
import { envVariables } from '../../dotenv'
import OtpContent from '../../mail/content/otp'
import { SendCodeToResetPasswordDTO } from '../../amqp/dtos/sendCodeToResetPasswordReqFromAmqp.dto'
import { VerifyCodeToResetPasswordReqDTO } from './dtos/verifyCodeToResetPasswordReq.dto'
import { ResetPasswordReqDTO } from './dtos/resetPasswordReq.dto'
import { ChangePasswordReqDTO } from './dtos/changePasswordReq.dto'

export class EmailPasswordCredentialController {
    static checkEmail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const checkEmailData = plainToClass(CheckEmailReqDTO, req.body)
            const checkEmail = await EmailPasswordCredentialService.checkEmail(checkEmailData.email)
            return res.send(new AppResponse(checkEmail, null))
        } catch (error) {
            return next(error)
        }
    }

    static sendVerifyingEmailCodeToResetPassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const sendVerifyingEmailCodeReqData = plainToClass(SendVerifyingEmailCodeToResetPasswordReqDTO, req.body)
            const account = await EmailPasswordCredentialService.findOneByEmail(sendVerifyingEmailCodeReqData.email)

            if (account) {
                const otpCode = randomString.generate({
                    length: 6,
                    charset: 'numeric'
                })
                await redisClient.setEx(RedisKeyGenerator.verifyingEmailCodeToResetPassword(account.dataValues.id), 5 * 60, otpCode)
                const mailPublisher = await MailPublisher.getInstance()
                await mailPublisher.sendCodeToResetPassword(plainToClass(SendCodeToResetPasswordDTO, {
                    from: envVariables.MAILER_HOST,
                    to: sendVerifyingEmailCodeReqData.email,
                    subject: 'Reset Password',
                    html: await OtpContent(otpCode)
                }))
                return res.send(new AppResponse(true, null))
            }

            return res.send(new AppResponse(false, null))
        } catch (error) {
            return next(error)
        }
    }


    static verifyCodeToResetPassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const verifyCodeToResetPasswordReqData = plainToClass(VerifyCodeToResetPasswordReqDTO, req.body)

            const account = await EmailPasswordCredentialService.findOneByEmail(verifyCodeToResetPasswordReqData.email)
            if (account) {
                const otpInRedis = await redisClient.get(RedisKeyGenerator.verifyingEmailCodeToResetPassword(account.dataValues.id))
                if (verifyCodeToResetPasswordReqData.otpCode === otpInRedis) {
                    const code = crypto.randomBytes(1024).toString('hex')
                    await redisClient
                        .multi()
                        .del(RedisKeyGenerator.verifyingEmailCodeToResetPassword(account.dataValues.id))
                        .setEx(RedisKeyGenerator.codeToResetPassword(verifyCodeToResetPasswordReqData.email), 30 * 60, code)
                        .exec()

                    return res.send(new AppResponse({
                        code
                    }, null))
                }
            }

            return res.send(new AppResponse(false, null))
        } catch (error) {
            return next(error)
        }
    }

    static resetPassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const resetPasswordReqData = plainToClass(ResetPasswordReqDTO, req.body)
            const codeInRedis = await redisClient.get(RedisKeyGenerator.codeToResetPassword(resetPasswordReqData.email))
            if (resetPasswordReqData.code === codeInRedis) {
                await redisClient.del(RedisKeyGenerator.codeToResetPassword(resetPasswordReqData.email))
                const affected = await EmailPasswordCredentialService.resetPassword(resetPasswordReqData.email, resetPasswordReqData.password)
                if (affected[0] > 0) {
                    return res.send(new AppResponse(true, null))
                }
            }

            return res.send(new AppResponse(false, null))
        } catch (error) {
            return next(error)
        }
    }

    static changePassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (req.user) {
                const changePasswordReqData = plainToClass(ChangePasswordReqDTO, req.body)
                const emailPasswordCredential = await EmailPasswordCredentialService.findById(req.user.accountId)
                if (emailPasswordCredential) {
                    console.log(bcrypt.compareSync(changePasswordReqData.oldPassword, emailPasswordCredential.dataValues.password));
                    if (bcrypt.compareSync(changePasswordReqData.oldPassword, emailPasswordCredential.dataValues.password)) {
                        const affected = await EmailPasswordCredentialService.updatePassword(req.user.accountId, changePasswordReqData.newPassword)
                        if (affected[0] > 0) {
                            return res.send(new AppResponse(true, null))
                        }
                    }

                    return res.send(new AppResponse(false, null))
                }
            }
        } catch (error) {
            return next(error)
        }
    }
}