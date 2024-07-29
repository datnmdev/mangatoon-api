
export class Set<V> {

    private data: Map<String, V>

    public constructor() {
        this.data = new Map()
    }

    public addAll(data: V[], field: string) {
        data.forEach(item => {
            const fieldValue = (item as any)[field]
            if (!this.data.has(fieldValue)) {
                this.data.set(fieldValue, item)
            }
        })
        return this
    }

    public values() {
        return this.data.values()
    }

}