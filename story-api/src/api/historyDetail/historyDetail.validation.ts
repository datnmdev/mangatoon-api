import { plainToClass } from 'class-transformer'
import { NextFunction, Request, Response } from 'express'
import { validateOrReject } from 'class-validator'

import { DeleteHistoryDetailByIdRequestDTO } from './dtos/deleteHistoryDetailByIdRequest.dto'
import { Errors } from '../../helpers/error.helper'
import { GetHistoryDetailByUserIdRequestDTO } from './dtos/getHistoryDetailByUserIdRequest.dto'
import { CreateHistoryDetailDTO } from './dtos/createHistoryDetailReq.dto'

export class HistoryDetailValidation {

    static deleteHistoryDetailById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deleteHistoryDetailByIdRequestData = plainToClass(DeleteHistoryDetailByIdRequestDTO, req.params)
            await validateOrReject(deleteHistoryDetailByIdRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static getHistoryDetailByUserId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getHistoryDetailByUserIdRequestData = plainToClass(GetHistoryDetailByUserIdRequestDTO, req.query)
            await validateOrReject(getHistoryDetailByUserIdRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static createHistoryDetail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createHistoryDetailReqData = plainToClass(CreateHistoryDetailDTO, req.body)
            await validateOrReject(createHistoryDetailReqData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

}