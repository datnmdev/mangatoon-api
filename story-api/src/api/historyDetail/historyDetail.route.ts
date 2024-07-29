import { Router } from 'express'

import { JwtMiddleware } from '../../jwt/jwt.middleware'
import { HistoryDetailValidation } from './historyDetail.validation'
import { HistoryDetailAuthorization } from './historyDetail.authorization'
import { HistoryDetailController } from './historyDetail.controller'

export const HistoryDetailRouter = Router()

HistoryDetailRouter.delete('/:id', JwtMiddleware.authentication, HistoryDetailValidation.deleteHistoryDetailById, HistoryDetailAuthorization.deleteHistoryDetailById, HistoryDetailController.deleteHistoryDetailbyId)
HistoryDetailRouter.delete('/', JwtMiddleware.authentication, HistoryDetailController.deleteHistoryDetailbyUserId)
HistoryDetailRouter.get('/', JwtMiddleware.authentication, HistoryDetailValidation.getHistoryDetailByUserId, HistoryDetailController.getHistoryDetailbyUserId)
HistoryDetailRouter.post('/', JwtMiddleware.authentication, HistoryDetailValidation.createHistoryDetail, HistoryDetailController.createHistoryDetail)