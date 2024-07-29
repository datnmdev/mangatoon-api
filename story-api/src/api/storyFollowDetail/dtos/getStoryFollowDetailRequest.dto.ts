import { Exclude, Expose, Transform } from 'class-transformer'
import { IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator'

import { transformToInt, transformToNumber } from '../../../helpers/classTransformer.helper'
import { TransformGroup } from './enums/group.enum'

@Exclude()
export class GetStoryFollowDetailRequestDTO {
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

    @Expose({
        groups: [
            TransformGroup.EXPOSE_PAGINATION
        ]
    })
    @Transform(transformToInt)
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    page: number

    @Expose({
        groups: [
            TransformGroup.EXPOSE_PAGINATION
        ]
    })
    @Transform(transformToInt)
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    limit: number
}