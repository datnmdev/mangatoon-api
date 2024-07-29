import { Exclude, Expose, Transform } from 'class-transformer'
import { IsDate, IsInt, IsOptional, IsString } from 'class-validator'
import { transformToDate, transformToInt } from '../../../helpers/classTransformer.helper'

@Exclude()
export class UpdateProfileReqDTO {
    @Expose()
    @IsOptional()
    @IsString()
    name: string

    @Expose()
    @Transform(transformToDate)
    @IsOptional()
    @IsDate()
    dob: Date

    @Expose()
    @Transform(transformToInt)
    @IsOptional()
    @IsInt()
    gender: number

    avatarUrl: string
}