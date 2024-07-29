import { NextFunction, Request, Response } from 'express'

import { defineAbilityFor } from './alias.defineAbility'
import { Errors } from '../../helpers/error.helper'

export class AliasAuthorization {

    static createAlias = (req: Request, res: Response, next: NextFunction) => {
        try {
            if (defineAbilityFor(req.user!).can('create', 'alias')) {
                return next()
            }
            return next(Errors.Forbidden)
        } catch (error) {
            return next(error)
        }
    }

    static deleteAlias = (req: Request, res: Response, next: NextFunction) => {
        try {
            if (defineAbilityFor(req.user!).can('delete', 'alias')) {
                return next()
            }
            return next(Errors.Forbidden)
        } catch (error) {
            return next(error)
        }
    }

}