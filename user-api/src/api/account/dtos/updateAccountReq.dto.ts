import { Exclude, Expose, Transform } from 'class-transformer'
import { IsInt, IsNotEmpty, IsOptional, Max, Min } from 'class-validator'
import { transformToInt } from '../../../helpers/classTransformer.helper'

@Exclude()
export class UpdateAccountReqBodyDTO {
    @Expose()
    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(3)
    status: number
}

@Exclude()
export class UpdateAccountReqParamsDTO {
    @Expose()
    @Transform(transformToInt)
    @IsNotEmpty()
    @IsInt()
    id: number
}