import { Exclude, Expose, Type } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

@Exclude()
export class UpdateCountryRequestBodyDTO {
    @Expose()
    @IsOptional()
    @IsString()
    name: string
}

@Exclude()
export class UpdateCountryRequestParamDTO {
    @Expose()
    @Type(() => Number)
    @IsNotEmpty()
    @IsNumber()
    id: number
}
