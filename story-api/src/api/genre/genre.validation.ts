import { plainToClass } from 'class-transformer'
import { validateOrReject } from 'class-validator'
import { NextFunction, Request, Response } from 'express'

import { CreateGenreRequestDTO } from './dtos/createGenreRequest.dto'
import { Errors } from '../../helpers/error.helper'
import { DeleteGenreRequestDTO } from './dtos/deleteGenreRequest.dto'
import { UpdateGenreRequestBodyDTO, UpdateGenreRequestParamDTO } from './dtos/updateGenreRequest.dto'
import { SearchGenreReqDTO } from './dtos/searchGenreReq.dto'

export class GenreValidation {

    static createGenre = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createGenreRequestData = plainToClass(CreateGenreRequestDTO, req.body)
            await validateOrReject(createGenreRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static deleteGenre = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deleteGenreRequestData = plainToClass(DeleteGenreRequestDTO, req.params)
            await validateOrReject(deleteGenreRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static updateGenre = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updateGenreRequestParamData = plainToClass(UpdateGenreRequestParamDTO, req.params)
            const updateGenreRequestBodyData = plainToClass(UpdateGenreRequestBodyDTO, req.body)
            await validateOrReject(updateGenreRequestParamData)
            await validateOrReject(updateGenreRequestBodyData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static searchGenre = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const searchGenreRequestData = plainToClass(SearchGenreReqDTO, req.query)
            await validateOrReject(searchGenreRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }
}