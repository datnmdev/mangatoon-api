import { Exclude, Expose, Transform } from 'class-transformer'
import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator'

import { transformToBcryptHash, transformToDate } from '../../../helpers/classTransformer.helper'
import { TransformGroup } from './transform.group'

@Exclude()
export class SignUpWithEmailPasswordRequestDTO {
    @Expose()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @MaxLength(75)
    email: string

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
    @IsOptional()
    @IsNumber()
    gender: Date

    @Expose()
    @Transform(transformToBcryptHash, {
        groups: [
            TransformGroup.EXE_HASH_PASSWORD
        ]
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    password: string
}