export class Payload {
    accountId: number
    userId: number
    role: string
    status: number
    iat: number = Date.now()
}