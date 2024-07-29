import amqp from 'amqplib'
import { plainToClass } from 'class-transformer'

import { Exchange } from '../enums/exchange.enum'
import { ExchangeType } from '../enums/exchangeType.enum'
import { RoutingKey } from '../enums/routingKey.enum'
import { transporter } from '../../mail/mail.config'
import { SendCodeToVerifyAccountDTO } from '../dtos/sendCodeToVerifyAccountReqFromAmqp.dto'
import { SendCodeToResetPasswordDTO } from '../dtos/sendCodeToResetPasswordReqFromAmqp.dto'

export class MailWorker {
    private amqpConnector: amqp.Connection

    public constructor(amqpConnector: amqp.Connection) {
        this.amqpConnector = amqpConnector
    }

    public sendCodeToVerifyAccount() {
        this.amqpConnector.createChannel().then((channel) => {
            var exchange = Exchange.MAIL

            channel.assertExchange(exchange, ExchangeType.DIRECT, {
                durable: true
            })
            channel.assertQueue('', {
                exclusive: true,
                durable: true
            }).then((q) => {
                channel.bindQueue(q.queue, exchange, RoutingKey.MAIL_VERIFY_ACCOUNT_SEND_CODE)
                channel.consume(q.queue, async function(msg) {
                    try {
                        if (msg?.content) {
                            const mailInfo = plainToClass(SendCodeToVerifyAccountDTO, JSON.parse(msg.content.toString()))
                            await transporter.sendMail(mailInfo)
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

    public sendCodeToResetPassword() {
        this.amqpConnector.createChannel().then((channel) => {
            var exchange = Exchange.MAIL

            channel.assertExchange(exchange, ExchangeType.DIRECT, {
                durable: true
            })
            channel.assertQueue('', {
                exclusive: true,
                durable: true
            }).then((q) => {
                channel.bindQueue(q.queue, exchange, RoutingKey.MAIL_RESET_PASSWORD_SEND_CODE)
                channel.consume(q.queue, async function(msg) {
                    try {
                        if (msg?.content) {
                            const mailInfo = plainToClass(SendCodeToResetPasswordDTO, JSON.parse(msg.content.toString()))
                            await transporter.sendMail(mailInfo)
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
        this.sendCodeToVerifyAccount()
        this.sendCodeToResetPassword()
    }

}