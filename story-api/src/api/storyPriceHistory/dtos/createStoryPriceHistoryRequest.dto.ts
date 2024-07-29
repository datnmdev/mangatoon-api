import { Exclude, Expose, Transform } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'

import { IsDateOrDateString, IsExistedPriceStoryStartTime, IsFloat, IsFutureDate, IsInteger } from '../../../helpers/classValidator.helper'
import { transformToDate } from '../../../helpers/classTransformer.helper'

@Exclude()
export class CreateStoryPriceHistoryRequestDTO {
    @Expose()
    @IsNotEmpty()
    @IsFloat()
    price: number

    @Expose()
    @Transform(transformToDate)
    @IsNotEmpty()
    @IsDateOrDateString()
    @IsFutureDate()
    @IsExistedPriceStoryStartTime()
    startTime: Date

    @Expose()
    @IsNotEmpty()
    @IsInteger()
    storyId: number
}