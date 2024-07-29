import nodemailer from 'nodemailer'

import { envVariables } from '../dotenv'

export const transporter = nodemailer.createTransport({
    host: envVariables.MAILER_HOST,
    port: Number(envVariables.MAILER_PORT),
    secure: true,
    auth: {
        user: envVariables.MAILER_USER,
        pass: envVariables.MAILER_PASS
    }
})