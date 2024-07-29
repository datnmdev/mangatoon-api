import { plainToClass } from 'class-transformer'

import { Models } from '../../database/mysql.config'
import { UpdateAccountReqBodyDTO } from './dtos/updateAccountReq.dto'
import { SearchAccountRequestDTO } from './dtos/searchAccountRequest.dto'
import { Op, Sequelize } from 'sequelize'

export class AccountService {

    static updateAccount = (userId: number, accountData: UpdateAccountReqBodyDTO) => {
        return Models.account.update(plainToClass(Object, accountData, {
            exposeUnsetFields: false
        }), {
            where: {
                userId
            }
        })
    }

    static getAccountByUserId = (userId: number) => {
        return Models.account.findOne({
            where: {
                userId
            }
        })
    }

    static searchAccount = async (queries: SearchAccountRequestDTO) => {
        if (queries.keyword == '') {
            return Models.account.findAndCountAll({
                where: {
                    [Op.and]: [
                        {
                            status: {
                                [Op.or]: queries.status instanceof Number ? [queries.status] : queries.status
                            }
                        },
                        {
                            role: {
                                [Op.or]: queries.role instanceof String ? [queries.role] : queries.role
                            }
                        }
                    ]
                },
                include: [
                    {
                        model: Models.user,
                        attributes: [
                            'name'
                        ],
                        as: 'user'
                    }
                ],
                offset: (queries.page - 1) * queries.limit,
                limit: queries.limit
            })
        }

        if (!isNaN(Number(queries.keyword))) {
            return Models.account.findAndCountAll({
                where: {
                    [Op.and]: [
                        {
                            [Op.or]: [
                                Sequelize.literal(`MATCH (user.name) AGAINST ('${queries.keyword}')`),
                                {
                                    id: Number(queries.keyword)
                                },
                                {
                                    userId: Number(queries.keyword)
                                },
                            ]
                        },
                        {
                            status: {
                                [Op.or]: queries.status instanceof Number ? [queries.status] : queries.status
                            }
                        },
                        {
                            role: {
                                [Op.or]: queries.role instanceof String ? [queries.role] : queries.role
                            }
                        }
                    ]
                },
                include: [
                    {
                        model: Models.user,
                        attributes: [
                            'name'
                        ],
                        as: 'user'
                    }
                ],
                offset: (queries.page - 1) * queries.limit,
                limit: queries.limit
            })
        }

        return Models.account.findAndCountAll({
            where: {
                [Op.and]: [
                    Sequelize.literal(`MATCH (user.name) AGAINST ('${queries.keyword}')`),
                    {
                        status: {
                            [Op.or]: queries.status instanceof Number ? [queries.status] : queries.status
                        }
                    },
                    {
                        role: {
                            [Op.or]: queries.role instanceof String ? [queries.role] : queries.role
                        }
                    }
                ]
            },
            include: [
                {
                    model: Models.user,
                    attributes: [
                        'name'
                    ],
                    as: 'user'
                }
            ],
            offset: (queries.page - 1) * queries.limit,
            limit: queries.limit
        })
    }

}