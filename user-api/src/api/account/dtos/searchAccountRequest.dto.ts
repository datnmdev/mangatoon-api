import { Exclude, Expose, Transform } from 'class-transformer'
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { transformToInt, transformToNumberArray, transformToStringArray } from '../../../helpers/classTransformer.helper'
import { AccountStatus } from '../../../enums/account.enum'
import { Role } from '../../../enums/role.enum'

@Exclude()
export class SearchAccountRequestDTO {
    @Expose()
    @IsString()
    keyword: string

    @Expose()
    @Transform(transformToNumberArray(','))
    @IsOptional()
    @IsArray()
    @IsInt({
        each: true
    })
    status?: Array<number> | number = [AccountStatus.ACTIVATED]

    @Expose()
    @Transform(transformToStringArray(','))
    @IsOptional()
    @IsArray()
    @IsString({
        each: true
    })
    role?: Array<string> | string = [Role.USER, Role.ADMIN]

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