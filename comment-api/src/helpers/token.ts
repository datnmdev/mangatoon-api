import jwt from 'jsonwebtoken'

import { Payload } from '../jwt/jwt.type'
import { envVariables } from '../dotenv'

export class TokenPair {
    accessToken: string
    refreshToken: string
}

export class TokenHelper {

    static createTokenPair = (payload: Payload) => {
        const tokenPair: TokenPair = {
            accessToken: jwt.sign(Object.assign({}, payload), String(envVariables.REDIS_ACCESS_TOKEN_SECRET), { algorithm: 'HS256' }),
            refreshToken: jwt.sign(Object.assign({}, payload), String(envVariables.REDIS_REFRESH_TOKEN_SECRET), { algorithm: 'HS256' })
        }
        return tokenPair
    }

}