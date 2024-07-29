import { plainToClass } from 'class-transformer'
import { NextFunction, Request, Response } from 'express'

import { CreateGenreRequestDTO } from './dtos/createGenreRequest.dto'
import { GenreService } from './genre.service'
import { AppResponse } from '../../helpers/response.helper'
import { DeleteGenreRequestDTO } from './dtos/deleteGenreRequest.dto'
import { UpdateGenreRequestBodyDTO, UpdateGenreRequestParamDTO } from './dtos/updateGenreRequest.dto'
import { GetGenreRequestDTO } from './dtos/getGenreRequest.dto'
import { SearchGenreReqDTO } from './dtos/searchGenreReq.dto'

export class GenreController {

    static createGenre = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createGenreRequestData = plainToClass(CreateGenreRequestDTO, req.body)
            const genre = await GenreService.createGenre(createGenreRequestData)
            return res.send(new AppResponse({
                ...genre.dataValues,
                id: genre.id
            }, null))
        } catch (error) {
            return next(error)
        }
    }

    static deleteGenre = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deleteGenreRequestData = plainToClass(DeleteGenreRequestDTO, req.params)
            const deletedCount = await GenreService.deleteGenre(deleteGenreRequestData.id)
            if (deletedCount > 0) {
                return res.send(new AppResponse(true, null))
            }
            return res.send(new AppResponse(false, null))
        } catch (error) {
            return next(error)
        }
    }

    static updateGenre = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updateGenreRequestParamData = plainToClass(UpdateGenreRequestParamDTO, req.params)
            const updateGenreRequestBodyData = plainToClass(UpdateGenreRequestBodyDTO, req.body)
            const affectedCount = await GenreService.updateGenre(updateGenreRequestParamData.id, updateGenreRequestBodyData)
            if (affectedCount[0] > 0) {
                return res.send(new AppResponse(true, null))
            }
            return res.send(new AppResponse(false, null))
        } catch (error) {
            return next(error)
        }
    }

    static getGenres = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getGenreRequestData = plainToClass(GetGenreRequestDTO, req.query)
            const genres = await GenreService.getGenres(getGenreRequestData)
            return res.send(new AppResponse(genres, null))
        } catch (error) {
            return next(error)
        }
    }

    static searchGenre = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const searchGenreReqData = plainToClass(SearchGenreReqDTO, req.query)
            const genres = await GenreService.searchGenre(searchGenreReqData)
            return res.send(new AppResponse(genres, null))
        } catch (error) {
            return next(error)
        }
    }

}