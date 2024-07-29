import { Models } from '../../database/mysql.config'
import { CreateServicePackageReqFromAmqpDTO } from '../dtos/createServicePackageReqFromAmqp.dto'

export class ServicePackageService {
    
    static createServicePackage = (servicePackageData: CreateServicePackageReqFromAmqpDTO) => {
        return Models.servicePackage.create(servicePackageData)
    }

}