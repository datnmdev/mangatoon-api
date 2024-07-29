import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class CreateUserReqFromAmqpDTO {
    @Expose()
    id: number
}