import { randomUUID } from 'crypto'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

import { envVariables } from '../dotenv'

export const uploader = (dir: string) => {
    const storage = multer.diskStorage({
        destination: async (req, file, cb) => {
            const dest = path.join(String(envVariables.UPLOAD_BASE_URL), dir)
            if (!fs.existsSync(dest)) {
                await fs.promises.mkdir(dest, {
                    recursive: true
                })
            }
            return cb(null, dest)
        },
        filename: (req, file, cb) => {
            return cb(null, `${randomUUID()}.${file.mimetype.split('/')[1]}`);
        }
    })

    return multer({
        storage,
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