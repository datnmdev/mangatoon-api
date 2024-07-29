import { NextFunction, Request, Response } from 'express'
import { validateOrReject } from 'class-validator'
import { plainToClass } from 'class-transformer'

import { Errors } from '../../helpers/error.helper'
import { SignUpWithEmailPasswordRequestDTO } from './dtos/signUpWithEmailPasswordRequest.dto'
import { SignInWithEmailPasswordRequestDTO } from './dtos/signInWithEmailPasswordRequest.dto'
import { SignOutRequestDTO } from './dtos/signOutRequest.dto'
import { RefreshTokenReqDTO } from './dtos/refreshTokenReq.dto'
import { SignInWithGoogleReqDTO } from './dtos/signInWithGoogleReq.dto'
import { SignInWithFacebookReqDTO } from './dtos/signInWithFacebookReq.dto'

export class AuthValidation {

    static signUpWithEmailPassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const signUpWithEmailPasswordRequestData = plainToClass(SignUpWithEmailPasswordRequestDTO, req.body)
            await validateOrReject(signUpWithEmailPasswordRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static signInWithEmailPassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const signInWithEmailPasswordRequestData = plainToClass(SignInWithEmailPasswordRequestDTO, req.body)
            await validateOrReject(signInWithEmailPasswordRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static signInWithGoogle = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const signInWithGoogleRequestData = plainToClass(SignInWithGoogleReqDTO, req.body)
            await validateOrReject(signInWithGoogleRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static signInWithFacebook = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const signInWithFacebookRequestData = plainToClass(SignInWithFacebookReqDTO, req.body)
            await validateOrReject(signInWithFacebookRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static signOut = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const signOutRequestData = plainToClass(SignOutRequestDTO, req.body)
            await validateOrReject(signOutRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

    static refreshToken = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const refreshTokenReqData = plainToClass(RefreshTokenReqDTO, req.body)
            await validateOrReject(refreshTokenReqData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

}