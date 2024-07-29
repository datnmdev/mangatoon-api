import { NextFunction, Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { randomUUID } from 'crypto'
import randomString from 'randomstring'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getAuth } from 'firebase-admin/auth'

import { SignUpWithEmailPasswordRequestDTO } from './dtos/signUpWithEmailPasswordRequest.dto'
import { sequelize } from '../../database/mysql.config'
import { AuthService } from './auth.service'
import { UserDTO } from './dtos/user.dto'
import { AccountDTO } from './dtos/account.dto'
import { EmailPasswordCredentialDTO } from './dtos/emailPasswordCredential.dto'
import { AppResponse } from '../../helpers/response.helper'
import { MailPublisher } from '../../amqp/publisher/mailPublisher.class'
import { envVariables } from '../../dotenv'
import OtpContent from '../../mail/content/otp'
import { redisClient } from '../../redis/redis.config'
import { RedisKeyGenerator } from '../../helpers/redisKey.helper'
import { SignInWithEmailPasswordRequestDTO } from './dtos/signInWithEmailPasswordRequest.dto'
import { TokenHelper, TokenPair } from '../../helpers/token'
import { Payload } from '../../jwt/jwt.type'
import { UserPublisher } from '../../amqp/publisher/userPublisher.class'
import { AccountStatus } from '../../enums/account.enum'
import { SignOutRequestDTO } from './dtos/signOutRequest.dto'
import { SendCodeToVerifyAccountDTO } from '../../amqp/dtos/sendCodeToVerifyAccountReqFromAmqp.dto'
import { CreateUserReqFromAmqpDTO } from '../../amqp/dtos/createUserReqFromAmqp.dto'
import { RefreshTokenReqDTO } from './dtos/refreshTokenReq.dto'
import { RefreshTokenReqFromAmqp } from '../../amqp/dtos/refreshTokenReqFromAmqp.dto'
import { TransformGroup } from './dtos/transform.group'
import { SignInWithGoogleReqDTO } from './dtos/signInWithGoogleReq.dto'
import { SignInWithFacebookReqDTO } from './dtos/signInWithFacebookReq.dto'
import { GoogleCredentialDTO } from './dtos/googleCredential.dto'
import { FacebookCredentialDTO } from './dtos/facebookCredential.dto'
import { Role } from '../../enums/role.enum'

export class AuthController {

    static signUpWithEmailPassword = async (req: Request, res: Response, next: NextFunction) => {
        const transaction = await sequelize.transaction()

        try {
            const signUpWithEmailPasswordRequestData = plainToClass(SignUpWithEmailPasswordRequestDTO, req.body, {
                groups: [
                    TransformGroup.EXE_HASH_PASSWORD
                ]
            })

            const user = await AuthService.createUser(plainToClass(UserDTO, {
                ...signUpWithEmailPasswordRequestData,
                name: signUpWithEmailPasswordRequestData.name || `user-${randomUUID().toString().replaceAll('-', '')}`
            }, {
                exposeUnsetFields: false
            }), transaction)

            const account = await AuthService.createAccount(plainToClass(AccountDTO, {
                userId: user.id
            } as AccountDTO), transaction)

            await AuthService.createEmailPasswordCredential(plainToClass(EmailPasswordCredentialDTO, {
                id: account.id,
                ...signUpWithEmailPasswordRequestData
            } as EmailPasswordCredentialDTO), transaction)

            const otpCode = randomString.generate({
                length: 6,
                charset: 'numeric'
            })
            await redisClient.setEx(RedisKeyGenerator.verifyingAccountCode(account.id), 5 * 60, otpCode)
            const mailPublisher = await MailPublisher.getInstance()
            await mailPublisher.sendCodeToVerifyAccount(plainToClass(SendCodeToVerifyAccountDTO, {
                from: envVariables.MAILER_HOST,
                to: signUpWithEmailPasswordRequestData.email,
                subject: 'Verify Account',
                html: await OtpContent(otpCode)
            } as SendCodeToVerifyAccountDTO))

            const userPublisher = await UserPublisher.getInstance()
            await userPublisher.signUp(plainToClass(CreateUserReqFromAmqpDTO, {
                id: user.id
            } as CreateUserReqFromAmqpDTO))

            await transaction.commit()
            return res.send(new AppResponse({
                ...account.dataValues,
                id: account.id
            }, null))
        } catch (error) {
            await transaction.rollback()
            return next(error)
        }
    }

