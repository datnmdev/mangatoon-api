import amqp from 'amqplib'

import { Exchange } from '../enums/exchange.enum'
import { ExchangeType } from '../enums/exchangeType.enum'
import { RoutingKey } from '../enums/routingKey.enum'
import { amqpConnector } from '../amqp.config'
import { CreateChapterReqFromAmqpDTO } from '../dtos/createChapterReqFromAmqp.dto'

export class ChapterPublisher {
    private static channel: amqp.Channel
    private static instance: ChapterPublisher

    private constructor(channel: amqp.Channel) {
        ChapterPublisher.channel = channel
    }

    public async chapterCreate(data: CreateChapterReqFromAmqpDTO) {
        const exchange = Exchange.CHAPTER
        await ChapterPublisher.channel.assertExchange(exchange, ExchangeType.DIRECT, {
            durable: true
        })
        ChapterPublisher.channel.publish(exchange, RoutingKey.CHAPTER_CREATE, Buffer.from(JSON.stringify(data)), {
            persistent: true
        })
    }

    public static async getInstance() {
        if (!ChapterPublisher.instance) {
            const channel = await amqpConnector.createChannel()
            ChapterPublisher.instance = new ChapterPublisher(channel)
        }
        return ChapterPublisher.instance
    }

}