import { Express } from 'express-serve-static-core'

import { Payload } from '../../jwt/jwt.type'

declare module 'express-serve-static-core' {
  interface Request {
    user?: Payload
  }
}