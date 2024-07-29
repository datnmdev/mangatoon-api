import { Expose } from 'class-transformer'

@Expose()
export class CreateChapterReqFromAmqpDTO {
    @Expose()
    id: number

    @Expose()
    storyId: number
}