import { Router } from 'express'

import { JwtMiddleware } from '../../jwt/jwt.middleware'
import { GenreAuthorization } from './genre.authorization'
import { GenreValidation } from './genre.validation'
import { GenreController } from './genre.controller'

export const GenreRouter = Router()

GenreRouter.post('/', JwtMiddleware.authentication, GenreAuthorization.createGenre, GenreValidation.createGenre, GenreController.createGenre)
GenreRouter.delete('/:id', JwtMiddleware.authentication, GenreAuthorization.deleteGenre, GenreValidation.deleteGenre, GenreController.deleteGenre)
GenreRouter.post('/:id', JwtMiddleware.authentication, GenreAuthorization.updateGenre, GenreValidation.updateGenre, GenreController.updateGenre)
GenreRouter.get('/', GenreController.getGenres)
GenreRouter.get('/search', GenreValidation.searchGenre, GenreController.searchGenre)