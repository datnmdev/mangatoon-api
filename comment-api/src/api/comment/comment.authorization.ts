import { NextFunction, Request, Response } from 'express'
import { subject } from '@casl/ability'

import { defineAbilityFor } from './comment.defineAbility'
import { Errors } from '../../helpers/error.helper'

export class CommentAuthorization {

    static updateComment = (req: Request, res: Response, next: NextFunction) => {
        try {
            if (defineAbilityFor(req.user!).can('update', subject('comment', req.body))) {
                return next()
            }
            return next(Errors.Forbidden)
        } catch (error) {
            return next(error)
        }
    }
}