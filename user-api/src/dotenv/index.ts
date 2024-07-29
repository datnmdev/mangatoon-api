import dotenv from 'dotenv'

export const envVariables = {
    ...dotenv.config().parsed,
    ...dotenv.config({
        path: `.env.${process.env.NODE_ENV}`
    }).parsed
}