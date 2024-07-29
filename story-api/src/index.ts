import express from 'express'
import bodyParser from 'body-parser'

const app = express()

// dotenv configs
import './dotenv'

// express configs
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// reflect metadata
import 'reflect-metadata'

// database
import './database/mysql.config'    

// redis configs
import './redis/redis.config'

// amqp configs
import './amqp/amqp.config'
import './amqp/worker.config'

// firebase admin
import './firebase'

// router
import { errorHandler } from './helpers/error.helper'
import { AppRouter } from './routes'

app.use('/', AppRouter)
app.use(errorHandler)

app.listen(3000, () => {
    console.log('Listening on port 3000...')
})