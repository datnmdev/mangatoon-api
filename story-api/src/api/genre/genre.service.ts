import { plainToClass } from 'class-transformer'

import { Models } from '../../database/mysql.config'
import { CreateGenreRequestDTO } from './dtos/createGenreRequest.dto'
import { UpdateGenreRequestBodyDTO } from './dtos/updateGenreRequest.dto'
import { GetGenreRequestDTO } from './dtos/getGenreRequest.dto'
import { SearchGenreReqDTO } from './dtos/searchGenreReq.dto'
import { Sequelize } from 'sequelize'
import { Op } from 'sequelize'

export class GenreService {

    static createGenre = (genreData: CreateGenreRequestDTO) => {
        return Models.genre.create(genreData)
    }

    static deleteGenre = (id: number) => {
        return Models.genre.destroy({
            where: {
                id
            }
        })
    }

    static updateGenre = (id: number, genreData: UpdateGenreRequestBodyDTO) => {
        return Models.genre.update(plainToClass(Object, genreData, {
                exposeUnsetFields: false
            })
        , {
            where: {
                id
            }
        })
    }

    static getGenres= (queries: GetGenreRequestDTO) => {
        return Models.genre.findAll({
            where: {
                ...plainToClass(Object, queries, {
                    exposeUnsetFields: false
                })
            }
        })
    }

    static searchGenre = (queries: SearchGenreReqDTO) => {
        if (queries.keyword === '') {
            return Models.genre.findAndCountAll({
                offset: (queries.page - 1) * queries.limit,
                limit: queries.limit
            })
        }

        if (!isNaN(Number(queries.keyword))) {
            return Models.genre.findAndCountAll({
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

        return Models.genre.findAndCountAll({
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