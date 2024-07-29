import { plainToClass } from 'class-transformer'

import { Models } from '../../database/mysql.config'
import { CreateAliasRequestDTO } from './dtos/createAliasRequest.dto'
import { GetAliasesRequestDTO } from './dtos/getAliasesRequest.dto'

export class AliasService {

    static getAliases = (queries: GetAliasesRequestDTO) => {
        return Models.alias.findAll({
            where: {
                ...plainToClass(Object, queries, { 
                    exposeUnsetFields: false
                 })
            }
        })
    }

    static createAlias = (aliasData: CreateAliasRequestDTO) => {
        return Models.alias.create(aliasData)
    }
    
    static deleteAlias = (id: number) => {
        return Models.alias.destroy({
            where: {
                id
            }
        })
    }

}