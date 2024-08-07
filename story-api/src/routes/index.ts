import express, { NextFunction, Request, Response, Router } from 'express'

import { AliasRouter } from '../api/alias/alias.route'
import { AuthorRouter } from '../api/author/author.route'
import { StoryAuthorDetailRouter } from '../api/storyAuthorDetail/storyAuthorDetail.route'
import { CountryRouter } from '../api/country/country.route'
import { GenreRouter } from '../api/genre/genre.route'
import { StoryRouter } from '../api/story/story.route'
import { StoryGenreDetailRouter } from '../api/storyGenreDetail/storyGenreDetail.route'
import { StoryFollowDetailRouter } from '../api/storyFollowDetail/storyFollowDetail.route'
import { StoryRatingDetailRouter } from '../api/storyRatingDetail/storyRatingDetail.route'
import { ChapterRouter } from '../api/chapter/chapter.route'
import { ChapterImageRouter } from '../api/chapterImage/chapterImage.route'
import { HistoryDetailRouter } from '../api/historyDetail/historyDetail.route'
import { ViewDetailRouter } from '../api/viewDetail/viewDetail.route'
import { sequelize } from '../database/mysql.config'
import { redisClient } from '../redis/redis.config'
import { amqpConnector } from '../amqp/amqp.config'
import { SigningUrlPayload, verifySignedUrl } from '../helpers/signingUrl.helper'
import { AppResponse } from '../helpers/response.helper'
import { Errors } from '../helpers/error.helper'
import axios from 'axios'

export const AppRouter = Router()

AppRouter.use('/uploads', express.static('uploads'))
AppRouter.use('/alias', AliasRouter)
AppRouter.use('/author', AuthorRouter)
AppRouter.use('/storyAuthorDetail', StoryAuthorDetailRouter)
AppRouter.use('/country', CountryRouter)
AppRouter.use('/genre', GenreRouter)
AppRouter.use('/story', StoryRouter)
AppRouter.use('/storyGenreDetail', StoryGenreDetailRouter)
AppRouter.use('/storyFollowDetail', StoryFollowDetailRouter)
AppRouter.use('/storyRatingDetail', StoryRatingDetailRouter)
AppRouter.use('/chapter', ChapterRouter)
AppRouter.use('/chapterImage', ChapterImageRouter)
AppRouter.use('/historyDetail', HistoryDetailRouter)
AppRouter.use('/viewDetail', ViewDetailRouter)

AppRouter.get('/health', async (req: Request, res: Response) => {
    try {
        await sequelize.authenticate()

        const redisCheck = await redisClient.ping()
        if (redisCheck !== 'PONG') {
            throw new Error('Redis is not responding with PONG')
        }

        if (amqpConnector === undefined) {
            throw new Error('AMQP connection is undefined')
        }

        return res.status(200).send('Available service!')
    } catch (error) {
        return res.status(503).send('Service is unavailable')
    }
})

AppRouter.get('/image',  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const queries = req.query as {
            payload: string,
            hash: string
        }

        if (verifySignedUrl(queries.payload, queries.hash)) {
            const payload: SigningUrlPayload = JSON.parse(Buffer.from(queries.payload, 'base64').toString('utf8'))
            let response
            if (payload.url.startsWith('http')) {
                response = await axios({
                    url: payload.url,
                    method: 'get',
                    headers: {
                        Referer: 'https://truyenqqviet.com/'
                    },
                    responseType: 'stream'
                })
            } else {
                response = await axios({
                    url: payload.url,
                    method: 'get',
                    responseType: 'stream'
                })
            }
            res.setHeader('Content-Type', response.headers['content-type'])
            return response.data.pipe(res)
        }

        return res.status(403).send(new AppResponse(null, Errors.Forbidden))
    } catch (error) {
        return next(error)
    }
})