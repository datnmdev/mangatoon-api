import { Models } from '../../database/mysql.config'
import { CreateServicePackageTransactionReqFromAmqpDTO } from '../dtos/createServicePackageTransactionReqFromAmqp.dto'

export class ServicePackageTransactionService {
    
    static createServicePackageTransaction = (servicePackageTransactionData: CreateServicePackageTransactionReqFromAmqpDTO) => {
        return Models.servicePackageTransaction.create(servicePackageTransactionData)
    }

}