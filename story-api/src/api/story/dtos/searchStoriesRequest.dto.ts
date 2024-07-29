import { Exclude, Expose, Transform } from 'class-transformer'
import { IsArray, IsEmpty, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { transformToInt, transformToNumberArray } from '../../../helpers/classTransformer.helper'
import { StoryStatus } from '../../../enums/story.enum'

@Exclude()
export class SearchStoryRequestDTO {
    @Expose()
    @IsString()
    keyword: string

    @Expose()
    @Transform(transformToNumberArray(','))
    @IsOptional()
    @IsArray()
    @IsInt({
        each: true
    })
    status?: Array<number> | number = [StoryStatus.IN_PROGRESS, StoryStatus.SUSPENDED, StoryStatus.FINISHED]

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