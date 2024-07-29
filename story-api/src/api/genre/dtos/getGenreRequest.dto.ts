import { Exclude, Expose, Type } from 'class-transformer'

@Exclude()
export class GetGenreRequestDTO {
    @Expose()
    @Type(() => Number)
    id: number

    @Expose()
    @Type(() => String)
    name: string
}