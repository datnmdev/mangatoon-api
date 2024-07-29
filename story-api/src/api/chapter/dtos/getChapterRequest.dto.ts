import { Expose, Transform } from 'class-transformer'
import { IsNotEmpty, IsOptional } from 'class-validator'

import { IsInteger, Min } from '../../../helpers/classValidator.helper'
import { transformToNumber } from '../../../helpers/classTransformer.helper'
import { TransformerGroup } from './enums/group.enum'

export class GetChapterRequestDTO {
    @Expose()
    @Transform(transformToNumber, {
        groups: [
            TransformerGroup.EXCLUDE
        ]
    })
    @IsOptional()
    @IsInteger()
    id: number

    @Expose()
    @Transform(transformToNumber, {
        groups: [
            TransformerGroup.EXCLUDE
        ]
    })
    @IsOptional()
    @IsInteger()
    storyId: number

    @Expose({
        groups: [
            TransformerGroup.EXCLUDE_PAGE_LIMIT
        ]
    })
    @Transform(transformToNumber, {
        groups: [
            TransformerGroup.EXCLUDE
        ]
    })
    @IsNotEmpty()
    @IsInteger()
    @Min(1)
    page: number

    @Expose({
        groups: [
            TransformerGroup.EXCLUDE_PAGE_LIMIT
        ]
    })
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