import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class CreateServicePackageReqFromAmqpDTO {
    @Expose()
    id: number

    @Expose()
    expireIn: number
}