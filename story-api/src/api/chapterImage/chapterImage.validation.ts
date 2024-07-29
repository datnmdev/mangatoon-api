import { NextFunction, Request, Response } from 'express'
import { validateOrReject } from 'class-validator'
import { plainToClass } from 'class-transformer'
import path from 'path'

import { Errors, handler } from '../../helpers/error.helper'
import { CreateChapterImagesRequestDTO } from './dtos/createChapterImagesRequest.dto'
import { FsHelper } from '../../helpers/fs.helper'
import { UpdateChapterImageRequestBodyDTO, UpdateChapterImageRequestParamDTO } from './dtos/updateChapterImageRequest.dto'
import { GetChapterImagesByChapterIdRequestDTO } from './dtos/getChapterImagesByChapterIdRequest.dto'
import { GetImageRequestDTO } from './dtos/getImageRequest.dto'
import { DeleteChapterImageRequestParamDTO } from './dtos/deleteChapterImageRequest.dto'
import { DeleteChapterImageByChapterIdReqDTO } from './dtos/deleteChapterImageByChapterIdReq.dto'

export class ChapterImagesValidation {

    static createChapterImages = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createChapterImagesRequestData = plainToClass(CreateChapterImagesRequestDTO, {
                paths: req.files ? (req.files as Express.Multer.File[]).map(file => file.originalname.split('.')[0]) : undefined,
                ...req.body
            } as CreateChapterImagesRequestDTO)
            await validateOrReject(createChapterImagesRequestData)
            return next()
        } catch (error) {
            handler(async () => {
                const imgs = req.files as Express.Multer.File[]
                for (let img of imgs) {
                    await FsHelper.deleteFile(path.join(process.cwd(), img.path))
                }
            })
            return next(Errors.BadRequest)
        }
    }

    static updateChapterImage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updateChapterImagesRequestParamData = plainToClass(UpdateChapterImageRequestParamDTO, req.params)
            const updateChapterImagesRequestBodyData = plainToClass(UpdateChapterImageRequestBodyDTO, req.body)
            await validateOrReject(updateChapterImagesRequestParamData)
            await validateOrReject(updateChapterImagesRequestBodyData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static deleteChapterImage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deleteChapterImagesRequestParamData = plainToClass(DeleteChapterImageRequestParamDTO, req.params)
            await validateOrReject(deleteChapterImagesRequestParamData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static getChapterImagesByChapterId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getChapterImagesByChapterIdRequestData = plainToClass(GetChapterImagesByChapterIdRequestDTO, req.query)
            await validateOrReject(getChapterImagesByChapterIdRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static getImage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getImageReqData = plainToClass(GetImageRequestDTO, req.body)
            await validateOrReject(getImageReqData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static deleteChapterImageByChapterId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deleteChapterImageByChapterIdReqData = plainToClass(DeleteChapterImageByChapterIdReqDTO, req.body)
            await validateOrReject(deleteChapterImageByChapterIdReqData)
            return next()
        } catch (error) {
            return Errors.BadRequest
        }
    }

}