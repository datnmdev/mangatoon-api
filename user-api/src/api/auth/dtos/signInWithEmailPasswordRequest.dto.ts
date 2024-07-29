import { Exclude, Expose } from 'class-transformer'
import { IsNotEmpty, IsString, MaxLength } from 'class-validator'

@Exclude()
export class SignInWithEmailPasswordRequestDTO {
    @Expose()
    @IsNotEmpty()
    @IsString()
    email: string

    @Expose()
    @IsNotEmpty()
    @IsString()
    password: string
}