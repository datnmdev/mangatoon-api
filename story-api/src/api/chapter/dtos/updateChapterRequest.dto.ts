import { Exclude, Expose, Transform } from 'class-transformer'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

import { IsInteger } from '../../../helpers/classValidator.helper'
import { ChapterStatus } from '../../../enums/chapter.enum'
import { transformToNumber } from '../../../helpers/classTransformer.helper'
import { TransformerGroup } from './enums/group.enum'

@Exclude()
export class UpdateChapterRequestBodyDTO {
    @Expose()
    @IsOptional()
    @IsInteger()
    order: number

    @Expose()
    @IsOptional()
    @IsString()
    name: string

    @Expose()
    @IsOptional()
    @IsInteger()
    status: ChapterStatus.RELEASED | ChapterStatus.DELETED

    @Expose()
    @IsOptional()
    @IsInteger()
    storyId: number
}

@Exclude()
export class UpdateChapterRequestParamDTO {
    @Expose()
    @Transform(transformToNumber, {
        groups: [
            TransformerGroup.EXCLUDE
        ]
    })
    @IsNotEmpty()
    @IsInteger()
    id: number
}