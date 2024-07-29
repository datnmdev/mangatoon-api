import { Transaction } from 'sequelize'

import { Models } from '../../database/mysql.config'
import { AccountDTO } from './dtos/account.dto'
import { EmailPasswordCredentialDTO } from './dtos/emailPasswordCredential.dto'
import { UserDTO } from './dtos/user.dto'
import { GoogleCredentialDTO } from './dtos/googleCredential.dto'
import { FacebookCredentialDTO } from './dtos/facebookCredential.dto'

export class AuthService {

    static getEmailPasswordCredentialByEmail = (email: string) => {
        return Models.emailPasswordCredential.findOne({
            where: {
                email
            }
        })    
    }

    static getGoogleCredentialByUID = (uid: string) => {
        return Models.googleCredential.findOne({
            where: {
                uid
            }
        })
    }

    static getFacebookCredentialByUID = (uid: string) => {
        return Models.facebookCredential.findOne({
            where: {
                uid
            }
        })
    }

    static createEmailPasswordCredential = (emailPasswordCredentialData: EmailPasswordCredentialDTO, transaction?: Transaction) => {
        return Models.emailPasswordCredential.create(emailPasswordCredentialData, {
            transaction
        })
    }

    static createGoogleCredential = (googleCredentialData: GoogleCredentialDTO, transaction?: Transaction) => {
        return Models.googleCredential.create(googleCredentialData, {
            transaction
        })
    }

    static createFacebookCredential = (facebookCredentialData: FacebookCredentialDTO, transaction?: Transaction) => {
        return Models.facebookCredential.create(facebookCredentialData, {
            transaction
        })
    }

    static createAccount = (accountData: AccountDTO, transaction?: Transaction) => {
        return Models.account.create(accountData, {
            transaction
        })
    }

    static createUser = (userData: UserDTO, transaction?: Transaction) => {
        return Models.user.create(userData, {
            transaction
        })
    }

    static getAccountById = (id: number) => {
        return Models.account.findByPk(id)
    }

}