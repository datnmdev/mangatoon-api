import { Exclude, Expose, Type } from 'class-transformer'
import { IsNotEmpty, IsNumber } from 'class-validator'

@Exclude()
export class DeleteStoryAuthorDetailRequestDTO {
    @Expose()
    @Type(() => Number)
    @IsNotEmpty()
    @IsNumber()
    storyId: number

    @Expose()
    @Type(() => Number)
    @IsNotEmpty()
    @IsNumber()
    authorId: number
}