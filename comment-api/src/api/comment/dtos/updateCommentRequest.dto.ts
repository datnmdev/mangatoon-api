import { Exclude, Expose, Transform } from 'class-transformer'
import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min, MinLength } from 'class-validator'

import { transformToInt } from '../../../helpers/classTransformer.helper'

@Exclude()
export class UpdateCommentRequestBodyDTO {
    @Expose()
    @IsOptional()
    @IsString()
    @MinLength(1)
    content: string

    @Expose()
    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(1)
    status: string

    @Expose()
    userId: number
}

@Exclude()
export class UpdateCommentRequestParamDTO {
    @Expose()
    @Transform(transformToInt)
    @IsNotEmpty()
    @IsInt()
    id: number
}