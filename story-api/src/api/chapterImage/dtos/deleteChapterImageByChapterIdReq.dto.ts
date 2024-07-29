import { Exclude, Expose } from 'class-transformer'
import { IsInt, IsNotEmpty } from 'class-validator'

@Exclude()
export class DeleteChapterImageByChapterIdReqDTO {
    @Expose()
    @IsNotEmpty()
    @IsInt()
    chapterId: number
}