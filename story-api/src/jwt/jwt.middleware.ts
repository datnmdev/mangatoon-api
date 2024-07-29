import { NextFunction, Request, Response } from 'express'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'

import { envVariables } from '../dotenv'
import { Payload } from './jwt.type'
import { Errors } from '../helpers/error.helper'
import { redisClient } from '../redis/redis.config'
import { RedisKeyGenerator } from '../helpers/redisKey.helper'
import { Role } from '../enums/role.enum'

export class JwtMiddleware {

    static authentication = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accessToken = (req.headers?.['authorization'] as string)?.split('Bearer ')?.[1]
            const user = jwt.verify(accessToken, envVariables.REDIS_ACCESS_TOKEN_SECRET) as Payload
            
            if (user.role === Role.GUEST) {
                req.user = user
                return next()
            }

            const accessTokenInRedis = await redisClient.get(RedisKeyGenerator.accessTokenkey(accessToken))
            if (accessTokenInRedis) {
                req.user = user
                return next()
            }
            throw Errors.Unauthorized
        } catch (error) {
            if (error instanceof JsonWebTokenError) {
                return next(Errors.Unauthorized)
            }
            return next(error)
        }
    }

}