import { Expose, Transform } from 'class-transformer'
import { IsInt, IsOptional, Max, Min } from 'class-validator'

import { transformToInt } from '../../../helpers/classTransformer.helper'

export class GetStoryRatingDetailRequestDTO {
    @Expose()
    @Transform(transformToInt)
    @IsOptional()
    @IsInt()
    storyId: number

    @Expose()
    @Transform(transformToInt)
    @IsOptional()
    @IsInt()
    userId: number

    @Expose()
    @Transform(transformToInt)
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(5)
    star: number
}