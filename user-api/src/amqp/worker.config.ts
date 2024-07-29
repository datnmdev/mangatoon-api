import amqp from 'amqplib'
import { MailWorker } from './worker/MailWorker.class'

export function createWorker(amqpConnector: amqp.Connection) {
    new MailWorker(amqpConnector).do()
}