    static signInWithEmailPassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const signInWithEmailPasswordRequestData = plainToClass(SignInWithEmailPasswordRequestDTO, req.body)

            const emailPasswordCredential = await AuthService.getEmailPasswordCredentialByEmail(signInWithEmailPasswordRequestData.email)
            if (emailPasswordCredential) {
                if (bcrypt.compareSync(signInWithEmailPasswordRequestData.password, emailPasswordCredential.dataValues.password)) {
                    const account = await AuthService.getAccountById(emailPasswordCredential.dataValues.id)
                    if (account?.dataValues.status === AccountStatus.ACTIVATED) {
                        const tokenPair = TokenHelper.createTokenPair(plainToClass(Payload, {
                            accountId: account.dataValues.id,
                            userId: account.dataValues.userId,
                            status: account.dataValues.status,
                            role: account.dataValues.role,
                            iat: Date.now()
                        } as Payload))

                        await redisClient.multi()
                            .setEx(RedisKeyGenerator.accessTokenkey(tokenPair.accessToken), Number(envVariables.REDIS_ACCESS_TOKEN_TTL), tokenPair.accessToken)
                            .setEx(RedisKeyGenerator.refreshTokenkey(tokenPair.refreshToken), Number(envVariables.REDIS_REFRESH_TOKEN_TTL), tokenPair.refreshToken)
                            .exec()

                        const userPublisher = await UserPublisher.getInstance()
                        await userPublisher.signIn(tokenPair)
                        return res.send(new AppResponse({
                            tokens: tokenPair,
                            account: account
                        }, null))
                    } else {
                        return res.send(new AppResponse({
                            tokens: null,
                            account
                        }, null))
                    }
                }
            }

