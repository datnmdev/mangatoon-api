import { plainToClass } from 'class-transformer'
import { NextFunction, Request, Response } from 'express'

import { VerifyAccountRequestDTO } from './dtos/verifyAccountRequest.dto'
import { redisClient } from '../../redis/redis.config'
import { RedisKeyGenerator } from '../../helpers/redisKey.helper'
import { AccountService } from './account.service'
import { UpdateAccountReqBodyDTO, UpdateAccountReqParamsDTO } from './dtos/updateAccountReq.dto'
import { AccountStatus } from '../../enums/account.enum'
import { AppResponse } from '../../helpers/response.helper'
import { handler } from '../../helpers/error.helper'
import { SearchAccountRequestDTO } from './dtos/searchAccountRequest.dto'

export class AccountController {

    static verifyAccount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const verifyAccountRequestData = plainToClass(VerifyAccountRequestDTO, req.body)
            const verifyingAccountCodeInRedis = await redisClient.get(RedisKeyGenerator.verifyingAccountCode(verifyAccountRequestData.id))
            if (verifyAccountRequestData.otpCode === verifyingAccountCodeInRedis) {
                const affectedCount = await AccountService.updateAccount(verifyAccountRequestData.id, plainToClass(UpdateAccountReqBodyDTO, {
                    status: AccountStatus.ACTIVATED
                }))
                handler(async () => {
                    await redisClient.del(RedisKeyGenerator.verifyingAccountCode(verifyAccountRequestData.id))
                })
                if (affectedCount[0] > 0) {
                    return res.send(new AppResponse(true, null))
                }
            }
            return res.send(new AppResponse(false, null))
        } catch (error) {
            return next(error)
        }
    }

    static getAccount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (req.user) {
                const account = await AccountService.getAccountByUserId(req.user.userId)
                return res.send(new AppResponse(account, null))
            }
        } catch (error) {
            return next(error)
        }
    }

    static updateAccount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updateAccountReqParamsData = plainToClass(UpdateAccountReqParamsDTO, req.params)
            const updateAccountReqBodyData = plainToClass(UpdateAccountReqBodyDTO, req.body)
            const affected = await AccountService.updateAccount(updateAccountReqParamsData.id, updateAccountReqBodyData)
            if (affected[0] > 0) {
                return res.send(new AppResponse(true, null))
            }
            return res.send(new AppResponse(false, null))
        } catch (error) {
            return next(error)
        }
    }

    static searchAccount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const searchAccountReqData = plainToClass(SearchAccountRequestDTO, req.query)
            const accounts = await AccountService.searchAccount(searchAccountReqData)
            return res.send(new AppResponse(accounts, null))
        } catch (error) {
            console.log(error);
            
            return next(error)
        }
    }

}