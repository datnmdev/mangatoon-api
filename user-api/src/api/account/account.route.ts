import { Router } from 'express'

import { AccountValidation } from './account.validation'
import { AccountController } from './account.controller'
import { JwtMiddleware } from '../../jwt/jwt.middleware'
import { AccountAuthorization } from './account.authorization'

export const AccountRouter = Router()

AccountRouter.put('/verifyAccount', AccountValidation.verifyAccount, AccountController.verifyAccount)
AccountRouter.get('/getInfo', JwtMiddleware.authentication, AccountController.getAccount)
AccountRouter.post('/:id', JwtMiddleware.authentication, AccountAuthorization.updateAccount, AccountValidation.updateAccount, AccountController.updateAccount)
AccountRouter.get('/search', JwtMiddleware.authentication, AccountAuthorization.searchAccount, AccountValidation.searchAccount, AccountController.searchAccount)