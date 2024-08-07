import { plainToClass } from 'class-transformer'
import e, { NextFunction, Request, Response } from 'express'

import { CreateChapterImagesRequestDTO } from './dtos/createChapterImagesRequest.dto'
import { AppResponse } from '../../helpers/response.helper'
import { sequelize } from '../../database/mysql.config'
import { ChapterImagesService } from './chapterImage.service'
import { handler } from '../../helpers/error.helper'
import { FsHelper } from '../../helpers/fs.helper'
import { UpdateChapterImageRequestBodyDTO, UpdateChapterImageRequestParamDTO } from './dtos/updateChapterImageRequest.dto'
import { DeleteChapterImageRequestParamDTO } from './dtos/deleteChapterImageRequest.dto'
import { GetChapterImagesByChapterIdRequestDTO } from './dtos/getChapterImagesByChapterIdRequest.dto'
import { GetImageRequestDTO } from './dtos/getImageRequest.dto'
import axios from 'axios'
import { CreateChapterImageDTO } from './dtos/createChapterImage.dto'
import { getStorage } from 'firebase-admin/storage'
import { DeleteChapterImageByChapterIdReqDTO } from './dtos/deleteChapterImageByChapterIdReq.dto'
import { generateSignedUrl } from '../../helpers/signingUrl.helper'

export class ChapterImageController {

    static createChapterImages = async (req: Request, res: Response, next: NextFunction) => {
        const bucket = getStorage().bucket()
        const transaction = await sequelize.transaction()

        try {
            const sortedFiles = (req.files as Express.Multer.File[]).sort((file1, file2) => Number(file1.originalname) > Number(file2.originalname) ? 1 : -1)
            const createChapterImagesRequestData = plainToClass(CreateChapterImagesRequestDTO, {
                paths: sortedFiles.map(file => `${file.path}.${file.mimetype.split('/')[1]}`),
                ...req.body
            })
            for (let path of createChapterImagesRequestData.paths) {
                const fileName = path.split('/')[path.split('/').length - 1]
                const _path = `chapter-images/${createChapterImagesRequestData.chapterId}/${fileName}`

                if (!path.startsWith('http')) {
                    await bucket.upload(path.split('.')[0], {
                        destination: _path
                    })
                }

                await ChapterImagesService.createChapterImage(plainToClass(CreateChapterImageDTO, {
                    chapterId: createChapterImagesRequestData.chapterId,
                    path: path.startsWith('http') ? path : _path
                } as CreateChapterImageDTO))
            }
            await transaction.commit()
            return res.send(new AppResponse(true, null))
        } catch (error) {
            await transaction.rollback()
            handler(async () => {
                const imgs = req.files as Express.Multer.File[]
                for (let img of imgs) {
                    await FsHelper.deleteFile(img.path)
                }
            })
            return next(error)
        } finally {
            handler(async () => {
                if (req.files) {
                    for (let file of (req.files as Express.Multer.File[])) {
                        await FsHelper.deleteFile(file.path)
                    }
                }
            })
        }
    }

    static updateChapterImage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updateChapterImageRequestParamĐata = plainToClass(UpdateChapterImageRequestParamDTO, req.params)
            const updateChapterImageRequestBodyĐata = plainToClass(UpdateChapterImageRequestBodyDTO, req.body)
            const affectedCount = await ChapterImagesService.updateChapterImage(updateChapterImageRequestParamĐata.id, updateChapterImageRequestBodyĐata)
            if (affectedCount[0] > 0) {
                return res.send(new AppResponse(true, null))
            }
            return res.send(new AppResponse(false, null))
        } catch (error) {
            return next(error)
        }
    }

    static deleteChapterImage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deleteChapterImageRequestData = plainToClass(DeleteChapterImageRequestParamDTO, req.params)
            const deletedCount = await ChapterImagesService.deleteChapterImage(deleteChapterImageRequestData.id)
            if (deletedCount > 0) {
                return res.send(new AppResponse(true, null))
            }
            return res.send(new AppResponse(false, null))
        } catch (error) {
            return next(error)
        }
    }

    static getChapterImagesByChapterId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getChapterImagesByChapterIdRequestData = plainToClass(GetChapterImagesByChapterIdRequestDTO, req.query)
            const chapterImages = await ChapterImagesService.getChapterImagesByChapterId(getChapterImagesByChapterIdRequestData.chapterId)
            const data = []
            for (let chapterImage of chapterImages) {
                data.push({
                    ...chapterImage.dataValues,
                    path: generateSignedUrl({
                        url: chapterImage.dataValues.path.startsWith('http')
                            ? chapterImage.dataValues.path
                            : (await getStorage().bucket().file(chapterImage.dataValues.path).getSignedUrl({
                                action: 'read',
                                expires: Date.now() + 5 * 60 * 1000
                            }))[0],
                        expireAt: Date.now() + 5 * 60 * 1000
                    })
                })
            }
            return res.send(new AppResponse(data, null))
        } catch (error) {
            return next(error)
        }
    }

    static deleteChapterImageByChapterId = async (req: Request, res: Response, next: NextFunction) => {
        const bucket = getStorage().bucket()
        try {
            const deleteChapterImageByChapterIdReqData = plainToClass(DeleteChapterImageByChapterIdReqDTO, req.body)
            const deletedCount = await ChapterImagesService.deleteChapterImageByChapterId(deleteChapterImageByChapterIdReqData.chapterId)
            await bucket.deleteFiles({
                prefix: `chapter-images/${deleteChapterImageByChapterIdReqData.chapterId}`
            })
            if (deletedCount > 0) {
                return res.send(new AppResponse(true, null))
            }

            return res.send(new AppResponse(false, null))
        } catch (error) {
            return next(error)
        }
    }

}