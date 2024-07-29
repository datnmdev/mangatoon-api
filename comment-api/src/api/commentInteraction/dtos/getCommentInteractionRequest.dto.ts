import { Exclude, Expose, Transform } from 'class-transformer'
import { IsInt, IsOptional } from 'class-validator'

import { transformToInt } from '../../../helpers/classTransformer.helper'

@Exclude()
export class GetCommentInteractionRequestDTO {
    @Expose()
    @Transform(transformToInt)
    @IsOptional()
    @IsInt()
    commentId: number

    @Expose()
    userId: number
}