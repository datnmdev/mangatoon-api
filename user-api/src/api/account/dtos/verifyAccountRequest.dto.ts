import { Exclude, Expose } from 'class-transformer'
import { IsEmail, IsInt, IsNotEmpty, IsNumberString, MaxLength, MinLength } from 'class-validator'

@Exclude()
export class VerifyAccountRequestDTO {
    @Expose()
    @IsNotEmpty()
    @IsInt()
    id: number

    @Expose()
    @IsNotEmpty()
    @IsNumberString()
    @MinLength(6)
    @MaxLength(6)
    otpCode: string
}