import { NextFunction, Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { validateOrReject } from 'class-validator'

import { Errors } from '../../helpers/error.helper'
import { CreateCountryRequestDTO } from './dtos/createCountryRequest.dto'
import { UpdateCountryRequestBodyDTO, UpdateCountryRequestParamDTO } from './dtos/updateCountryRequest.dto'
import { DeleteCountryRequestDTO } from './dtos/deleteCountryRequest.dto'

export class CountryValidation {

    static createCountry = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createCountryRequestData = plainToClass(CreateCountryRequestDTO, req.body)
            await validateOrReject(createCountryRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static updateCountry = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updateCountryRequestParamData = plainToClass(UpdateCountryRequestParamDTO, req.params)
            const updateCountryRequestBodyData = plainToClass(UpdateCountryRequestBodyDTO, req.body)
            await validateOrReject(updateCountryRequestParamData)
            await validateOrReject(updateCountryRequestBodyData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static deleteCountry = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deleteCountryRequestData = plainToClass(DeleteCountryRequestDTO, req.params)
            await validateOrReject(deleteCountryRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

}