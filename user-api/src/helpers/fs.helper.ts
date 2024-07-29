import fs from 'fs'

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