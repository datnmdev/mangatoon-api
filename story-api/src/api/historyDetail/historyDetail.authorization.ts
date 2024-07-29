import { NextFunction, Request, Response } from 'express'
import { subject } from '@casl/ability'

import { Errors } from '../../helpers/error.helper'
import { defineAbilityFor } from './historyDetail.defineAbility'
import { HistoryDetailService } from './historyDetail.service'

export class HistoryDetailAuthorization {

    static deleteHistoryDetailById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const historydetailInfo = await HistoryDetailService.getHistoryDetailById(Number(req.params['id']))
            if (historydetailInfo) {
                if (defineAbilityFor(req.user!).can('delete', subject('historyDetail', historydetailInfo!.dataValues))) {
                    return next()
                }
            }
            return next(Errors.Forbidden)
        } catch (error) {
            return next(error)
        }
    }

}