import { NextFunction, Request, Response } from 'express'

import { uploader } from './multer.config'
import { envVariables } from '../dotenv'

export class MulterMiddleware {

    static chapterImagesMulterMiddleware = (req: Request, res: Response, next: NextFunction) => {
        uploader(String(envVariables.UPLOAD_ATTACHMENT_URL)).array('attachment')(req, res, err => {
            if (err) {
                return next(err)
            }
            return next()
        }) 
    }
}