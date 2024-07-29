import { Exclude, Expose, Type } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

@Exclude()
export class UpdateAuthorRequestBodyDTO {
    @Expose()
    @IsOptional()
    @IsString()
    name: string
}

@Exclude()
export class UpdateAuthorRequestParamDTO {
    @Expose()
    @Type(() => Number)
    @IsNotEmpty()
    @IsNumber()
    id: number
}