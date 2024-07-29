import { Exclude, Expose, Transform } from 'class-transformer'
import { IsNotEmpty, IsOptional, Min } from 'class-validator'
import { transformToInt, transformToNumber } from '../../../helpers/classTransformer.helper'
import { IsInteger } from '../../../helpers/classValidator.helper'

@Exclude()
export class GetStoryGenreDetailRequestDTO {
    @Expose()
    @Transform(transformToInt)
    @IsOptional()
    @IsInteger()
    storyId: number

    @Expose()
    @Transform(transformToInt)
    @IsOptional()
    @IsInteger()
    status: number

    @Expose()
    @Transform(transformToInt)
    @IsOptional()
    @IsInteger()
    countryId: number

    @Expose()
    @Transform(transformToInt)
    @IsOptional()
    @IsInteger()
    genreId: number

    @Expose()
    @Transform(transformToNumber)
    @IsNotEmpty()
    @IsInteger()
    @Min(1)
    page: number

    @Expose()
    @Transform(transformToNumber)
    @IsNotEmpty()
    @IsInteger()
    @Min(1)
    limit: number
}