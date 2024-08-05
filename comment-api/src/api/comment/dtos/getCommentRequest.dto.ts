import { Exclude, Expose, Transform } from 'class-transformer'
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator'

import { transformToInt } from '../../../helpers/classTransformer.helper'

@Exclude()
export class GetCommentRequestDTO {
    @Expose()
    @Transform(transformToInt)
    @IsOptional()
    @IsInt()
    id: number

    @Expose()
    @Transform(transformToInt)
    @IsOptional()
    @IsInt()
    chapterId: number

    @Expose()
    @Transform(transformToInt)
    @IsOptional()
    @IsInt()
    storyId: number

    @Expose()
    @Transform(transformToInt)
    @IsOptional()
    @IsInt()
    parentId: number

    @Expose()
    @Transform(transformToInt)
    @IsNotEmpty()
    @IsInt()
    sort: number

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