import { plainToClass } from 'class-transformer'
import { NextFunction, Request, Response } from 'express'
import randomString from 'randomstring'

import { redisClient } from '../../redis/redis.config'
import { RedisKeyGenerator } from '../../helpers/redisKey.helper'
import { MailPublisher } from '../../amqp/publisher/mailPublisher.class'
import { envVariables } from '../../dotenv'
import OtpContent from '../../mail/content/otp'
import { AppResponse } from '../../helpers/response.helper'
import { OtpService } from './otp.service'
import { SendCodeToVerifyAccountDTO } from '../../amqp/dtos/sendCodeToVerifyAccountReqFromAmqp.dto'
import { SendVerifyingAccountCodeRequestDTO } from './dtos/sendVerifyingAccountCodeRequest.dto'

export class OtpController {

    static sendVerifyingAccountCode = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const sendVerifyingAccountCodeRequestData = plainToClass(SendVerifyingAccountCodeRequestDTO, req.body)

            const isActivatedAccount = await OtpService.isActivatedAccount(sendVerifyingAccountCodeRequestData.id)
            
            if (!isActivatedAccount) {
                const emailPasswordCredential = await OtpService.getEmailPasswordCredentialById(sendVerifyingAccountCodeRequestData.id)
                const otpCode = randomString.generate({
                    length: 6,
                    charset: 'numeric'
                })
                await redisClient.setEx(RedisKeyGenerator.verifyingAccountCode(sendVerifyingAccountCodeRequestData.id), 5*60, otpCode)
                const mailPublisher = await MailPublisher.getInstance()
                await mailPublisher.sendCodeToVerifyAccount(plainToClass(SendCodeToVerifyAccountDTO, {
                    from: envVariables.MAILER_HOST,
                    to: emailPasswordCredential?.dataValues.email,
                    subject: 'Verify Account',
                    html: await OtpContent(otpCode)
                }))

                return res.send(new AppResponse(true, null))
            }
            
            return res.send(new AppResponse(false, null))
        } catch (error) {
            return next(error)
        }
    }

}