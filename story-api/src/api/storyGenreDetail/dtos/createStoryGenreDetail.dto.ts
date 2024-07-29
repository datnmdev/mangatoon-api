import { Exclude, Expose } from 'class-transformer'
import { IsNotEmpty, IsNumber } from 'class-validator'

@Exclude()
export class CreateStoryGenreDetailRequestDTO {
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    storyId: number

    @Expose()
    @IsNotEmpty()
    @IsNumber()
    genreId: number
}