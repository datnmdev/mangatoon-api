import amqp from 'amqplib'
import { ChapterWorker } from './worker/ChapterWorker.class'
import { UserWorker } from './worker/userWorker.class'

export function createWorker(amqpConnector: amqp.Connection) {
    new ChapterWorker(amqpConnector).do()
    new UserWorker(amqpConnector).do()
}