import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class FacebookCredentialDTO {
    @Expose()
    id: number

    @Expose()
    uid: string
}