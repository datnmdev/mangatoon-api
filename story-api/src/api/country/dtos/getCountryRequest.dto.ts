import { Exclude, Expose, Type } from 'class-transformer'

@Exclude()
export class GetCountryRequestDTO {
    @Expose()
    @Type(() => Number)
    id: number

    @Expose()
    @Type(() => String)
    name: Number
}