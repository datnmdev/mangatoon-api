import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class CreateInvoiceReqFromAmqpDTO {
    @Expose()
    storyId: number

    @Expose()
    userId: number
}