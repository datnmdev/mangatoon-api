import { NextFunction, Request, Response } from 'express'
import { validateOrReject } from 'class-validator'
import { plainToClass } from 'class-transformer'

import { Errors } from '../../helpers/error.helper'
import { SendVerifyingAccountCodeRequestDTO } from './dtos/sendVerifyingAccountCodeRequest.dto'

export class OtpValidation {

    static sendOtpCode = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const sendOtpCodeRequestData = plainToClass(SendVerifyingAccountCodeRequestDTO, req.body)
            await validateOrReject(sendOtpCodeRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

}