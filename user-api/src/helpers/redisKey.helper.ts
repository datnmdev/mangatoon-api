export class RedisKeyGenerator {

    static accessTokenkey = (accessToken: string) => {
        return `accessToken:${accessToken}`
    }

    static refreshTokenkey = (refreshToken: string) => {
        return `refreshToken:${refreshToken}`
    }

    static verifyingAccountCode = (accountId: number) => {
        return `verifyingAccountCode:${accountId}`
    }

    static verifyingEmailCodeToResetPassword = (accountId: number) => {
        return `verifyingEmailCodeToResetPassword:${accountId}`
    }

    static codeToResetPassword = (email: string) => {
        return `resetPassword:code:${email}`
    }
    
}