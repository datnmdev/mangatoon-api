import fs from 'fs'
import path from 'path'

export class FsHelper {

    static isExistedPath = (path: string) => {
        return fs.existsSync(path)
    }

    static deleteFile = async (filePath: string) => {
        if (FsHelper.isExistedPath(filePath)) {
            await fs.promises.unlink(filePath)
        }
    }

}