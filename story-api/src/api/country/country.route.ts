import { Router } from 'express'

import { JwtMiddleware } from '../../jwt/jwt.middleware'
import { CountryAuthorization } from './country.authorization'
import { CountryValidation } from './country.validation'
import { CountryController } from './country.controller'

export const CountryRouter = Router()

CountryRouter.post('/', JwtMiddleware.authentication, CountryAuthorization.createCountry, CountryValidation.createCountry, CountryController.createCountry)
CountryRouter.post('/:id', JwtMiddleware.authentication, CountryAuthorization.updateCountry, CountryValidation.updateCountry, CountryController.updateCountry)
CountryRouter.delete('/:id', JwtMiddleware.authentication, CountryAuthorization.deleteCountry, CountryValidation.deleteCountry, CountryController.deleteCountry)
CountryRouter.get('/', CountryController.getCountry)