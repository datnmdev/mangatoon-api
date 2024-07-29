import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class AliasDTO {
    @Expose()
    id: number

    @Expose()
    title: string

    @Expose()
    storyId: number
}