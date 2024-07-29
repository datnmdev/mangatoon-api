import { NextFunction, Request, Response } from 'express'
import { Errors } from '../../helpers/error.helper'
import { plainToClass } from 'class-transformer'
import { UpdateProfileReqDTO } from './dtos/updateUserReq.dto'
import { validateOrReject } from 'class-validator'
import { GetUserInfoReqDTO } from './dtos/getUserInfoReq.dto'

export class UserValidation {
    static updateProfile = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updateProfileReqData = plainToClass(UpdateProfileReqDTO, req.body)
            await validateOrReject(updateProfileReqData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static getUserInfo = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getUserInfoReqData = plainToClass(GetUserInfoReqDTO, req.params)
            await validateOrReject(getUserInfoReqData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }
}