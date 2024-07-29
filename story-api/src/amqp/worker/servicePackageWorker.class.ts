import amqp from 'amqplib'

import { Exchange } from '../enums/exchange.enum'
import { ExchangeType } from '../enums/exchangeType.enum'
import { RoutingKey } from '../enums/routingKey.enum'
import { plainToClass } from 'class-transformer'
import { ServicePackageService } from '../services/servicePackage.service'
import { CreateServicePackageReqFromAmqpDTO } from '../dtos/createServicePackageReqFromAmqp.dto'

export class ServicePackageWorker {
    private amqpConnector: amqp.Connection

    public constructor(amqpConnector: amqp.Connection) {
        this.amqpConnector = amqpConnector
    }

    public createServicePackage() {
        this.amqpConnector.createChannel().then((channel) => {
            var exchange = Exchange.SERVICE_PACKAGE

            channel.assertExchange(exchange, ExchangeType.DIRECT, {
                durable: true
            })
            channel.assertQueue('', {
                exclusive: true,
                durable: true
            }).then((q) => {
                channel.bindQueue(q.queue, exchange, RoutingKey.SERVICE_PACKAGE_CREATE)
                channel.consume(q.queue, async function(msg) {
                    try {
                        if (msg?.content) {
                            await ServicePackageService.createServicePackage(plainToClass(CreateServicePackageReqFromAmqpDTO, JSON.parse(msg.content.toString())))
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
        this.createServicePackage()
    }

}