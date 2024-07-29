import { Exclude, Expose, Transform } from 'class-transformer'
import { IsOptional } from 'class-validator'

import { IsDateOrDateString, IsFloat, IsInteger } from '../../../helpers/classValidator.helper'
import { TransformerGroup } from './enums/group.enum'
import { transformToDate, transformToNumber } from '../../../helpers/classTransformer.helper'

@Exclude()
export class GetStoryPriceHistoryRequestDTO {
    @Expose()
    @Transform(transformToNumber, {
        groups: [
            TransformerGroup.EXCLUDE
        ]
    })
    @IsOptional()
    @IsInteger()
    id?: number

    @Expose()
    @Transform(transformToNumber, {
        groups: [
            TransformerGroup.EXCLUDE
        ]
    })
    @IsOptional()
    @IsFloat()
    price?: number

    @Expose()
    @Transform(transformToDate, {
        groups: [
            TransformerGroup.EXCLUDE
        ]
    })
    @IsOptional()
    @IsDateOrDateString()
    startTime?: Date

    @Expose()
    @Transform(transformToNumber, {
        groups: [
            TransformerGroup.EXCLUDE
        ]
    })
    @IsOptional()
    @IsInteger()
    storyId?: number
}