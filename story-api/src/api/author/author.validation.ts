import { plainToClass } from 'class-transformer'
import { validateOrReject } from 'class-validator'
import { NextFunction, Request, Response } from 'express'

import { GetAuthorsRequestDTO } from './dtos/getAuthorsRequestDTO.dto'
import { Errors } from '../../helpers/error.helper'
import { CreateAuthorRequestDTO } from './dtos/createAuthorRequest.dto'
import { UpdateAuthorRequestBodyDTO, UpdateAuthorRequestParamDTO } from './dtos/updateAuthorRequest.dto'
import { DeleteAuthorRequest } from './dtos/deleteAuthorRequest.dto'
import { SearchAuthorReqDTO } from './dtos/searchAuthorReq.dto'

export class AuthorValidation {

    static getAuthors = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getAuthorsRequestData = plainToClass(GetAuthorsRequestDTO, req.query)
            await validateOrReject(getAuthorsRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static createAuthor = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createAuthorRequestData = plainToClass(CreateAuthorRequestDTO, req.body)
            await validateOrReject(createAuthorRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static updateAuthor = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updateAuthorRequestParamData = plainToClass(UpdateAuthorRequestParamDTO, req.params)
            const updateAuthorRequestBodyData = plainToClass(UpdateAuthorRequestBodyDTO, req.body)
            await validateOrReject(updateAuthorRequestParamData)
            await validateOrReject(updateAuthorRequestBodyData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static deleteAuthor = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deleteAuthorRequestParamData = plainToClass(DeleteAuthorRequest, req.params)
            await validateOrReject(deleteAuthorRequestParamData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static searchAuthor = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const searchAuthorRequestData = plainToClass(SearchAuthorReqDTO, req.query)
            await validateOrReject(searchAuthorRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

}