import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class EmailPasswordCredentialDTO {
    @Expose()
    id: number

    @Expose()
    email: string

    @Expose()
    password: string
}