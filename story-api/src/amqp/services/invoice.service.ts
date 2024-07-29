import { Models } from '../../database/mysql.config'
import { CreateInvoiceReqFromAmqpDTO } from '../dtos/createInvoiceReqFromAmqp.dto'

export class InvoiceService {
    
    static createInvoice = (invoiceData: CreateInvoiceReqFromAmqpDTO) => {
        return Models.invoice.create(invoiceData)
    }

}