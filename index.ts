export type NonNilOf<T> = Exclude<T, undefined | null>

declare global {
    interface Array<T> {
        isEmpty(): boolean

        isNotEmpty(): boolean

        mapNotNil<R>(mapper: (v: T, index: number) => R): NonNilOf<R>[]

        flatMapNotNil<R>(mapper: (v: T, index: number) => R[] | null | undefined): NonNilOf<R>[]

        separateWith(separator: T): T[]

        any(predicate: (v: T) => boolean): boolean

        all(predicate: (v: T) => boolean): boolean

        last(): T

        first(): T

        firstOrUndefined(): T | undefined

        lastOrUndefined(): T | undefined

        filterNotNil(): NonNilOf<T>[]
    }
}

((proto: any) => {
    if (typeof proto.isEmpty !== 'function') {
        proto.isEmpty = function <T>(this: T[]) {
            return this.length === 0
        }
    }
    if (typeof proto.isNotEmpty !== 'function') {
        proto.isNotEmpty = function <T>(this: T[]) {
            return this.length > 0
        }
    }
    if (typeof proto.mapNotNil !== 'function') {
        proto.mapNotNil = function <T, R>(
            this: T[],
            mapper: (v: T, index: number) => R
        ): NonNilOf<R>[] {
            const ret: any[] = []
            const len = this.length
            for (let i = 0; i < len; i++) {
                const r = mapper(this[i], i)
                if (r != null) {
                    ret.push(r)
                }
            }
            return ret
        }
    }
    if (typeof proto.flatMapNotNil !== 'function') {
        proto.flatMapNotNil = function <T, R>(
            this: T[],
            mapper: (v: T, index: number) => R[] | null | undefined
        ): R[] {
            return this.mapNotNil(mapper).flat()
        }
    }
    if (typeof proto.separateWith !== 'function') {
        proto.separateWith = function <T>(this: T[], separator: T): T[] {
            const ret: T[] = []
            for (let i = 0; i < this.length; i++) {
                if (i !== 0) {
                    ret.push(separator)
                }
                ret.push(this[i])
            }
            return ret
        }
    }
    if (typeof proto.any !== 'function') {
        proto.any = function <T>(this: T[], predicate: (v: T) => boolean): boolean {
            for (const v of this) {
                if (predicate(v)) return true
            }
            return false
        }
    }
    if (typeof proto.all !== 'function') {
        proto.all = function <T>(this: T[], predicate: (e: T) => boolean): boolean {
            for (const v of this) {
                if (!predicate(v)) return false
            }
            return true
        }
    }
    if (typeof proto.last !== 'function') {
        proto.last = function <T>(this: T[]): T {
            if (this.length === 0) throw new Error('Array is empty.')
            return this[this.length - 1]
        }
    }
    if (typeof proto.first !== 'function') {
        proto.first = function first<T>(this: T[]): T {
            if (this.length === 0) throw new Error('Array is empty.')
            return this[0]
        }
    }
    if (typeof proto.firstOrUndefined !== 'function') {
        proto.firstOrUndefined = function <T>(this: T[]): T | undefined {
            return this[0]
        }
    }
    if (typeof proto.lastOrUndefined !== 'function') {
        proto.lastOrUndefined = function <T>(this: T[]): T | undefined {
            return this[this.length - 1]
        }
    }
    if (typeof proto.filterNotNil !== 'function') {
        proto.filterNotNil = function <T>(this: T[]): NonNilOf<T>[] {
            const ret: any[] = []
            for (const v of this) {
                if (v !== undefined && v !== null) {
                    ret.push(v)
                }
            }
            return ret
        }
    }
})(Array.prototype)

