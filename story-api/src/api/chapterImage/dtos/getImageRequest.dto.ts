import { Exclude, Expose } from 'class-transformer'
import { IsInt, IsNotEmpty, IsString } from 'class-validator'

@Exclude()
export class GetImageRequestDTO {
    @Expose()
    @IsNotEmpty()
    @IsInt()
    id: number

    @Expose()
    @IsNotEmpty()
    @IsString()
    path: string
}