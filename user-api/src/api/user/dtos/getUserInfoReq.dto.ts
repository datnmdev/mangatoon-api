import { Exclude, Expose, Transform } from 'class-transformer'
import { IsInt, IsNotEmpty } from 'class-validator'
import { transformToInt } from '../../../helpers/classTransformer.helper'

@Exclude()
export class GetUserInfoReqDTO {
    @Expose()
    @Transform(transformToInt)
    @IsNotEmpty()
    @IsInt()
    id: number
}