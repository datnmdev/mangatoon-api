import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class CreateChapterImageDTO {
    @Expose()
    path: string

    @Expose()
    chapterId: number
}