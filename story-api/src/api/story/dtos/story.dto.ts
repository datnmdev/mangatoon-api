import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class StoryDTO {
    @Expose()
    id?: number

    @Expose()
    title?: string

    @Expose()
    description?: string

    @Expose()
    coverImageUrl?: string

    @Expose()
    status?: number

    @Expose()
    createdAt?: Date

    @Expose()
    updatedAt?: Date

    @Expose()
    countryId?: number
}