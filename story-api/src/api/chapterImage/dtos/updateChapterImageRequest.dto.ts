import { Exclude, Expose, Transform } from 'class-transformer'
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator'

import { transformToInt } from '../../../helpers/classTransformer.helper'

@Exclude()
export class UpdateChapterImageRequestBodyDTO {
    @Expose()
    @IsOptional()
    @IsInt()
    order: number
}

@Exclude()
export class UpdateChapterImageRequestParamDTO {
    @Expose()
    @Transform(transformToInt)
    @IsNotEmpty()
    @IsInt()
    id: number
}