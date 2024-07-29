import { plainToClass } from 'class-transformer'

import { Models } from '../../database/mysql.config'
import { CreateCountryRequestDTO } from './dtos/createCountryRequest.dto'
import { UpdateCountryRequestBodyDTO } from './dtos/updateCountryRequest.dto'
import { GetCountryRequestDTO } from './dtos/getCountryRequest.dto'

export class CountryService {

    static createCountry = (countryData: CreateCountryRequestDTO) => {
        return Models.country.create(countryData)
    }

    static updateCountry = (id: number, countryData: UpdateCountryRequestBodyDTO) => {
        return Models.country.update(plainToClass(Object, countryData, {
                exposeUnsetFields: false
            })
        , {
            where: {
                id
            }
        })
    }

    static deleteCountry = (id: number) => {
        return Models.country.destroy({
            where: {
                id
            }
        })
    }

    static getCountry = (queries: GetCountryRequestDTO) => {
        return Models.country.findAll({
            where: {
                ...plainToClass(Object, queries, {
                    exposeUnsetFields: false
                })
            }
        })
    }

}