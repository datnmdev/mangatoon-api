import { Exclude, Expose } from 'class-transformer'
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

@Exclude()
export class CreateCommentRequestDTO {
    @Expose()
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    content: string

    @Expose()
    @IsOptional()
    @IsInt()
    parentId: number

    @Expose()
    @IsOptional()
    @IsInt()
    chapterId: number

    @Expose()
    userId: number

    @Expose()
    @IsOptional()
    @IsInt()
    storyId: number
}