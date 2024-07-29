import amqp from 'amqplib'

import { Exchange } from '../enums/exchange.enum'
import { ExchangeType } from '../enums/exchangeType.enum'
import { RoutingKey } from '../enums/routingKey.enum'
import { plainToClass } from 'class-transformer'
import { ChapterService } from '../services/chapterService.service'
import { CreateChapterReqFromAmqpDTO } from '../dtos/createChapterReqFromAmqp.dto'

export class ChapterWorker {
    private amqpConnector: amqp.Connection

    public constructor(amqpConnector: amqp.Connection) {
        this.amqpConnector = amqpConnector
    }

    public createChapter() {
        this.amqpConnector.createChannel().then((channel) => {
            var exchange = Exchange.CHAPTER

            channel.assertExchange(exchange, ExchangeType.DIRECT, {
                durable: true
            })
            channel.assertQueue('', {
                exclusive: true,
                durable: true
            }).then((q) => {
                channel.bindQueue(q.queue, exchange, RoutingKey.CHAPTER_CREATE)
                channel.consume(q.queue, async function(msg) {
                    try {
                        if (msg?.content) {
                            await ChapterService.createChapter(plainToClass(CreateChapterReqFromAmqpDTO, JSON.parse(msg.content.toString())))
                            channel.ack(msg)
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }, {
                    noAck: false
                })
            })
        })
    }

    public do() {
        this.createChapter()
    }

}