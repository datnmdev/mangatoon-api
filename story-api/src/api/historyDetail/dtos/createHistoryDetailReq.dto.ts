import { Exclude, Expose } from 'class-transformer'
import { IsInt, IsNotEmpty } from 'class-validator'

@Exclude()
export class CreateHistoryDetailDTO {
    @Expose()
    @IsNotEmpty()
    @IsInt()
    chapterId: number
}