import { NextFunction, Request, Response } from 'express'
import { subject } from '@casl/ability'

import { defineAbilityFor } from './storyFollowDetail.defineAbility'
import { Errors } from '../../helpers/error.helper'

export class StoryFollowDetailAuthorization {

    static createStoryFollowDetail = (req: Request, res: Response, next: NextFunction) => {
        try {
            if (defineAbilityFor(req.user!).can('create', subject('storyFollowDetail', req.body))) {
                return next()
            }
            return next(Errors.Forbidden)
        } catch (error) {
            return next(error)
        }
    }

    static deleteStoryFollowDetail = (req: Request, res: Response, next: NextFunction) => {
        try {
            if (defineAbilityFor(req.user!).can('delete', subject('storyFollowDetail', req.body))) {
                return next()
            }
            return next(Errors.Forbidden)
        } catch (error) {
            return next(error)
        }
    }

}