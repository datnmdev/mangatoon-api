import { Exclude, Expose } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'

@Exclude()
export class SignInWithGoogleReqDTO {
    @Expose()
    @IsNotEmpty()
    @IsString()
    accessToken: string
}