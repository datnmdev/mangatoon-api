import { Exclude, Expose, Transform } from 'class-transformer'
import { IsInt, IsNotEmpty } from 'class-validator'

import { transformToInt } from '../../../helpers/classTransformer.helper'

@Exclude()
export class GetTopStoriesByRatingRequestDTO {
    @Expose()
    @Transform(transformToInt)
    @IsNotEmpty()
    @IsInt()
    page: number

    @Expose()
    @Transform(transformToInt)
    @IsNotEmpty()
    @IsInt()
    limit: number
}