import { NextFunction, Request, Response } from 'express'

import { defineAbilityFor } from './storyAuthorDetail.defineAbility'
import { Errors } from '../../helpers/error.helper'

export class StoryAuthorDetailAuthorization {

    static createStoryAuthorDetail = (req: Request, res: Response, next: NextFunction) => {
        try {
            if (defineAbilityFor(req.user!).can('create', 'storyAuthorDetail')) {
                return next()
            }
            return next(Errors.Forbidden)
        } catch (error) {
            return next(error)
        }
    }

    static deleteStoryAuthorDetail = (req: Request, res: Response, next: NextFunction) => {
        try {
            if (defineAbilityFor(req.user!).can('delete', 'storyAuthorDetail')) {
                return next()
            }
            return next(Errors.Forbidden)
        } catch (error) {
            return next(error)
        }
    }

}