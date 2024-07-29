import { Exclude, Expose, Transform } from 'class-transformer'
import { IsInt, IsNotEmpty } from 'class-validator'

import { transformToInt } from '../../../helpers/classTransformer.helper'

@Exclude()
export class GetFollowCountOfStoryRequestDTO {
    @Expose()
    @Transform(transformToInt)
    @IsNotEmpty()
    @IsInt()
    storyId: number
}