            return res.send(new AppResponse({
                tokens: null,
                account: null
            }, null))
        } catch (error) {
            return next(error)
        }
    }

    static signInWithEmailPasswordForAdmin = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const signInWithEmailPasswordRequestData = plainToClass(SignInWithEmailPasswordRequestDTO, req.body)

            const emailPasswordCredential = await AuthService.getEmailPasswordCredentialByEmail(signInWithEmailPasswordRequestData.email)
            if (emailPasswordCredential) {
                if (bcrypt.compareSync(signInWithEmailPasswordRequestData.password, emailPasswordCredential.dataValues.password)) {
                    const account = await AuthService.getAccountById(emailPasswordCredential.dataValues.id)
                    if (account?.dataValues.role === Role.ADMIN && account?.dataValues.status === AccountStatus.ACTIVATED) {
                        const tokenPair = TokenHelper.createTokenPair(plainToClass(Payload, {
                            accountId: account.dataValues.id,
                            userId: account.dataValues.userId,
                            status: account.dataValues.status,
                            role: account.dataValues.role,
                            iat: Date.now()
                        } as Payload))

                        await redisClient.multi()
                            .setEx(RedisKeyGenerator.accessTokenkey(tokenPair.accessToken), Number(envVariables.REDIS_ACCESS_TOKEN_TTL), tokenPair.accessToken)
                            .setEx(RedisKeyGenerator.refreshTokenkey(tokenPair.refreshToken), Number(envVariables.REDIS_REFRESH_TOKEN_TTL), tokenPair.refreshToken)
                            .exec()

                        const userPublisher = await UserPublisher.getInstance()
                        await userPublisher.signIn(tokenPair)
                        return res.send(new AppResponse({
                            tokens: tokenPair,
                            account: account
                        }, null))
                    } else {
                        return res.send(new AppResponse({
                            tokens: null,
                            account
                        }, null))
                    }
                }
            }

            return res.send(new AppResponse({
                tokens: null,
                account: null
            }, null))
        } catch (error) {
            return next(error)
        }
    }

    static signInWithGoogle = async (req: Request, res: Response, next: NextFunction) => {
        const transaction =  await sequelize.transaction()

        try {
            const signInWithGoogleReqData = plainToClass(SignInWithGoogleReqDTO, req.body)
            const decode = await getAuth().verifyIdToken(signInWithGoogleReqData.accessToken)
            const googleCredential = await AuthService.getGoogleCredentialByUID(decode.uid)

            if (!googleCredential) {
                const newUser = await AuthService.createUser(plainToClass(UserDTO, {
                    name: decode.name,
                    avatarUrl: decode.picture
                } as UserDTO, {
                    exposeUnsetFields: false
                }), transaction)
    
                const newAccount = await AuthService.createAccount(plainToClass(AccountDTO, {
                    status: AccountStatus.ACTIVATED,
                    userId: newUser.id,
                    provider: 'google'
                } as AccountDTO), transaction)

                await AuthService.createGoogleCredential(plainToClass(GoogleCredentialDTO, {
                    id: newAccount.id,
                    uid: decode.uid
                } as GoogleCredentialDTO), transaction)

                const userPublisher = await UserPublisher.getInstance()
                await userPublisher.signUp(plainToClass(CreateUserReqFromAmqpDTO, {
                    id: newUser.id
                } as CreateUserReqFromAmqpDTO))
            }

            const googleCredentialInfo = await AuthService.getGoogleCredentialByUID(decode.uid)
            if (googleCredentialInfo) {
                const account = await AuthService.getAccountById(googleCredentialInfo.dataValues.id)
                if (account) {
                    const tokenPair = TokenHelper.createTokenPair(plainToClass(Payload, {
                        userId: account.dataValues.userId,
                        status: account.dataValues.status,
                        role: account.dataValues.role,
                        iat: Date.now()
                    } as Payload))
        
                    await redisClient.multi()
                        .setEx(RedisKeyGenerator.accessTokenkey(tokenPair.accessToken), Number(envVariables.REDIS_ACCESS_TOKEN_TTL), tokenPair.accessToken)
                        .setEx(RedisKeyGenerator.refreshTokenkey(tokenPair.refreshToken), Number(envVariables.REDIS_REFRESH_TOKEN_TTL), tokenPair.refreshToken)
                        .exec()
        
                    const userPublisher = await UserPublisher.getInstance()
                    await userPublisher.signIn(tokenPair)

                    await transaction.commit()
                    return res.send(new AppResponse(tokenPair, null))
                }
            }
        } catch (error) {
            await transaction.rollback()
            return next(error)
        }
    }

    static signInWithFacebook = async (req: Request, res: Response, next: NextFunction) => {
        const transaction =  await sequelize.transaction()

        try {
            const signInWithFacebookReqData = plainToClass(SignInWithFacebookReqDTO, req.body)
            const decode = await getAuth().verifyIdToken(signInWithFacebookReqData.accessToken)
            const facebookCredential = await AuthService.getFacebookCredentialByUID(decode.uid)

            if (!facebookCredential) {
                const newUser = await AuthService.createUser(plainToClass(UserDTO, {
                    name: decode.name,
                    avatarUrl: decode.picture
                } as UserDTO, {
                    exposeUnsetFields: false
                }), transaction)
    
                const newAccount = await AuthService.createAccount(plainToClass(AccountDTO, {
                    status: AccountStatus.ACTIVATED,
                    userId: newUser.id,
                    provider: 'facebook'
                } as AccountDTO), transaction)

                await AuthService.createFacebookCredential(plainToClass(FacebookCredentialDTO, {
                    id: newAccount.id,
                    uid: decode.uid
                } as FacebookCredentialDTO), transaction)

                const userPublisher = await UserPublisher.getInstance()
                await userPublisher.signUp(plainToClass(CreateUserReqFromAmqpDTO, {
                    id: newUser.id
                } as CreateUserReqFromAmqpDTO))
            }

            const facebookCredentialInfo = await AuthService.getFacebookCredentialByUID(decode.uid)
            if (facebookCredentialInfo) {
                const account = await AuthService.getAccountById(facebookCredentialInfo.dataValues.id)
                if (account) {
                    const tokenPair = TokenHelper.createTokenPair(plainToClass(Payload, {
                        userId: account.dataValues.userId,
                        status: account.dataValues.status,
                        role: account.dataValues.role,
                        iat: Date.now()
                    } as Payload))
        
                    await redisClient.multi()
                        .setEx(RedisKeyGenerator.accessTokenkey(tokenPair.accessToken), Number(envVariables.REDIS_ACCESS_TOKEN_TTL), tokenPair.accessToken)
                        .setEx(RedisKeyGenerator.refreshTokenkey(tokenPair.refreshToken), Number(envVariables.REDIS_REFRESH_TOKEN_TTL), tokenPair.refreshToken)
                        .exec()
        
                    const userPublisher = await UserPublisher.getInstance()
                    await userPublisher.signIn(tokenPair)

                    await transaction.commit()
                    return res.send(new AppResponse(tokenPair, null))
                }
            }
        } catch (error) {
            await transaction.rollback()
            return next(error)
        }
    }

    static signOut = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const signOutRequestData = plainToClass(SignOutRequestDTO, req.body)
            await redisClient.multi()
                .del(RedisKeyGenerator.accessTokenkey(signOutRequestData.accessToken))
                .del(RedisKeyGenerator.refreshTokenkey(signOutRequestData.refreshToken))
                .exec()
            const userPublisher = await UserPublisher.getInstance()
            await userPublisher.signOut(plainToClass(TokenPair, signOutRequestData))
            return res.send(new AppResponse(true, null))
        } catch (error) {
            return next(error)
        }
    }

    static refreshToken = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const refreshTokenReqData = plainToClass(RefreshTokenReqDTO, req.body)

            try {
                jwt.verify(refreshTokenReqData.refreshToken, envVariables.REDIS_REFRESH_TOKEN_SECRET)
                
                const refreshTokenInRedis = await redisClient.get(RedisKeyGenerator.refreshTokenkey(refreshTokenReqData.refreshToken))
                if (!refreshTokenInRedis) {
                    return res.send(new AppResponse(false, null))
                }
            } catch (error) {
                return res.send(new AppResponse(false, null))
            }

            const payload = jwt.decode(refreshTokenReqData.refreshToken) as Payload
            const newTokens = TokenHelper.createTokenPair({
                ...payload,
                iat: Date.now()
            })
            await redisClient.multi()
                .del(RedisKeyGenerator.accessTokenkey(refreshTokenReqData.accessToken))
                .del(RedisKeyGenerator.refreshTokenkey(refreshTokenReqData.refreshToken))
                .setEx(RedisKeyGenerator.accessTokenkey(newTokens.accessToken), Number(envVariables.REDIS_ACCESS_TOKEN_TTL), newTokens.accessToken)
                .setEx(RedisKeyGenerator.refreshTokenkey(newTokens.refreshToken), Number(envVariables.REDIS_REFRESH_TOKEN_TTL), newTokens.refreshToken)
                .exec()

            const userPublisher = await UserPublisher.getInstance()
            userPublisher.refreshToken(plainToClass(RefreshTokenReqFromAmqp, {
                oldAccessToken: refreshTokenReqData.accessToken,
                newAccessToken: newTokens.accessToken
            } as RefreshTokenReqFromAmqp))
            return res.send(new AppResponse(newTokens, null))
        } catch (error) {
            return next(error)
        }
    }

}