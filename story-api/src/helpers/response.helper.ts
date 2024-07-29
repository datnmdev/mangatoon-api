export class AppResponse extends Response {
    data: any
    error: Error | null

    constructor(data: any, error: Error | null) {
        super(undefined)
        this.data = data
        this.error = error
    }
}