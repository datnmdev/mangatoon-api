import { CreateOptions } from 'sequelize'
import { plainToClass } from 'class-transformer'

import { Models } from '../../database/mysql.config'
import { chapterImagesAttributes } from '../../database/models/chapterImages'
import { UpdateChapterImageRequestBodyDTO } from './dtos/updateChapterImageRequest.dto'
import { CreateChapterImageDTO } from './dtos/createChapterImage.dto'

export class ChapterImagesService {

    static createChapterImage = (chapterImageData: CreateChapterImageDTO, options?: CreateOptions<chapterImagesAttributes>) => {
        return Models.chapterImages.create(chapterImageData, options)
    }

    static updateChapterImage = (id: number, chapterImageData: UpdateChapterImageRequestBodyDTO) => {
        return Models.chapterImages.update(plainToClass(Object, chapterImageData, {
            exposeUnsetFields: false
        }), {
            where: {
                id
            }
        })
    }

    static deleteChapterImage = (id: number) => {
        return Models.chapterImages.destroy({
            where: {
                id
            }
        })
    }

    static deleteChapterImageByChapterId = (chapterId: number) => {
        return Models.chapterImages.destroy({
            where: {
                chapterId
            }
        })
    }

    static getChapterImagesByChapterId = (chapterId: number) => {
        return Models.chapterImages.findAll({
            where: {
                chapterId
            },
            order: [
                ['order', 'ASC']
            ]
        })
    }

}