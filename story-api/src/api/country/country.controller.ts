import { plainToClass } from 'class-transformer'
import { NextFunction, Request, Response } from 'express'

import { CreateCountryRequestDTO } from './dtos/createCountryRequest.dto'
import { CountryService } from './country.service'
import { AppResponse } from '../../helpers/response.helper'
import { UpdateCountryRequestBodyDTO, UpdateCountryRequestParamDTO } from './dtos/updateCountryRequest.dto'
import { DeleteCountryRequestDTO } from './dtos/deleteCountryRequest.dto'
import { GetCountryRequestDTO } from './dtos/getCountryRequest.dto'

export class CountryController {

    static createCountry = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createCountryRequestData = plainToClass(CreateCountryRequestDTO, req.body)
            await CountryService.createCountry(createCountryRequestData)
            return res.send(new AppResponse(true, null))
        } catch (error) {
            return next(error)
        }
    }

    static updateCountry = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updateCountryRequestParamData = plainToClass(UpdateCountryRequestParamDTO, req.params)
            const updateCountryRequestBodyData = plainToClass(UpdateCountryRequestBodyDTO, req.body)
            const affectedCount = await CountryService.updateCountry(updateCountryRequestParamData.id, updateCountryRequestBodyData)
            if (affectedCount[0] > 0) {
                return res.send(new AppResponse(true, null))
            }
            return res.send(new AppResponse(true, null))
        } catch (error) {
            return next(error)
        }
    }

    static deleteCountry = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deleteCountryRequestData = plainToClass(DeleteCountryRequestDTO, req.params)
            const deletedCount = await CountryService.deleteCountry(deleteCountryRequestData.id)
            if (deletedCount > 0) {
                return res.send(new AppResponse(true, null))
            }
            return res.send(new AppResponse(false, null))
        } catch (error) {
            return next(error)
        }
    }

    static getCountry = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getCountryRequestData = plainToClass(GetCountryRequestDTO, req.query)
            const countries = await CountryService.getCountry(getCountryRequestData)
            return res.send(new AppResponse(countries, null))
        } catch (error) {
            return next(error)
        }
    }

}