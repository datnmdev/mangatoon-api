import amqp from 'amqplib'

import { Exchange } from '../enums/exchange.enum'
import { ExchangeType } from '../enums/exchangeType.enum'
import { RoutingKey } from '../enums/routingKey.enum'
import { amqpConnector } from '../amqp.config'
import { TokenPair } from '../../helpers/token'
import { CreateUserReqFromAmqpDTO } from '../dtos/createUserReqFromAmqp.dto'
import { RefreshTokenReqFromAmqp } from '../dtos/refreshTokenReqFromAmqp.dto'

export class UserPublisher {
    private static channel: amqp.Channel
    private static instance: UserPublisher

    private constructor(channel: amqp.Channel) {
        UserPublisher.channel = channel
    }

    public async signUp(data: CreateUserReqFromAmqpDTO) {
        const exchange = Exchange.USER
        await UserPublisher.channel.assertExchange(exchange, ExchangeType.DIRECT, {
            durable: true
        })
        UserPublisher.channel.publish(exchange, RoutingKey.USER_SIGNUP_CREATE, Buffer.from(JSON.stringify(data)), {
            persistent: true
        })
    }

    public async signIn(data: TokenPair) {
        const exchange = Exchange.USER
        await UserPublisher.channel.assertExchange(exchange, ExchangeType.DIRECT, {
            durable: true
        })
        UserPublisher.channel.publish(exchange, RoutingKey.USER_SIGNIN_SAVE_TOKEN, Buffer.from(JSON.stringify(data)), {
            persistent: true
        })
    }

    public async signOut(data: TokenPair) {
        const exchange = Exchange.USER
        await UserPublisher.channel.assertExchange(exchange, ExchangeType.DIRECT, {
            durable: true
        })
        UserPublisher.channel.publish(exchange, RoutingKey.USER_SIGNOUT_DELETE_TOKEN, Buffer.from(JSON.stringify(data)), {
            persistent: true
        })
    }

    public async refreshToken(data: RefreshTokenReqFromAmqp) {
        const exchange = Exchange.USER
        await UserPublisher.channel.assertExchange(exchange, ExchangeType.DIRECT, {
            durable: true
        })
        UserPublisher.channel.publish(exchange, RoutingKey.USER_REFRESH_TOKEN, Buffer.from(JSON.stringify(data)), {
            persistent: true
        })
    }

    public static async getInstance() {
        if (!UserPublisher.instance) {
            const channel = await amqpConnector.createChannel()
            UserPublisher.instance = new UserPublisher(channel)
        }
        return UserPublisher.instance
    }

}