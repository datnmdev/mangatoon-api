import { Exclude, Expose } from 'class-transformer'
import { IsNotEmpty, IsNumber } from 'class-validator'

@Exclude()
export class CreateStoryAuthorDetailRequestDTO {

    @Expose()
    @IsNotEmpty()
    @IsNumber()
    storyId: number

    @Expose()
    @IsNotEmpty()
    @IsNumber()
    authorId: number

}