import { NextFunction, Request, Response } from 'express'

import { defineAbilityFor } from './story.defineAbility'
import { Errors } from '../../helpers/error.helper'

export class StoryAuthorization {

    static createStory = (req: Request, res: Response, next: NextFunction) => {
        try {
            if (defineAbilityFor(req.user!).can('create', 'story')) {
                return next()
            }
            return next(Errors.Forbidden)
        } catch (error) {
            return next(error)
        }
    }

    static updateStory = (req: Request, res: Response, next: NextFunction) => {
        try {
            if (defineAbilityFor(req.user!).can('update', 'story')) {
                return next()
            }
            return next(Errors.Forbidden)
        } catch (error) {
            return next(error)
        }
    }

}