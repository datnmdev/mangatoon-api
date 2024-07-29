import { NextFunction, Request, Response } from 'express'
import fs from 'fs'
import { UserService } from './user.service'
import { AppResponse } from '../../helpers/response.helper'
import { getStorage } from 'firebase-admin/storage'
import { plainToClass } from 'class-transformer'
import { UpdateProfileReqDTO } from './dtos/updateUserReq.dto'
import { handler } from '../../helpers/error.helper'
import { GetUserInfoReqDTO } from './dtos/getUserInfoReq.dto'

export class UserController {
    static getProfile = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (req.user) {
                let profile = (await UserService.getProfile(req.user.userId))?.dataValues
                if (profile?.avatarUrl) {
                    if (!profile.avatarUrl.startsWith('http')) {
                        const avatarUrl = (await getStorage().bucket().file(profile.avatarUrl).getSignedUrl({
                            action: 'read',
                            expires: Date.now() + 30 * 24 * 60 * 60
                        }))[0]

                        profile = {
                            ...profile,
                            avatarUrl
                        }
                    }
                }

                return res.send(new AppResponse(profile, null))
            }
        } catch (error) {
            return next(error)
        }
    }

    static getUserInfo = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getUserInfoReqData = plainToClass(GetUserInfoReqDTO, req.params)
            let profile = (await UserService.getProfile(getUserInfoReqData.id))?.dataValues
                if (profile?.avatarUrl) {
                    if (!profile.avatarUrl.startsWith('http')) {
                        const avatarUrl = (await getStorage().bucket().file(profile.avatarUrl).getSignedUrl({
                            action: 'read',
                            expires: Date.now() + 30 * 24 * 60 * 60
                        }))[0]

                        profile = {
                            ...profile,
                            avatarUrl
                        }
                    }
                }

                return res.send(new AppResponse(profile, null))
        } catch (error) {
            return next(error)
        }
    }

    static updateProfile = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (req.user) {
                let updateProfileData = plainToClass(UpdateProfileReqDTO, req.body)
                const bucket = getStorage().bucket()
                const oldProfile = await UserService.getProfile(req.user.userId)

                if (req.file) {
                    const avatarUrl = `avatars/${req.file.filename}.${req.file.mimetype.split('/')[1]}`
                    await bucket.upload(req.file.path, {
                        destination: avatarUrl
                    })

                    updateProfileData = {
                        ...updateProfileData,
                        avatarUrl
                    }
                }

                const affected = await UserService.updateProfile(req.user.userId, updateProfileData)
                if (affected[0] > 0) {
                    handler(async () => {
                        if (req.file && oldProfile?.dataValues?.avatarUrl) {
                            await bucket.file(oldProfile.dataValues.avatarUrl).delete()
                        }
                    })
                    return res.send(new AppResponse(true, null))
                }

                return res.send(new AppResponse(false, null))
            }
        } catch (error) {
            return next(error)
        } finally {
            handler(async () => {
                if (req.file) {
                    await fs.promises.unlink(req.file.path)
                }
            })
        }
    }
}