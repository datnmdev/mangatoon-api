import { plainToClass, plainToInstance } from 'class-transformer'
import { NextFunction, Request, Response } from 'express'
import { getStorage } from 'firebase-admin/storage'

import { CreateStoryRequestDTO } from './dtos/createStoryRequest.dto'
import { StoryService } from './story.service'
import { AppResponse } from '../../helpers/response.helper'
import { FsHelper } from '../../helpers/fs.helper'
import { UpdateStoryRequestBodyDTO, UpdateStoryRequestParamDTO } from './dtos/updateStoryRequest.dto'
import { handler } from '../../helpers/error.helper'
import { StoryDTO } from './dtos/story.dto'
import { GetStoriesRequestDTO } from './dtos/getStoriesRequest.dto'
import { SearchStoryRequestDTO } from './dtos/searchStoriesRequest.dto'
import TransformGroup from './dtos/transform.group'
import { GetTopChartDataReqDTO } from './dtos/getTopChartDataReq.dto'
import { generateSignedUrl } from '../../helpers/signingUrl.helper'

export class StoryController {
    static createStory = async (req: Request, res: Response, next: NextFunction) => {
        const bucket = getStorage().bucket()

        try {
            let createStoryRequestData = plainToClass(CreateStoryRequestDTO, req.body)
            const coverImageUrl = `cover-images/${req.file!.filename}.${req.file!.mimetype.split('/')[1]}`
            await bucket.upload(req.file!.path, {
                destination: coverImageUrl
            })
            createStoryRequestData = {
                ...createStoryRequestData,
                coverImageUrl
            }
            const newStory = await StoryService.createStory(createStoryRequestData)
            return res.send(new AppResponse({
                ...newStory.dataValues,
                id: newStory.id,
                coverImageUrl: (await bucket.file(newStory.dataValues.coverImageUrl).getSignedUrl({
                    action: 'read',
                    expires: Date.now() + 5 * 60 * 1000
                }))[0]
            }, null))
        } catch (error) {
            handler(async () => {
                const coverImageUrl = `cover-images/${req.file!.filename}.${req.file!.mimetype.split('/')[1]}`
                await bucket.file(coverImageUrl).delete()
            })
            return next(error)
        } finally {
            handler(async () => {
                if (req.file) {
                    FsHelper.deleteFile(req.file.path)
                }
            })
        }
    }

    static updateStory = async (req: Request, res: Response, next: NextFunction) => {
        const bucket = getStorage().bucket()

        try {
            const updateStoryRequestParamData = plainToClass(UpdateStoryRequestParamDTO, req.params)
            let updateStoryRequestBodyData = plainToClass(UpdateStoryRequestBodyDTO, req.body)
            if (req.file) {
                const coverImageUrl = `cover-images/${req.file!.filename}.${req.file!.mimetype.split('/')[1]}`
                await bucket.upload(req.file!.path, {
                    destination: coverImageUrl
                })
                updateStoryRequestBodyData = {
                    ...updateStoryRequestBodyData,
                    coverImageUrl
                }
            }
            const oldStoryInfo = plainToInstance(StoryDTO, (await StoryService.getStories({
                id: updateStoryRequestParamData.id,
                status: [0, 1, 2, 3],
                page: 1,
                limit: 1
            })).rows.map(row => row.dataValues))

            const affectedcount = await StoryService.updateStory(updateStoryRequestParamData.id, updateStoryRequestBodyData)
            if (affectedcount[0] > 0) {
                if (updateStoryRequestBodyData.coverImageUrl) {
                    handler(async () => {
                        if (oldStoryInfo[0]?.coverImageUrl) {
                            await bucket.file(oldStoryInfo[0].coverImageUrl).delete()
                        }
                    })
                }
                return res.send(new AppResponse(true, null))
            }
            return res.send(new AppResponse(false, null))
        } catch (error) {
            if (req.file) {
                handler(async () => {
                    const coverImageUrl = `cover-images/${req.file!.filename}.${req.file!.mimetype.split('/')[1]}`
                    await bucket.file(coverImageUrl).delete()
                })
            }
            return next(error)
        } finally {
            handler(async () => {
                if (req.file) {
                    FsHelper.deleteFile(req.file.path)
                }
            })
        }
    }

    static getStories = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getStoriesRequestData = plainToClass(GetStoriesRequestDTO, req.query, {
                groups: [
                    TransformGroup.EXPOSE_PAGINATION,
                    TransformGroup.EXPOSE_STATUS
                ],
                exposeDefaultValues: true
            })
            const stories = await StoryService.getStories(getStoriesRequestData)
            const rows = []
            for (let row of stories.rows) {
                rows.push({
                    ...row.dataValues,
                    coverImageUrl: generateSignedUrl({
                        url: row.dataValues.coverImageUrl.startsWith('http')
                            ? row.dataValues.coverImageUrl
                            : (await getStorage().bucket().file(row.dataValues.coverImageUrl).getSignedUrl({
                                action: 'read',
                                expires: Date.now() + 5 * 60 * 1000
                            }))[0],
                        expireAt: Date.now() + 5 * 60 * 1000
                    })
                })
            }
            return res.send(new AppResponse({
                count: stories.count,
                rows
            }, null))
        } catch (error) {
            return next(error)
        }
    }

    static searchStories = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const searchStoryRequestData = plainToClass(SearchStoryRequestDTO, req.query)
            const stories = await StoryService.searchStories(searchStoryRequestData)
            const rows = []
            for (let row of stories.rows) {
                rows.push({
                    ...row.dataValues,
                    coverImageUrl: generateSignedUrl({
                        url: row.dataValues.coverImageUrl.startsWith('http')
                            ? row.dataValues.coverImageUrl
                            : (await getStorage().bucket().file(row.dataValues.coverImageUrl).getSignedUrl({
                                action: 'read',
                                expires: Date.now() + 5 * 60 * 1000
                            }))[0],
                        expireAt: Date.now() + 5 * 60 * 1000
                    })
                })
            }
            return res.send(new AppResponse({
                count: stories.count,
                rows
            }, null))
        } catch (error) {
            return next(error)
        }
    }

    static getTopChartData = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getTopChartDataReqData = plainToClass(GetTopChartDataReqDTO, req.query)
            const chartData = await StoryService.getTopChartData(getTopChartDataReqData)
            return res.send(new AppResponse(chartData, null))
        } catch (error) {
            console.log(error)

            return next(error)
        }
    }
}