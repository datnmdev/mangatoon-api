import { Exclude, Expose, Transform } from 'class-transformer'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

@Exclude()
export class CreateGenreRequestDTO {
    @Expose()
    @IsNotEmpty()
    @IsString()
    name: string

    @Expose()
    @IsOptional()
    @IsString()
    description: string
}