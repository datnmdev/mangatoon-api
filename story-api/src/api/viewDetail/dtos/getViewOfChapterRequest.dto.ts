import { Exclude, Expose, Transform } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'

import { IsDateOrDateString, IsInteger } from '../../../helpers/classValidator.helper'
import { transformToDate, transformToNumber } from '../../../helpers/classTransformer.helper'
import { TransformerGroup } from './enums/group.enum'

@Exclude()
export class GetViewOfChapterRequestQueryDTO {
    @Expose()
    @Transform(transformToDate, {
        groups: [
            TransformerGroup.EXCLUDE
        ]
    })
    @IsNotEmpty()
    @IsDateOrDateString()
    from: Date

    @Expose()
    @Transform(transformToDate, {
        groups: [
            TransformerGroup.EXCLUDE
        ]
    })
    @IsNotEmpty()
    @IsDateOrDateString()
    to: Date
}

@Exclude()
export class GetViewOfChapterRequestParamDTO {
    @Expose()
    @Transform(transformToNumber, {
        groups: [
            TransformerGroup.EXCLUDE
        ]
    })
    @IsNotEmpty()
    @IsInteger()
    chapterId: number
}