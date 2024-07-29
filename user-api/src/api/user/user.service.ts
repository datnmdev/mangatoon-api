import { plainToClass } from 'class-transformer'
import { Models } from '../../database/mysql.config'
import { UpdateProfileReqDTO } from './dtos/updateUserReq.dto'

export class UserService {
    static getProfile = (userId: number) => {
        return Models.user.findByPk(userId)
    }

    static updateProfile = (id: number, updateProfileData: UpdateProfileReqDTO) => {
        return Models.user.update(plainToClass(Object, updateProfileData, {
            exposeUnsetFields: false
        }), {
            where: {
                id
            }
        })
    }
}