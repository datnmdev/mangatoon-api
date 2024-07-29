import { Router } from 'express'

import { AuthRouter } from '../api/auth/auth.route'
import { AccountRouter } from '../api/account/account.route'
import { OtpRouter } from '../api/otp/otp.route'
import { EmailPasswordCredentialRouter } from '../api/emailPasswordCredential/emailPasswordCredential.route'
import { UserRouter } from '../api/user/user.route'

export const AppRouter = Router()

AppRouter.use('/auth', AuthRouter)
AppRouter.use('/account', AccountRouter)
AppRouter.use('/otp', OtpRouter)
AppRouter.use('/emailPasswordCredential', EmailPasswordCredentialRouter)
AppRouter.use('/user', UserRouter)