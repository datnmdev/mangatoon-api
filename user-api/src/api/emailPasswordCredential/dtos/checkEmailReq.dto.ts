import { Exclude, Expose } from 'class-transformer'
import { IsEmail, IsNotEmpty } from 'class-validator'

@Exclude()
export class CheckEmailReqDTO {
    @Expose()
    @IsNotEmpty()
    @IsEmail()
    email: string
}