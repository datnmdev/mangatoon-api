import { Exclude, Expose, Transform } from 'class-transformer'
import { IsInt, IsNotEmpty, IsString } from 'class-validator'
import { transformToInt } from '../../../helpers/classTransformer.helper'

@Exclude()
export class SearchGenreReqDTO {
    @Expose()
    @IsString()
    keyword: string

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