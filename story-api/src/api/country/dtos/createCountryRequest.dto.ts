import { Exclude, Expose } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'

@Exclude()
export class CreateCountryRequestDTO {
    @Expose()
    @IsNotEmpty()
    @IsString()
    name: string
}