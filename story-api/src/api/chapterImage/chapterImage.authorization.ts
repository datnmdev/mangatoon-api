import { NextFunction, Request, Response } from 'express'
import { plainToClass } from 'class-transformer'

import { ChapterService } from '../chapter/chapter.service'
import { GetChapterRequestDTO } from '../chapter/dtos/getChapterRequest.dto'
import { Errors, handler } from '../../helpers/error.helper'
import { defineAbilityFor } from './chapterImage.defineAbility'
import { FsHelper } from '../../helpers/fs.helper'
import path from 'path'
import { subject } from '@casl/ability'
import { TransformerGroup } from '../chapter/dtos/enums/group.enum'
import { ChapterImagesService } from './chapterImage.service'

export class ChapterImageAuthorization {

    static createChapterImages = (req: Request, res: Response, next: NextFunction) => {
        try {
            if (defineAbilityFor(req.user!).can('create', 'chapterImage')) {
                return next()
            }
            handler(async () => {
                const imgs = req.files as Express.Multer.File[]
                for (let img of imgs) {
                    await FsHelper.deleteFile(path.join(process.cwd(), img.path))
                }
            })
            return next(Errors.Forbidden)
        } catch (error) {
            handler(async () => {
                const imgs = req.files as Express.Multer.File[]
                for (let img of imgs) {
                    await FsHelper.deleteFile(path.join(process.cwd(), img.path))
                }
            })
            return next(error)
        }
    }

    static updateChapterImage = (req: Request, res: Response, next: NextFunction) => {
        try {
            if (defineAbilityFor(req.user!).can('update', 'chapterImage')) {
                return next()
            }
            return next(Errors.Forbidden)
        } catch (error) {
            return next(error)
        }
    }

    static deleteChapterImage = (req: Request, res: Response, next: NextFunction) => {
        try {
            if (defineAbilityFor(req.user!).can('delete', 'chapterImage')) {
                return next()
            }
            return next(Errors.Forbidden)
        } catch (error) {
            return next(error)
        }
    }

    static getChapterImagesByChapterId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (defineAbilityFor(req.user!).can('read', 'chapterImage')) {
                return next()
            }
            return next(Errors.Forbidden)
        } catch (error) {
            return next(error)
        }
    }

    static deleteChapterImageByChapterId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (defineAbilityFor(req.user!).can('delete', 'chapterImage')) {
                return next()
            }
            return next(Errors.Forbidden)
        } catch (error) {
            return next(error)
        }
    }

}