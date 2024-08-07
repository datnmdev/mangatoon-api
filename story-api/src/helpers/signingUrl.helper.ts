import crypto from 'crypto'
import { envVariables } from '../dotenv'
import moment from 'moment'

export interface SigningUrlPayload {
    url: string,
    expireAt: number
}

export function generateSignedUrl(payload: SigningUrlPayload) {
    const payloadEncoded = Buffer.from(JSON.stringify(payload)).toString('base64')
    const hash = crypto.createHmac('sha256', envVariables.SIGNING_IMAGE_SECRET_KEY).update(payloadEncoded).digest('hex')
    return `/image?payload=${encodeURIComponent(payloadEncoded)}&hash=${hash}`
}

export function verifySignedUrl(payloadEncoded: string, hash: string) {
    const expectedHash = crypto.createHmac('sha256', envVariables.SIGNING_IMAGE_SECRET_KEY).update(payloadEncoded).digest('hex')
    if (hash !== expectedHash) {
        return false
    }
    const payload: SigningUrlPayload = JSON.parse(Buffer.from(payloadEncoded, 'base64').toString('utf8'))
    if (Date.now() > payload.expireAt) {
        return false
    }

    return true
}