import amqp from 'amqplib'

import { Exchange } from '../enums/exchange.enum'
import { ExchangeType } from '../enums/exchangeType.enum'
import { RoutingKey } from '../enums/routingKey.enum'
import { amqpConnector } from '../amqp.config'
import { SendCodeToVerifyAccountDTO } from '../dtos/sendCodeToVerifyAccountReqFromAmqp.dto'
import { SendCodeToResetPasswordDTO } from '../dtos/sendCodeToResetPasswordReqFromAmqp.dto'

export class MailPublisher {
    private static channel: amqp.Channel
    private static instance: MailPublisher

    private constructor(channel: amqp.Channel) {
        MailPublisher.channel = channel
    }

    public async sendCodeToVerifyAccount(data: SendCodeToVerifyAccountDTO) {
        const exchange = Exchange.MAIL
        await MailPublisher.channel.assertExchange(exchange, ExchangeType.DIRECT, {
            durable: true
        })
        MailPublisher.channel.publish(exchange, RoutingKey.MAIL_VERIFY_ACCOUNT_SEND_CODE, Buffer.from(JSON.stringify(data)), {
            persistent: true
        })
    }

    public async sendCodeToResetPassword(data: SendCodeToResetPasswordDTO) {
        const exchange = Exchange.MAIL
        await MailPublisher.channel.assertExchange(exchange, ExchangeType.DIRECT, {
            durable: true
        })
        MailPublisher.channel.publish(exchange, RoutingKey.MAIL_RESET_PASSWORD_SEND_CODE, Buffer.from(JSON.stringify(data)), {
            persistent: true
        })
    }

    public static async getInstance() {
        if (!MailPublisher.instance) {
            const channel = await amqpConnector.createChannel()
            MailPublisher.instance = new MailPublisher(channel)
        }
        return MailPublisher.instance
    }

}