import { Exclude, Expose } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'

@Exclude()
export class VerifyCodeToResetPasswordReqDTO {
    @Expose()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @Expose()
    @IsNotEmpty()
    @IsString()
    @Length(6)
    otpCode: string
}