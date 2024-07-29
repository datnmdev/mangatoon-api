import { Exclude, Expose } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

@Exclude()
export class CreateAuthorRequestDTO {
    @Expose()
    @IsNotEmpty()
    @IsString()
    name: string
}