import { Exclude, Expose } from 'class-transformer'
import { IsInt, IsNotEmpty } from 'class-validator'

@Exclude()
export class UpdateCommentInteractionRequestDTO {
    @Expose()
    @IsNotEmpty()
    @IsInt()
    commentId: number

    @Expose()
    userId: number

    @Expose()
    @IsNotEmpty()
    @IsInt()
    interactionType: number
}