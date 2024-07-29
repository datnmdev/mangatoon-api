import { Exclude, Expose, Type } from 'class-transformer'

@Exclude()
export class GetAuthorsRequestDTO {
    @Expose()
    @Type(() => Number)
    id: number

    @Expose()
    @Type(() => String)
    name: string
}