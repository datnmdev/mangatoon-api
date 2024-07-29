import express from 'express'
import bodyParser from 'body-parser'

const app = express()

// express configs
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// firebase
import './firebase'

// dotenv configs
import './dotenv'

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
import { AppRouter } from './routes'
import { envVariables } from './dotenv'

app.use('/', AppRouter)
app.use(errorHandler)

app.listen(Number(envVariables.SERVER_PORT), () => {
    console.log(`Listening on port ${Number(envVariables.SERVER_PORT)}...`)
})