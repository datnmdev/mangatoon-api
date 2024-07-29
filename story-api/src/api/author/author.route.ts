import { Router } from 'express'

import { AuthorValidation } from './author.validation'
import { AuthorController } from './author.controller'
import { JwtMiddleware } from '../../jwt/jwt.middleware'
import { AuthorAuthorization } from './auhor.authorization'

export const AuthorRouter = Router()

AuthorRouter.get('/', AuthorValidation.getAuthors, AuthorController.getAuthors)
AuthorRouter.post('/', JwtMiddleware.authentication, AuthorAuthorization.createAuthor, AuthorValidation.createAuthor, AuthorController.createAuthor)
AuthorRouter.post('/:id', JwtMiddleware.authentication, AuthorAuthorization.updateAuthor, AuthorValidation.updateAuthor, AuthorController.updateAuthor)
AuthorRouter.delete('/:id', JwtMiddleware.authentication, AuthorAuthorization.deleteAuthor, AuthorValidation.deleteAuthor, AuthorController.deleteAuthor)
AuthorRouter.get('/search', AuthorValidation.searchAuthor, AuthorController.searchAuthor) 