import { NextFunction, Request, Response } from 'express'
import { Errors } from '../../helpers/error.helper'
import { defineAbilityFor } from './account.defineAbility'

export class AccountAuthorization {
    static updateAccount = (req: Request, res: Response, next: NextFunction) => {
        try {
            if (defineAbilityFor(req.user!).can('update', 'account')) {
                return next()
            }
            throw Errors.Forbidden
        } catch (error) {
            return next(Errors.Forbidden)
        }
    }

    static searchAccount = (req: Request, res: Response, next: NextFunction) => {
        try {
            if (defineAbilityFor(req.user!).can('read', 'accounts')) {
                return next()
            }
            throw Errors.Forbidden
        } catch (error) {
            return next(Errors.Forbidden)
        }
    }
}