import { Exclude, Expose } from 'class-transformer'
import { IsEmail, IsNotEmpty } from 'class-validator'

@Exclude()
export class SendVerifyingEmailCodeToResetPasswordReqDTO {
    @Expose()
    @IsNotEmpty()
    @IsEmail()
    email: string
}