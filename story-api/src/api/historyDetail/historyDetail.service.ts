import sequelize from 'sequelize'
import { Models } from '../../database/mysql.config'
import { GetHistoryDetailByUserIdRequestDTO } from './dtos/getHistoryDetailByUserIdRequest.dto'

export class HistoryDetailService {

    static createHistoryDetail = (userId: number, chapterId: number) => {
        return Models.historyDetail.create({
            chapterId,
            userId
        })
    }

    static deleteHistoryDetailById = (id: number) => {
        return Models.historyDetail.destroy({
            where: {
                id
            }
        })
    }

    static deleteHistoryDetailByUserId = (userId: number, transaction: sequelize.Transaction) => {
        return Models.historyDetail.destroy({
            where: {
                userId
            },
            transaction
        })
    }

    static getHistoryDetailById = (id: number) => {
        return Models.historyDetail.findByPk(id)
    }

    static getHistoryDetailByUserId = (userId: number, queries: GetHistoryDetailByUserIdRequestDTO) => {
        return Models.historyDetail.findAndCountAll({
            where: {
                userId
            },
            order: [
                ['createdAt', 'DESC']
            ],
            offset: (queries.page-1)*queries.limit,
            limit: queries.limit
        })
    }

}