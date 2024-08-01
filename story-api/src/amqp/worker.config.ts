import amqp from 'amqplib'

import { UserWorker } from './worker/userWorker.class'

export function createWorker(amqpConnector: amqp.Connection) {
    new UserWorker(amqpConnector).do()
}