import { Exclude, Expose, Transform } from 'class-transformer'
import { IsInt, IsNotEmpty } from 'class-validator'
import { transformToInt } from '../../../helpers/classTransformer.helper'

@Exclude()
export class GetTopChartDataReqDTO {
    @Expose()
    @Transform(transformToInt)
    @IsNotEmpty()
    @IsInt()
    from: number

    @Expose()
    @Transform(transformToInt)
    @IsNotEmpty()
    @IsInt()
    to: number

    @Expose()
    @Transform(transformToInt)
    @IsNotEmpty()
    @IsInt()
    step: number
}