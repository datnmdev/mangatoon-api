import { plainToClass } from 'class-transformer'

import { Models } from '../../database/mysql.config'
import { CreateAuthorRequestDTO } from './dtos/createAuthorRequest.dto'
import { GetAuthorsRequestDTO } from './dtos/getAuthorsRequestDTO.dto'
import { UpdateAuthorRequestBodyDTO } from './dtos/updateAuthorRequest.dto'
import { SearchAuthorReqDTO } from './dtos/searchAuthorReq.dto'
import { Sequelize } from 'sequelize'
import { Op } from 'sequelize'

export class AuthorService {

    static getAuthors = (queries: GetAuthorsRequestDTO) => {
        return Models.author.findAll({
            where: {
                ...plainToClass(Object, queries, { 
                    exposeUnsetFields: false
                 })
            }
        })
    }

    static createAuthor = (authorData: CreateAuthorRequestDTO) => {
        return Models.author.create(authorData)
    }

    static updateAuthor = (id: number, authorData: UpdateAuthorRequestBodyDTO) => {
        return Models.author.update(plainToClass(Object, authorData, {
            exposeUnsetFields: false
        }), {
            where: {
                id
            }
        })
    }

    static deleteAuthor = (id: number) => {
        return Models.author.destroy({
            where: {
                id
            }
        })
    }

    static searchAuthor = (queries: SearchAuthorReqDTO) => {
        if (queries.keyword === '') {
            return Models.author.findAndCountAll({
                offset: (queries.page - 1) * queries.limit,
                limit: queries.limit
            })
        }

        if (!isNaN(Number(queries.keyword))) {
            return Models.author.findAndCountAll({
                where: {
                    [Op.or]: [
                        Sequelize.literal(`MATCH (name) AGAINST ('${queries.keyword}')`),
                        {
                            id: Number(queries.keyword)
                        }
                    ]
                },
                offset: (queries.page - 1) * queries.limit,
                limit: queries.limit
            })
        }

        return Models.author.findAndCountAll({
            where: {
                [Op.and]: [
                    Sequelize.literal(`MATCH (name) AGAINST ('${queries.keyword}')`)
                ]
            },
            offset: (queries.page - 1) * queries.limit,
            limit: queries.limit
        })
    }
    
}