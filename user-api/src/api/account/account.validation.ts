import { NextFunction, Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { validateOrReject } from 'class-validator'

import { Errors } from '../../helpers/error.helper'
import { VerifyAccountRequestDTO } from './dtos/verifyAccountRequest.dto'
import { UpdateAccountReqBodyDTO, UpdateAccountReqParamsDTO } from './dtos/updateAccountReq.dto'
import { SearchAccountRequestDTO } from './dtos/searchAccountRequest.dto'

export class AccountValidation {

    static verifyAccount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const verifyAccountRequestData = plainToClass(VerifyAccountRequestDTO, req.body)
            await validateOrReject(verifyAccountRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static updateAccount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updateAccountReqParamsData = plainToClass(UpdateAccountReqParamsDTO, req.params)
            const updateAccountReqBodyData = plainToClass(UpdateAccountReqBodyDTO, req.body)
            await validateOrReject(updateAccountReqParamsData)
            await validateOrReject(updateAccountReqBodyData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static searchAccount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const searchAccountReqData = plainToClass(SearchAccountRequestDTO, req.query)
            await validateOrReject(searchAccountReqData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

}