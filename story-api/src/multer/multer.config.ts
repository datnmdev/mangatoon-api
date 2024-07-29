import multer from 'multer'

import { envVariables } from '../dotenv'

export const uploader = () => {
    return multer({
        dest: `${process.cwd()}/uploads`,
        fileFilter: (req, file, cb) => {
            if (String(envVariables.IMAGE_MIME_TYPE).split('|').includes(file.mimetype)) {
                return cb(null, true)
            }
            return cb(null, false)
        },
        limits: {
            fileSize: Number(envVariables.IMAGE_FILE_SIZE)
        }
    })
}