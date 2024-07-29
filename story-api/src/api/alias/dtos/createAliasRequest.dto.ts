import { Exclude, Expose } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator'

@Exclude()
export class CreateAliasRequestDTO {
    @Expose()
    @IsNotEmpty()
    @IsString()
    @MaxLength(250)
    title: string

    @Expose()
    @IsNotEmpty()
    @IsNumber()
    storyId: number
}