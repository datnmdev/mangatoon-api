import { Exclude, Expose, Type } from 'class-transformer'

@Exclude()
export class GetAliasesRequestDTO {
    @Expose()
    @Type(() => Number)
    id: number

    @Expose()
    @Type(() => String)
    title: string

    @Expose()
    @Type(() => Number)
    storyId: number
}