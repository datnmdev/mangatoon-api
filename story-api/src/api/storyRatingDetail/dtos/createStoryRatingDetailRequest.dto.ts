import { Exclude, Expose } from 'class-transformer'
import { IsNotEmpty, Max, Min } from 'class-validator'

import { IsInteger } from '../../../helpers/classValidator.helper'

@Exclude()
export class CreateStoryRatingDetailRequestDTO {
    @Expose()
    @IsNotEmpty()
    @IsInteger()
    storyId: number

    @Expose()
    userId: number

    @Expose()
    @IsNotEmpty()
    @IsInteger()
    @Min(1)
    @Max(5)
    star: number
}