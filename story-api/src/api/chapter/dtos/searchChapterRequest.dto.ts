import { Exclude, Expose, Transform } from 'class-transformer'
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { transformToInt, transformToNumberArray } from '../../../helpers/classTransformer.helper'
import { ChapterStatus } from '../../../enums/chapter.enum'

@Exclude()
export class SearchChapterReqDTO {
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
    status?: Array<number> | number = [ChapterStatus.RELEASED]

    @Expose()
    @Transform(transformToInt)
    @IsNotEmpty()
    @IsInt()
    storyId: number

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