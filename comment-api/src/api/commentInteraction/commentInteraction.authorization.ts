import { NextFunction, Request, Response } from 'express'
import { subject } from '@casl/ability'

import { Errors } from '../../helpers/error.helper'
import { defineAbilityFor } from './commentInteraction.defineAbility'

export class CommentInteractionAuthorization {

    static createCommentInteraction = (req: Request, res: Response, next: NextFunction) => {
        try {
            if (defineAbilityFor(req.user!).can('create', subject('commentInteraction', req.body))) {
                return next()
            }
            return next(Errors.Forbidden)
        } catch (error) {
            return next()
        }
    }

    static updateCommentInteraction = (req: Request, res: Response, next: NextFunction) => {
        try {
            if (defineAbilityFor(req.user!).can('update', subject('commentInteraction', req.body))) {
                return next()
            }
            return next(Errors.Forbidden)
        } catch (error) {
            return next()
        }
    }

    static deleteCommentInteraction = (req: Request, res: Response, next: NextFunction) => {
        try {
            if (defineAbilityFor(req.user!).can('delete', subject('commentInteraction', req.body))) {
                return next()
            }
            return next(Errors.Forbidden)
        } catch (error) {
            return next()
        }
    }

}