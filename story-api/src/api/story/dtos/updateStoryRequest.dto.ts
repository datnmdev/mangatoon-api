import { Exclude, Expose, Transform } from 'class-transformer'
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'

import { transformToDate, transformToInt } from '../../../helpers/classTransformer.helper'

@Exclude()
export class UpdateStoryRequestBodyDTO {
    @Expose()
    @IsOptional()
    @IsString()
    @MaxLength(250)
    title: string

    @Expose()
    @IsOptional()
    @IsString()
    description: string

    @Expose()
    @IsOptional()
    @IsString()
    coverImageUrl: string

    @Expose()
    @Transform(transformToInt)
    @IsOptional()
    @IsInt()
    status: number

    @Expose()
    updatedAt: Date

    @Expose()
    @Transform(transformToInt)  
    @IsOptional()
    @IsInt()
    countryId: number
}

@Exclude()
export class UpdateStoryRequestParamDTO {
    @Expose()
    @Transform(transformToInt)
    @IsNotEmpty()
    @IsInt()
    id: number
}