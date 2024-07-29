import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class GoogleCredentialDTO {
    @Expose()
    id: number

    @Expose()
    uid: string
}