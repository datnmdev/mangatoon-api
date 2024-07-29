import fs from 'fs'

export class FsHelper {
    static isExistedPath = (path: string) => {
        return fs.existsSync(path)
    }

    static deleteFile = async (path: string) => {
        const absolutePath = `${process.cwd()}/${path}`
        if (FsHelper.isExistedPath(absolutePath)) {
            await fs.promises.unlink(absolutePath)
        }
    }
}