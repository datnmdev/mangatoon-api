import { NextFunction, Request, Response } from 'express'

import { Errors } from '../../helpers/error.helper'
import { defineAbilityFor } from './chapter.defineAbility'

export class ChapterAuthorization {

    static createChapter = (req: Request, res: Response, next: NextFunction) => {
        try {
            if (defineAbilityFor(req.user!).can('create', 'chapter')) {
                return next()
            }
            return next(Errors.Forbidden)
        } catch (error) {
            return next(error)
        }
    }

    static updateChapter = (req: Request, res: Response, next: NextFunction) => {
        try {
            if (defineAbilityFor(req.user!).can('update', 'chapter')) {
                return next()
            }
            return next(Errors.Forbidden)
        } catch (error) {
            return next(error)
        }
    }

}