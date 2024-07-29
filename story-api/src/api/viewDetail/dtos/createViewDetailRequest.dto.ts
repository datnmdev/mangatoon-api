import { Exclude, Expose } from 'class-transformer'
import { IsInt, IsNotEmpty, IsString } from 'class-validator'

@Exclude()
export class CreateViewDetailRequestDTO {
    @Expose()
    @IsNotEmpty()
    @IsInt()
    chapterId: number

    @Expose()
    @IsNotEmpty()
    @IsString()
    clientId: string
}