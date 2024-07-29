import { Router } from 'express'

import { AliasValidation } from './alias.validation'
import { AliasController } from './alias.controller'
import { JwtMiddleware } from '../../jwt/jwt.middleware'
import { AliasAuthorization } from './alias.authorization'

export const AliasRouter = Router()

AliasRouter.get('/', AliasValidation.getAliases, AliasController.getAliases)

AliasRouter.post('/', JwtMiddleware.authentication, AliasAuthorization.createAlias, AliasValidation.createAlias, AliasController.createAlias)

AliasRouter.delete('/:id', JwtMiddleware.authentication, AliasAuthorization.deleteAlias, AliasValidation.deleteAlias, AliasController.deleteAlias)