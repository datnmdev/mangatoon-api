import { Exclude, Expose } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'

@Exclude()
export class ChangePasswordReqDTO {
    @Expose()
    @IsNotEmpty()
    @IsString()
    oldPassword: string

    @Expose()
    @IsNotEmpty()
    @IsString()
    newPassword: string
}