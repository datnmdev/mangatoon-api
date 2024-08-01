import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'

const app = express()

// dotenv configs
import './dotenv'

// express configs
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/uploads', express.static('uploads'))

// reflect metadata
import 'reflect-metadata'

// database
import './database/mysql.config'    

// redis configs
import './redis/redis.config'

// amqp configs
import './amqp/amqp.config'
import './amqp/worker.config'

// router
import { errorHandler } from './helpers/error.helper'
import { AppRouter } from './routers'
import { sequelize } from './database/mysql.config'
import { redisClient } from './redis/redis.config'
import { amqpConnector } from './amqp/amqp.config'

app.use('/', AppRouter)
app.get('/health', async (req: Request, res: Response) => {
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
app.use(errorHandler)

app.listen(3001, () => {
    console.log('Listening on port 3001')
})