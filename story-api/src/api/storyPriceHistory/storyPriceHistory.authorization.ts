import { NextFunction, Request, Response } from 'express'

import { Errors } from '../../helpers/error.helper'
import { defineAbilityFor } from './storyPriceHistory.defineAbility'

export class StoryPriceHistoryAuthorization {

    static createStoryPriceHistory =(req: Request, res: Response, next: NextFunction) => {
        try {
            if (defineAbilityFor(req.user!).can('create', 'storyPriceHistory')) {
                return next()
            }
            return next(Errors.Forbidden)
        } catch (error) {
            return next(error)
        }
    }

}