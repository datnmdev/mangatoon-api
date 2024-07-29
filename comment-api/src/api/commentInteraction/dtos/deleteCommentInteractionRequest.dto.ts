import { Exclude, Expose } from 'class-transformer'
import { IsInt, IsNotEmpty } from 'class-validator'

@Exclude()
export class DeleteCommentInteractionRequestDTO {
    @Expose()
    @IsNotEmpty()
    @IsInt()
    commentId: number

    @Expose()
    userId: number
}