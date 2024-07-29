import { NextFunction, Request, Response } from 'express'

import { defineAbilityFor } from './storyGenreDetail.defineAbility'
import { Errors } from '../../helpers/error.helper'

export class StoryGenreDetailAuthorization {

    static createStoryGenreDetail = (req: Request, res: Response, next: NextFunction) => {
        try {
            if (defineAbilityFor(req.user!).can('create', 'storyGenreDetail')) {
                return next()
            }
            return next(Errors.Forbidden)
        } catch (error) {
            return next(error)
        }
    }

    static deleteStoryGenreDetail = (req: Request, res: Response, next: NextFunction) => {
        try {
            if (defineAbilityFor(req.user!).can('delete', 'storyGenreDetail')) {
                return next()
            }
            return next(Errors.Forbidden)
        } catch (error) {
            return next(error)
        }
    }

}