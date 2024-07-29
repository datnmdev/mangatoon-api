import { Exclude, Expose } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'

@Exclude()
export class SignOutRequestDTO {
    @Expose()
    @IsNotEmpty()
    @IsString()
    accessToken: string

    @Expose()
    @IsNotEmpty()
    @IsString()
    refreshToken: string
}