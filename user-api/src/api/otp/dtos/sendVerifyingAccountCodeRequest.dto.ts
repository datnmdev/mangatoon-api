import { Exclude, Expose } from 'class-transformer'
import { IsInt, IsNotEmpty } from 'class-validator'

@Exclude()
export class SendVerifyingAccountCodeRequestDTO {
    @Expose()
    @IsNotEmpty()
    @IsInt()
    id: number
}