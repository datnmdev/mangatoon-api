import { Exclude, Expose } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

@Exclude()
export class ResetPasswordReqDTO {
    @Expose()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @Expose()
    @IsNotEmpty()
    @IsString()
    password: string

    @Expose()
    @IsNotEmpty()
    @IsString()
    code: string
}