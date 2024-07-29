import { Exclude, Expose } from 'class-transformer'
import { IsInt, IsNotEmpty } from 'class-validator'

@Exclude()
export class CreateStoryFollowDetailRequestDTO {
    @Expose()
    @IsNotEmpty()
    @IsInt()
    storyId: number

    @Expose()
    userId: number
}