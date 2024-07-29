import { Exclude, Expose, Type } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

@Exclude()
export class UpdateGenreRequestBodyDTO {
    @Expose()
    @IsOptional()
    @IsString()
    name: string

    @Expose()
    @IsOptional()
    @IsString()
    description: string
}

@Exclude()
export class UpdateGenreRequestParamDTO {
    @Expose()
    @Type(() => Number)
    @IsNotEmpty()
    @IsNumber()
    id: number
}