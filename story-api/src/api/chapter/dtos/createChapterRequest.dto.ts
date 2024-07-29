import { Exclude, Expose } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'

import { IsInteger } from '../../../helpers/classValidator.helper'

@Exclude()
export class CreateChapterRequestDTO {
    @Expose()
    @IsNotEmpty()
    @IsInteger()
    order: number

    @Expose()
    @IsNotEmpty()
    @IsString()
    name: string

    @Expose()
    @IsNotEmpty()
    @IsInteger()
    storyId: number
}