import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class CreateServicePackageTransactionReqFromAmqpDTO {
    @Expose()
    id: number

    @Expose()
    createdAt: Date

    @Expose()
    servicePackageId: number

    @Expose()
    userId: number
}