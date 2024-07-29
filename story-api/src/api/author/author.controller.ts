import { plainToClass } from 'class-transformer'
import { NextFunction, Request, Response } from 'express'

import { GetAuthorsRequestDTO } from './dtos/getAuthorsRequestDTO.dto'
import { AuthorService } from './author.service'
import { AppResponse } from '../../helpers/response.helper'
import { CreateAuthorRequestDTO } from './dtos/createAuthorRequest.dto'
import { UpdateAuthorRequestBodyDTO, UpdateAuthorRequestParamDTO } from './dtos/updateAuthorRequest.dto'
import { DeleteAuthorRequest } from './dtos/deleteAuthorRequest.dto'
import { SearchAuthorReqDTO } from './dtos/searchAuthorReq.dto'

export class AuthorController {

    static getAuthors = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getAuthorsRequestData = plainToClass(GetAuthorsRequestDTO, req.query)
            const authors = await AuthorService.getAuthors(getAuthorsRequestData)
            return res.send(new AppResponse(authors, null))
        } catch (error) {
            return next(error)
        }
    }

    static createAuthor = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createAuthorRequestData = plainToClass(CreateAuthorRequestDTO, req.body)
            const newAuthor = await AuthorService.createAuthor(createAuthorRequestData)
            return res.send(new AppResponse({
                ...newAuthor.dataValues,
                id: newAuthor.id
            }, null))
        } catch (error) {
            return next(error)
        }
    }

    static updateAuthor = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updateAuthorRequestParamData = plainToClass(UpdateAuthorRequestParamDTO, req.params)
            const updateAuthorRequestBodyData = plainToClass(UpdateAuthorRequestBodyDTO, req.body)
            const affectedCount = await AuthorService.updateAuthor(updateAuthorRequestParamData.id, updateAuthorRequestBodyData)
            
            if (affectedCount[0] === 1) {
                return res.send(new AppResponse(true, null))
            }
            return res.send(new AppResponse(false, null))
        } catch (error) {
            return next(error)
        }
    }

    static deleteAuthor = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deleteAuthorRequestData = plainToClass(DeleteAuthorRequest, req.params)
            const deletedCount = await AuthorService.deleteAuthor(deleteAuthorRequestData.id)
            if (deletedCount > 0) {
                return res.send(new AppResponse(true, null))
            }
            return res.send(new AppResponse(false, null))
        } catch (error) {
            return next(error)
        }
    }

    static searchAuthor = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const searchAuthorReqData = plainToClass(SearchAuthorReqDTO, req.query)
            const genres = await AuthorService.searchAuthor(searchAuthorReqData)
            return res.send(new AppResponse(genres, null))
        } catch (error) {
            return next(error)
        }
    }

}