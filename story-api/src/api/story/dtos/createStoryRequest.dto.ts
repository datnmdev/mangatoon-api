import { Exclude, Expose, Transform } from 'class-transformer'
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'

import { transformToInt } from '../../../helpers/classTransformer.helper'

@Exclude()
export class CreateStoryRequestDTO {
    @Expose()
    @IsNotEmpty()
    @IsString()
    @MaxLength(250)
    title: string

    @Expose()
    @IsOptional()
    @IsString()
    description: string

    @Expose()
    @IsNotEmpty()
    @IsString()
    coverImageUrl: string

    @Expose()
    @Transform(transformToInt)
    @IsNotEmpty()
    @IsInt()
    countryId: number
}