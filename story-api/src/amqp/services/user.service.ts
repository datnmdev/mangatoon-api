import { Models } from '../../database/mysql.config'
import { CreateUserReqFromAmqpDTO } from '../dtos/createUserReqFromAmqp.dto'

export class UserService {
    
    static createUser = (userData: CreateUserReqFromAmqpDTO) => {
        return Models.user.create(userData)
    }

}