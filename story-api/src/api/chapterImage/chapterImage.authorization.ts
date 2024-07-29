import { NextFunction, Request, Response } from 'express'
import { plainToClass } from 'class-transformer'

import { ChapterService } from '../chapter/chapter.service'
import { GetChapterRequestDTO } from '../chapter/dtos/getChapterRequest.dto'
import { servicePackageTransactionAttr } from '../../database/models/servicePackageTransaction'
import { Errors, handler } from '../../helpers/error.helper'
import { defineAbilityFor } from './chapterImage.defineAbility'
import { FsHelper } from '../../helpers/fs.helper'
import path from 'path'
import { StoryPriceHistoryService } from '../storyPriceHistory/storyPriceHistory.service'
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
            if (defineAbilityFor(req.user!).can('read', subject('chapterImage', {
                isAccessed: await checkUserAccessToTheStory(Number(req.query['chapterId']), req.user?.userId)
            }))) {
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

async function checkUserAccessToTheStory(chapterId: number, userId?: number) {
    const chapters = (await ChapterService.getChapter(plainToClass(GetChapterRequestDTO, {
        id: chapterId,
        page: 1,
        limit: 1
    } as GetChapterRequestDTO, {
        groups: [
            TransformerGroup.EXCLUDE,
            TransformerGroup.EXCLUDE_PAGE_LIMIT
        ]
    }))).rows

    let storyPriceAtPresent = 0
    if (chapters.length > 0) {
        const price = (await StoryPriceHistoryService.getStoryPriceAtPresent(chapters[0].dataValues.storyId))?.dataValues.price
        if (price) {
            storyPriceAtPresent = price
        }
    }
    if (storyPriceAtPresent === 0) {
        return true
    }

    if (userId) {
        const invoice = chapters.length > 0 ? await ChapterImagesService.getInvoice(userId, chapters[0].dataValues.storyId) : null
        const mostRecentServicePackageTransaction = await ChapterImagesService.getMostRecentServicePackageTransactionOfUser(userId)
        const expireDate = mostRecentServicePackageTransaction && new Date(mostRecentServicePackageTransaction.dataValues.createdAt.getTime() + (mostRecentServicePackageTransaction.dataValues as servicePackageTransactionAttr).servicePackage.dataValues.expireIn)
        if (invoice && expireDate && expireDate.getTime() > Date.now()) {
            return true
        }
    }

    return false
}