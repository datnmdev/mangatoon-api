import { Models } from '../../database/mysql.config'
import { AccountStatus } from '../../enums/account.enum'

export class OtpService {

    static isActivatedAccount = async (userId: number) => {
        const res = await Models.account.findOne({
            where: {
                userId,
                status: AccountStatus.UNACTIVATED
            }
        })

        if (res) {
            return false
        }

        return true
    }

    static getEmailPasswordCredentialById = (id: number) => {
        return Models.emailPasswordCredential.findByPk(id)
    }

}