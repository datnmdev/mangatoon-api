import { Expose } from 'class-transformer'

@Expose()
export class UserDTO {
    @Expose()
    id: number

    @Expose()
    name: string

    @Expose()
    gender: number

    @Expose()
    dob: string

    @Expose()
    avatarUrl: string
}