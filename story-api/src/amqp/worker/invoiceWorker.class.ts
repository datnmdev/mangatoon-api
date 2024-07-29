import amqp from 'amqplib'

import { Exchange } from '../enums/exchange.enum'
import { ExchangeType } from '../enums/exchangeType.enum'
import { RoutingKey } from '../enums/routingKey.enum'
import { plainToClass } from 'class-transformer'
import { InvoiceService } from '../services/invoice.service'
import { CreateInvoiceReqFromAmqpDTO } from '../dtos/createInvoiceReqFromAmqp.dto'

export class InvoiceWorker {
    private amqpConnector: amqp.Connection

    public constructor(amqpConnector: amqp.Connection) {
        this.amqpConnector = amqpConnector
    }

    public createInvoice() {
        this.amqpConnector.createChannel().then((channel) => {
            var exchange = Exchange.INVOICE

            channel.assertExchange(exchange, ExchangeType.DIRECT, {
                durable: true
            })
            channel.assertQueue('', {
                exclusive: true,
                durable: true
            }).then((q) => {
                channel.bindQueue(q.queue, exchange, RoutingKey.INVOICE_CREATE)
                channel.consume(q.queue, async function(msg) {
                    try {
                        if (msg?.content) {
                            await InvoiceService.createInvoice(plainToClass(CreateInvoiceReqFromAmqpDTO, JSON.parse(msg.content.toString())))
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
        this.createInvoice()
    }

}