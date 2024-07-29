import { NextFunction, Request, Response } from 'express'
import { subject } from '@casl/ability'

import { defineAbilityFor } from './storyRatingDetail.defineAbility'
import { Errors } from '../../helpers/error.helper'

export class StoryRatingDetailAuthorization {
    
    static createStoryRatingDetail = (req: Request, res: Response, next: NextFunction) => {
        try {
            if (defineAbilityFor(req.user!).can('create', subject('storyRatingDetail', req.body))) {
                return next()
            }
            return next(Errors.Forbidden)
        } catch (error) {
            return next(error)
        }
    }

    static updateStoryRatingDetail = (req: Request, res: Response, next: NextFunction) => {
        try {
            if (defineAbilityFor(req.user!).can('update', subject('storyRatingDetail', req.body))) {
                return next()
            }
            return next(Errors.Forbidden)
        } catch (error) {
            return next(error)
        }
    }

}