import { Exclude, Expose, Transform } from 'class-transformer'
import { IsArray, IsInt, IsNotEmpty, IsOptional } from 'class-validator'

import { Min } from '../../../helpers/classValidator.helper'
import { transformToInt, transformToNumberArray } from '../../../helpers/classTransformer.helper'
import { StoryStatus } from '../../../enums/story.enum'
import TransformGroup from './transform.group'

@Exclude()
export class GetStoriesRequestDTO {
    @Expose()
    @Transform(transformToInt)
    @IsOptional()
    @IsInt()
    id?: number

    @Expose()
    @IsOptional()
    title?: string

    @Expose()
    @IsOptional()
    description?: string

    @Expose({
        groups: [
            TransformGroup.EXPOSE_STATUS
        ]
    })
    @Transform(transformToNumberArray(','))
    @IsOptional()
    @IsArray()
    @IsInt({
        each: true
    })
    status?: Array<number> | number = [StoryStatus.IN_PROGRESS, StoryStatus.SUSPENDED, StoryStatus.FINISHED]

    @Expose()
    @Transform(transformToInt)
    @IsOptional()
    @IsInt()
    countryId?: number

    @Expose({
        groups: [
            TransformGroup.EXPOSE_PAGINATION
        ]
    })
    @Transform(transformToInt)
    @IsNotEmpty()
    @IsInt()
    page: number

    @Expose({
        groups: [
            TransformGroup.EXPOSE_PAGINATION
        ]
    })
    @Transform(transformToInt)
    @IsNotEmpty()
    @IsInt()
    limit: number
}