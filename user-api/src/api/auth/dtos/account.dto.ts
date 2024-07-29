import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class AccountDTO {
    @Expose()
    id: number

    @Expose()
    status: number

    @Expose()
    role: string

    @Expose()
    createdAt: Date

    @Expose()
    userId: number

    @Expose()
    provider: string
}