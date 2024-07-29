import { NextFunction, Request, Response } from 'express'
import { AppResponse } from './response.helper'

export class AppError extends Error {
    status: number
    code: string
    message: string

    constructor(status: number, code: string, message: string) {
        super(undefined)
        this.status = status
        this.code = code
        this.message = message
    }
}

export const Errors = {
    BadRequest: new AppError(400, 'BadRequest', 'bad request'),
    Unauthorized: new AppError(401, 'Unauthorized', 'unauthorized'),
    Forbidden: new AppError(403, 'Forbidden', 'forbidden'),
    InternalServerError: new AppError(500, 'InternalServerError', 'internal server error')
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (!(err instanceof AppError)) {
        return res.send(new AppResponse(null, Errors.InternalServerError))
    }

    return res.send(new AppResponse(null, err))
}

export async function handler(task: () => Promise<void>) {
    try {
        await task()
    } catch (error) {
        console.log(error)
    }
}