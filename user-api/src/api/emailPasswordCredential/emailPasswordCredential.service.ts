import bcrypt from 'bcrypt'
import { Models } from '../../database/mysql.config'

export class EmailPasswordCredentialService {
    static checkEmail = async (email: string) => {
        const emailPasswordCredential = await Models.emailPasswordCredential.findOne({
            where: {
                email
            }
        })

        if (emailPasswordCredential) {
            return true
        }

        return false
    }

    static findOneByEmail = (email: string) => {
        return Models.emailPasswordCredential.findOne({
            where: {
                email
            }
        })
    }

    static resetPassword = async (email: string, password: string) => {
        return Models.emailPasswordCredential.update({
            password: await bcrypt.hash(password, 10)
        }, {
            where: {
                email
            }
        })
    }

    static findById = (id: number) => {
        return Models.emailPasswordCredential.findByPk(id)
    }

    static updatePassword = async (id: number, password: string) => {
        return Models.emailPasswordCredential.update({
            password: await bcrypt.hash(password, 10)
        }, {
            where: {
                id
            }
        })
    }
}