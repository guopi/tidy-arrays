export type NonNilOf<T> = Exclude<T, undefined | null>

declare global {
    interface Array<T> {
        mapNotNil<R>(mapper: (v: T, index: number) => R): NonNilOf<R>[]
    }
}

((proto: any) => {
    if (typeof proto.mapNotNil !== 'function') {
        proto.mapNotNil = function <T, R>(
            this: T[],
            mapper: (v: T, index: number) => R
        ): NonNilOf<R>[] {
            const ret: any[] = []
            const len = this.length
            for (let i = 0; i < len; i++) {
                const r = mapper(this[i], i)
                if (r != null) { // 防止空字符串被忽略
                    ret.push(r)
                }
            }
            return ret
        }
    }
})(Array.prototype)

