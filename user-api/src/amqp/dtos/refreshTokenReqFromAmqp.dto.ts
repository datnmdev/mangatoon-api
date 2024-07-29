import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class RefreshTokenReqFromAmqp {
    @Expose()
    oldAccessToken: string

    @Expose()
    newAccessToken: string
}