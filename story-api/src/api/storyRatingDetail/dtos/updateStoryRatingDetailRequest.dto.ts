import { Exclude, Expose } from 'class-transformer'
import { IsInt, IsNotEmpty, Max, Min } from 'class-validator'

@Exclude()
export class UpdateStoryRatingDetailRequestDTO {
    @Expose()
    @IsNotEmpty()
    @IsInt()
    storyId: number

    @Expose()
    userId: number

    @Expose()
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(5)
    star: number
}