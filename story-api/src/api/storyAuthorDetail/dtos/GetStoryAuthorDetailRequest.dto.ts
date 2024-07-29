import { Exclude, Expose, Transform } from 'class-transformer'
import { IsNotEmpty, IsOptional, Min } from 'class-validator'
import { IsInteger } from '../../../helpers/classValidator.helper'
import { transformToInt } from '../../../helpers/classTransformer.helper'

@Exclude()
export class GetStoryAuthorDetailRequestDTO {
    @Expose()
    @Transform(transformToInt)
    @IsOptional()
    @IsInteger()
    storyId: number

    @Expose()
    @Transform(transformToInt)
    @IsOptional()
    @IsInteger()
    authorId: number

    @Expose()
    @Transform(transformToInt)
    @IsOptional()
    @IsInteger()
    status?: number

    @Expose()
    @Transform(transformToInt)
    @IsNotEmpty()
    @IsInteger()
    @Min(1)
    page: number

    @Expose()
    @Transform(transformToInt)
    @IsNotEmpty()
    @IsInteger()
    @Min(1)
    limit: number
}