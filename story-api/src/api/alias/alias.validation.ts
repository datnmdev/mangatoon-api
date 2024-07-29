import { plainToClass } from 'class-transformer'
import { validateOrReject } from 'class-validator'
import { NextFunction, Request, Response } from 'express'

import { Errors } from '../../helpers/error.helper'
import { CreateAliasRequestDTO } from './dtos/createAliasRequest.dto'
import { DeleteAliasRequestDTO } from './dtos/deleteAlias.dto'
import { GetAliasesRequestDTO } from './dtos/getAliasesRequest.dto'

export class AliasValidation {

    static getAliases = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getAliasesRequestData = plainToClass(GetAliasesRequestDTO, req.query)
            await validateOrReject(getAliasesRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static createAlias = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createAliasRequestData = plainToClass(CreateAliasRequestDTO, req.body)
            await validateOrReject(createAliasRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static deleteAlias = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deleteAliasRequestData = plainToClass(DeleteAliasRequestDTO, req.params)
            await validateOrReject(deleteAliasRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

}