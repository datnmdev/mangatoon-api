import { Exclude, Expose } from 'class-transformer'
import { IsInt, IsNotEmpty } from 'class-validator'

@Exclude()
export class DeleteStoryFollowDetailRequestDTO {
    @Expose()
    @IsNotEmpty()
    @IsInt()
    storyId: number

    @Expose()
    userId: number
}