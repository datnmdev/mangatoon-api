import { Exclude, Expose, Transform } from 'class-transformer'
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

import { transformToInt } from '../../../helpers/classTransformer.helper'

@Exclude()
export class UpdateCommentRequestBodyDTO {
    @Expose()
    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(9999)
    content: string

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