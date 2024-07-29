import { Exclude, Expose, Transform } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'

import { IsDateOrDateString, IsInteger, Min } from '../../../helpers/classValidator.helper'
import { transformToDate, transformToNumber } from '../../../helpers/classTransformer.helper'
import { TransformerGroup } from './enums/group.enum'

@Exclude()
export class GetTopStoriesByViewCountRequestDTO {
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

    @Expose()
    @Transform(transformToNumber, {
        groups: [
            TransformerGroup.EXCLUDE
        ]
    })
    @IsNotEmpty()
    @IsInteger()
    @Min(1)
    page: number

    @Expose()
    @Transform(transformToNumber, {
        groups: [
            TransformerGroup.EXCLUDE
        ]
    })
    @IsNotEmpty()
    @IsInteger()
    @Min(1)
    limit: number

}