import { Models } from '../../database/mysql.config'
import { CreateChapterReqFromAmqpDTO } from '../dtos/createChapterReqFromAmqp.dto'

export class ChapterService {
    
    static createChapter = (chapterData: CreateChapterReqFromAmqpDTO) => {
        return Models.chapter.create(chapterData)
    }

}