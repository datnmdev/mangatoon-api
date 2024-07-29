import amqp from 'amqplib'
import jwt from 'jsonwebtoken'

import { Exchange } from '../enums/exchange.enum'
import { ExchangeType } from '../enums/exchangeType.enum'
import { RoutingKey } from '../enums/routingKey.enum'
import { UserService } from '../services/user.service'
import { plainToClass } from 'class-transformer'
import { TokenPair } from '../../helpers/token'
import { redisClient } from '../../redis/redis.config'
import { RedisKeyGenerator } from '../../helpers/redisKey.helper'
import { Payload } from '../../jwt/jwt.type'
import { envVariables } from '../../dotenv'
import { CreateUserReqFromAmqpDTO } from '../dtos/CreateUserReqFromAmqp.dto'
import { RefreshTokenReqFromAmqp } from '../dtos/refreshTokenReqFromAmqp.dto'

export class UserWorker {
    private amqpConnector: amqp.Connection

    public constructor(amqpConnector: amqp.Connection) {
        this.amqpConnector = amqpConnector
    }

    public signUp() {
        this.amqpConnector.createChannel().then((channel) => {
            var exchange = Exchange.USER

            channel.assertExchange(exchange, ExchangeType.DIRECT, {
                durable: true
            })
            channel.assertQueue('', {
                exclusive: true,
                durable: true
            }).then((q) => {
                channel.bindQueue(q.queue, exchange, RoutingKey.USER_SIGNUP_CREATE)
                channel.consume(q.queue, async function(msg) {
                    try {
                        if (msg?.content) {
                            await UserService.createUser(plainToClass(CreateUserReqFromAmqpDTO, JSON.parse(msg.content.toString())))
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

    public signIn() {
        this.amqpConnector.createChannel().then((channel) => {
            var exchange = Exchange.USER

            channel.assertExchange(exchange, ExchangeType.DIRECT, {
                durable: true
            })
            channel.assertQueue('', {
                exclusive: true,
                durable: true
            }).then((q) => {
                channel.bindQueue(q.queue, exchange, RoutingKey.USER_SIGNIN_SAVE_TOKEN)
                channel.consume(q.queue, async function(msg) {
                    try {
                        if (msg?.content) {
                            const tokens = plainToClass(TokenPair, JSON.parse(msg.content.toString()))
                            const payload = jwt.decode(tokens.accessToken) as Payload
                            const ttl = Number(envVariables.REDIS_ACCESS_TOKEN_TTL)
                            const now = Math.floor(Date.now()/1000)
                            const iat = Math.floor(payload.iat/1000)
                            if (iat+ttl > now) {
                                await redisClient.setEx(RedisKeyGenerator.accessTokenkey(tokens.accessToken), iat+ttl-now, tokens.accessToken)
                            }
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

    public signOut() {
        this.amqpConnector.createChannel().then((channel) => {
            var exchange = Exchange.USER

            channel.assertExchange(exchange, ExchangeType.DIRECT, {
                durable: true
            })
            channel.assertQueue('', {
                exclusive: true,
                durable: true
            }).then((q) => {
                channel.bindQueue(q.queue, exchange, RoutingKey.USER_SIGNOUT_DELETE_TOKEN)
                channel.consume(q.queue, async function(msg) {
                    try {
                        if (msg?.content) {
                            const tokens = plainToClass(TokenPair, JSON.parse(msg.content.toString()))
                            await redisClient.del(RedisKeyGenerator.accessTokenkey(tokens.accessToken))
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

    public refreshToken() {
        this.amqpConnector.createChannel().then((channel) => {
            var exchange = Exchange.USER

            channel.assertExchange(exchange, ExchangeType.DIRECT, {
                durable: true
            })
            channel.assertQueue('', {
                exclusive: true,
                durable: true
            }).then((q) => {
                channel.bindQueue(q.queue, exchange, RoutingKey.USER_REFRESH_TOKEN)
                channel.consume(q.queue, async function(msg) {
                    try {
                        if (msg?.content) {
                            const refreshTokenReqData = plainToClass(RefreshTokenReqFromAmqp, JSON.parse(msg.content.toString()))
                            const payload = jwt.decode(refreshTokenReqData.newAccessToken) as Payload
                            const expireIn = Math.floor(payload.iat / 1000) + Number(envVariables.REDIS_ACCESS_TOKEN_TTL) - Math.floor(Date.now() / 1000)
                            await redisClient.multi()
                                .del(RedisKeyGenerator.accessTokenkey(refreshTokenReqData.oldAccessToken))
                                .setEx(RedisKeyGenerator.accessTokenkey(refreshTokenReqData.newAccessToken), expireIn, refreshTokenReqData.newAccessToken)
                                .exec()
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
        this.signUp()
        this.signIn()
        this.signOut()
        this.refreshToken()
    }

}