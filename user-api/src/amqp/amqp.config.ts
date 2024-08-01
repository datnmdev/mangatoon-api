import amqp from 'amqplib'

import { envVariables } from '../dotenv'
import { createWorker } from './worker.config'

export let amqpConnector: amqp.Connection

const connect = async () => {
    try {
        amqpConnector = await amqp.connect(String(envVariables.AMQP_URL))
        console.log('Connected to amqp...')
        createWorker(amqpConnector)
        console.log('Workers is working...')
    } catch (error) {
        setTimeout(connect, 1000)
        console.log(`AMQP Error::::${error}`)
    }
}

connect()