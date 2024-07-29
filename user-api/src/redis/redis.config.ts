import { createClient } from 'redis'

import { envVariables } from '../dotenv'

export const redisClient = createClient({
    url: envVariables.REDIS_URL
})

redisClient.connect()

redisClient.on('error', function () {
    console.log('Redis connect error!')
})

redisClient.on('reconnecting', function () {
    console.log('Redis reconnecting...')
})

redisClient.on('connect', function () {
    console.log('Redis connect...')
})

redisClient.on('ready', function () {
    console.log('Redis connected! Cache Service is Working...')
})