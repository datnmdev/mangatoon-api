import { Exclude, Expose, Transform } from 'class-transformer'
import { ArrayMinSize, IsArray, IsInt, IsNotEmpty, IsOptional } from 'class-validator'

import { transformToInt } from '../../../helpers/classTransformer.helper'
import { IsNumberStringArray } from '../../../helpers/classValidator.helper'

@Exclude()
export class CreateChapterImagesRequestDTO {
    @Expose()
    @IsOptional()
    @IsArray()
    @IsNumberStringArray()
    @ArrayMinSize(1)
    paths: Array<string>

    @Expose()
    @Transform(transformToInt)
    @IsNotEmpty()
    @IsInt()
    chapterId: number
}