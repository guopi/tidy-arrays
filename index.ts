export type NonNilOf<T> = Exclude<T, undefined | null>

export type DictOf<T> = {
    [key: string]: T
}

declare global {
    interface ReadonlyArray<T> {
        isEmpty(): boolean

        isNotEmpty(): boolean

        mapNonNil<R>(mapper: (v: T, index: number, array: T[]) => R): NonNilOf<R>[]

        reject(predicate: (v: T, index: number, array: T[]) => unknown): T[]

        separateWith(separator: T): T[]

        any(predicate: (v: T, index: number, array: T[]) => unknown): boolean

        all(predicate: (v: T, index: number, array: T[]) => unknown): boolean

        none(predicate: (v: T, index: number, array: T[]) => unknown): boolean

        last(): T

        first(): T

        second(): T

        lastOrUndefined(): T | undefined

        filterNonNil(): NonNilOf<T>[]

        sorted<T>(compareFn?: (a: T, b: T) => number): T[]

        sortedDescending<T>(compareFn?: (a: T, b: T) => number): T[]

        sortedBy(selector: (v: T) => unknown): T[]

        sortedByDescending(selector: (v: T) => unknown): T[]

        mapAsync<R>(parallel: boolean, mapper: (v: T) => Promise<R>): Promise<R[]>

        distinct(): T[]

        distinctBy<K>(keySelector: (v: T) => K): T[]

        findLast(predicate: (value: T, index: number, array: T[]) => unknown): T | undefined

        findLastIndex(predicate: (value: T, index: number, array: T[]) => unknown): number

        countAll(predicate: (value: T, index: number, array: T[]) => unknown): number

        sum<T extends number>(): number

        maxOrUndefined<T extends number>(): number | undefined

        minOrUndefined<T extends number>(): number | undefined

        sumBy(selector: (value: T, index: number, array: T[]) => number): number

        maxByOrUndefined(selector: (v: T, index: number, array: T[]) => number): T | undefined

        minByOrUndefined(selector: (v: T, index: number, array: T[]) => number): T | undefined

        mapToObject<R>(mapper: (v: T, index: number, array: T[]) => [string, R]): DictOf<R>

        mapToSet<R>(mapper: (v: T, index: number, array: T[]) => R): Set<R>

        mapToMap<K, V>(mapper: (v: T, index: number, array: T[]) => [K, V]): Map<K, V>

        intersect(list: Iterable<T> | readonly T[] | Set<T>): T[]

        exclude(list: Iterable<T> | readonly T[] | Set<T>): T[]

        chunk(size: number): T[][]
    }

    interface Array<T> {
        isEmpty(): boolean

        isNotEmpty(): boolean

        mapNonNil<R>(mapper: (v: T, index: number, array: T[]) => R): NonNilOf<R>[]

        reject(predicate: (v: T, index: number, array: T[]) => unknown): T[]

        separateWith(separator: T): T[]

        any(predicate: (v: T, index: number, array: T[]) => unknown): boolean

        all(predicate: (v: T, index: number, array: T[]) => unknown): boolean

        none(predicate: (v: T, index: number, array: T[]) => unknown): boolean

        last(): T

        first(): T

        second(): T

        lastOrUndefined(): T | undefined

        filterNonNil(): NonNilOf<T>[]

        removeAllValue(v: T): boolean

        removeFirstValue(v: T): boolean

        removeLastValue(v: T): boolean

        removeAllIf(predicate: (v: T, index: number, array: T[]) => unknown): boolean

        removeFirstIf(predicate: (v: T, index: number, array: T[]) => unknown): T | undefined

        removeLastIf(predicate: (v: T, index: number, array: T[]) => unknown): T | undefined

        sorted<T>(compareFn?: (a: T, b: T) => number): T[]

        sortedDescending<T>(compareFn?: (a: T, b: T) => number): T[]

        sortedBy(selector: (v: T) => unknown): T[]

        sortedByDescending(selector: (v: T) => unknown): T[]

        mapAsync<R>(parallel: boolean, mapper: (v: T) => Promise<R>): Promise<R[]>

        distinct(): T[]

        distinctBy<K>(keySelector: (v: T) => K): T[]

        findLast(predicate: (value: T, index: number, array: T[]) => unknown): T | undefined

        findLastIndex(predicate: (value: T, index: number, array: T[]) => unknown): number

        countAll(predicate: (value: T, index: number, array: T[]) => unknown): number

        sum<T extends number>(): number

        maxOrUndefined<T extends number>(): number | undefined

        minOrUndefined<T extends number>(): number | undefined

        sumBy(selector: (value: T, index: number, array: T[]) => number): number

        maxByOrUndefined(selector: (v: T, index: number, array: T[]) => number): T | undefined

        minByOrUndefined(selector: (v: T, index: number, array: T[]) => number): T | undefined

        mapToObject<R>(mapper: (v: T, index: number, array: T[]) => [string, R]): DictOf<R>

        mapToSet<R>(mapper: (v: T, index: number, array: T[]) => R): Set<R>

        mapToMap<K, V>(mapper: (v: T, index: number, array: T[]) => [K, V]): Map<K, V>

        intersect(list: Iterable<T> | readonly T[] | Set<T>): T[]

        exclude(list: Iterable<T> | readonly T[] | Set<T>): T[]

        chunk(size: number): T[][]
    }
}

export function compareAny(a: any, b: any): number {
    if (a === b)
        return 0
    return a < b ? -1 : 1
}

((proto) => {
    if (typeof proto.isEmpty !== 'function') {
        proto.isEmpty = function isEmpty<T>(this: T[]) {
            return this.length === 0
        }
    }

    if (typeof proto.isNotEmpty !== 'function') {
        proto.isNotEmpty = function isNotEmpty<T>(this: T[]) {
            return this.length > 0
        }
    }

    if (typeof proto.mapNonNil !== 'function') {
        proto.mapNonNil = function mapNonNil<T, R>(
            this: T[],
            mapper: (v: T, index: number, array: T[]) => R
        ): NonNilOf<R>[] {
            const ret: any[] = []
            const len = this.length
            for (let i = 0; i < len; i++) {
                const r = mapper(this[i], i, this)
                if (r != null) {
                    ret.push(r)
                }
            }
            return ret
        }
    }

    if (typeof proto.reject !== 'function') {
        proto.reject = function reject<T, R>(
            this: T[],
            predicate: (v: T, index: number, array: T[]) => unknown
        ): T[] {
            const ret: T[] = []
            const len = this.length
            for (let i = 0; i < len; i++) {
                const v = this[i]
                if (!predicate(v, i, this)) {
                    ret.push(v)
                }
            }
            return ret
        }
    }

    if (typeof proto.separateWith !== 'function') {
        proto.separateWith = function separateWith<T>(this: T[], separator: T): T[] {
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
        proto.any = function any<T>(
            this: T[],
            predicate: (v: T, index: number, array: T[]) => unknown): boolean {
            const length = this.length
            for (let i = 0; i < length; i++) {
                if (predicate(this[i], i, this))
                    return true
            }
            return false
        }
    }

    if (typeof proto.all !== 'function') {
        proto.all = function all<T>(
            this: T[],
            predicate: (v: T, index: number, array: T[]) => unknown): boolean {
            const length = this.length
            for (let i = 0; i < length; i++) {
                if (!predicate(this[i], i, this))
                    return false
            }
            return true
        }
    }

    if (typeof proto.none !== 'function') {
        proto.none = function none<T>(
            this: T[],
            predicate: (v: T, index: number, array: T[]) => unknown): boolean {
            const length = this.length
            for (let i = 0; i < length; i++) {
                if (predicate(this[i], i, this))
                    return false
            }
            return true
        }
    }

    if (typeof proto.last !== 'function') {
        proto.last = function last<T>(this: T[]): T {
            const length = this.length
            if (length === 0) throw new Error('Array is empty.')
            return this[length - 1]
        }
    }

    if (typeof proto.first !== 'function') {
        proto.first = function first<T>(this: T[]): T {
            if (this.length === 0) throw new Error('Array is empty.')
            return this[0]
        }
    }
    if (typeof proto.second !== 'function') {
        proto.second = function second<T>(this: T[]): T {
            if (this.length < 2) throw new Error('Array is empty.')
            return this[1]
        }
    }

    if (typeof proto.lastOrUndefined !== 'function') {
        proto.lastOrUndefined = function lastOrUndefined<T>(this: T[]): T | undefined {
            return this[this.length - 1]
        }
    }

    if (typeof proto.filterNonNil !== 'function') {
        proto.filterNonNil = function filterNonNil<T>(this: T[]): NonNilOf<T>[] {
            const ret: any[] = []
            for (const v of this) {
                if (v != null) {    // note: DO NOT USE !== operator
                    ret.push(v)
                }
            }
            return ret
        }
    }

    if (typeof proto.removeAllValue !== 'function') {
        proto.removeAllValue = function removeAllValue<T>(this: T[], v: T): boolean {
            let ret = false
            for (let i = this.length - 1; i >= 0; i--) {
                if (this[i] === v) {
                    this.splice(i, 1)
                    ret = true
                }
            }
            return ret
        }
    }

    if (typeof proto.removeFirstValue !== 'function') {
        proto.removeFirstValue = function removeFirstValue<T>(this: T[], v: T): boolean {
            const length = this.length
            for (let i = 0; i < length; i++) {
                if (this[i] === v) {
                    this.splice(i, 1)
                    return true
                }
            }
            return false
        }
    }

    if (typeof proto.removeLastValue !== 'function') {
        proto.removeLastValue = function removeLastValue<T>(this: T[], v: T): boolean {
            for (let i = this.length - 1; i >= 0; i--) {
                if (this[i] === v) {
                    this.splice(i, 1)
                    return true
                }
            }
            return false
        }
    }

    if (typeof proto.removeFirstIf !== 'function') {
        proto.removeFirstIf = function removeFirstIf<T>(
            this: T[],
            predicate: (value: T, index: number, obj: T[]) => unknown
        ): T | undefined {
            const length = this.length
            for (let i = 0; i < length; i++) {
                const v = this[i]
                if (predicate(v, i, this)) {
                    this.splice(i, 1)
                    return v
                }
            }
            return undefined
        }
    }

    if (typeof proto.removeLastIf !== 'function') {
        proto.removeLastIf = function removeLastIf<T>(this: T[], predicate: (value: T, index: number, obj: T[]) => unknown): T | undefined {
            for (let i = this.length - 1; i >= 0; i--) {
                const v = this[i]
                if (predicate(v, i, this)) {
                    this.splice(i, 1)
                    return v
                }
            }
            return undefined
        }
    }

    if (typeof proto.removeAllIf !== 'function') {
        proto.removeAllIf = function removeAllIf<T>(
            this: T[],
            predicate: (value: T, index: number, obj: T[]) => unknown
        ): boolean {
            let ret = false
            for (let i = this.length - 1; i >= 0; i--) {
                const v = this[i]
                if (predicate(v, i, this)) {
                    this.splice(i, 1)
                    ret = true
                }
            }
            return ret
        }
    }

    if (typeof proto.sorted !== 'function') {
        proto.sorted = function sorted<T>(this: T[], compareFn?: (a: T, b: T) => number): T[] {
            if (this.length === 0) {
                return []
            }
            return [...this].sort(compareFn)
        }
    }

    if (typeof proto.sortedDescending !== 'function') {
        proto.sortedDescending = function sortedDescending<T>(
            this: T[],
            compareFn?: (a: T, b: T) => number
        ): T[] {
            if (this.length === 0) {
                return []
            }
            return [...this].sort(compareFn).reverse()
        }
    }

    if (typeof proto.sortedBy !== 'function') {
        proto.sortedBy = function sortedBy<T>(
            this: T[],
            selector: (v: T) => unknown
        ): T[] {
            if (this.length === 0) {
                return []
            }
            return [...this].sort(
                (a, b) => compareAny(selector(a), selector(b))
            )
        }
    }

    if (typeof proto.sortedByDescending !== 'function') {
        proto.sortedByDescending = function sortedByDescending<T>(
            this: T[],
            selector: (v: T) => unknown
        ): T[] {
            if (this.length === 0) {
                return []
            }
            return [...this].sort(
                (a, b) => compareAny(selector(b), selector(a))
            )
        }
    }

    if (typeof proto.mapAsync !== 'function') {
        proto.mapAsync = async function mapAsync<T, R>(
            this: T[],
            parallel: boolean,
            mapper: (v: T) => Promise<R>
        ): Promise<R[]> {
            if (this.length === 0) {
                return []
            }
            if (parallel) {
                return Promise.all(this.map(mapper))
            } else {
                const ret: R[] = []
                for (const v of this) {
                    ret.push(await mapper(v))
                }
                return ret
            }
        }
    }

    if (typeof proto.distinct !== 'function') {
        proto.distinct = function distinct<T>(this: T[]): T[] {
            return Array.from(new Set<T>(this))
        }
    }

    if (typeof proto.distinctBy !== 'function') {
        proto.distinctBy = function distinctBy<T, K>(this: T[], keySelector: (v: T) => K): T[] {
            const ret: T[] = []
            const keys = new Set<K>()
            for (const v of this) {
                const key = keySelector(v)
                if (!keys.has(key)) {
                    ret.push(v)
                    keys.add(key)
                }
            }
            return ret
        }
    }

    if (typeof proto.findLast !== 'function') {
        proto.findLast = function findLast<T, K>(
            this: T[],
            predicate: (value: T, index: number, array: T[]) => unknown
        ): T | undefined {
            for (let i = this.length - 1; i > -1; i--) {
                const v = this[i]
                if (predicate(v, i, this)) {
                    return v
                }
            }
            return undefined
        }
    }

    if (typeof proto.findLastIndex !== 'function') {
        proto.findLastIndex = function findLastIndex<T, K>(
            this: T[],
            predicate: (value: T, index: number, array: T[]) => unknown
        ): number {
            for (let i = this.length - 1; i > -1; i--) {
                if (predicate(this[i], i, this)) {
                    return i
                }
            }
            return -1
        }
    }

    if (typeof proto.countAll !== 'function') {
        proto.countAll = function countAll<T, K>(
            this: T[],
            predicate: (value: T, index: number, array: T[]) => unknown
        ): number {
            let count = 0
            for (let i = this.length - 1; i > -1; i--) {
                if (predicate(this[i], i, this)) {
                    count++
                }
            }
            return count
        }
    }

    if (typeof proto.sum !== 'function') {
        proto.sum = function sum(this: number[]): number {
            let sum = 0
            for (const v of this) {
                sum += v
            }
            return sum
        }
    }

    if (typeof proto.minOrUndefined !== 'function') {
        proto.minOrUndefined = function minOrUndefined(this: number[]): number | undefined {
            return this.length === 0 ? undefined : Math.min(...this)
        }
    }

    if (typeof proto.maxOrUndefined !== 'function') {
        proto.maxOrUndefined = function maxOrUndefined(this: number[]): number | undefined {
            return this.length === 0 ? undefined : Math.max(...this)
        }
    }

    if (typeof proto.sumBy !== 'function') {
        proto.sumBy = function sumBy<T>(
            this: T[],
            selector: (value: T, index: number, obj: T[]) => number
        ): number {
            let sum = 0
            const length = this.length
            for (let i = 0; i < length; i++) {
                sum += selector(this[i], i, this)
            }
            return sum
        }
    }

    if (typeof proto.maxByOrUndefined !== 'function') {
        proto.maxByOrUndefined = function maxByOrUndefined<T>(
            this: T[],
            selector: (value: T, index: number, obj: T[]) => number
        ): number | undefined {
            const length = this.length
            if (length === 0) {
                return undefined
            }
            let max = selector(this[0], 0, this)
            let maxIndex = 0
            for (let i = 1; i < length; i++) {
                const r = selector(this[i], i, this)
                if (r > max) {
                    max = r
                    maxIndex = i
                }
            }
            return max
        }
    }

    if (typeof proto.minByOrUndefined !== 'function') {
        proto.minByOrUndefined = function minByOrUndefined<T>(
            this: T[],
            selector: (value: T, index: number, obj: T[]) => number
        ): number | undefined {
            const length = this.length
            if (length === 0) {
                return undefined
            }
            let min = selector(this[0], 0, this)
            let minIndex = 0
            for (let i = 1; i < length; i++) {
                const key = selector(this[i], i, this)
                if (key < min) {
                    min = key
                    minIndex = i
                }
            }
            return min
        }
    }

    if (typeof proto.mapToObject !== 'function') {
        proto.mapToObject = function mapToObject<T, R>(
            this: T[],
            mapper: (v: T, index: number, array: T[]) => [string, R]
        ): DictOf<R> {
            const ret: DictOf<R> = {}
            const length = this.length
            for (let i = 1; i < length; i++) {
                const [key, v] = mapper(this[i], i, this)
                ret[key] = v
            }
            return ret
        }
    }

    if (typeof proto.mapToSet !== 'function') {
        proto.mapToSet = function mapToSet<T, R>(
            this: T[],
            mapper: (v: T, index: number, array: T[]) => R
        ): Set<R> {
            const ret = new Set<R>()
            const length = this.length
            for (let i = 1; i < length; i++) {
                const r = mapper(this[i], i, this)
                ret.add(r)
            }
            return ret
        }
    }

    if (typeof proto.mapToMap !== 'function') {
        proto.mapToMap = function mapToMap<T, K, V>(
            this: T[],
            mapper: (v: T, index: number, array: T[]) => [K, V]
        ): Map<K, V> {
            const ret = new Map<K, V>()
            const length = this.length
            for (let i = 1; i < length; i++) {
                const [key, v] = mapper(this[i], i, this)
                ret.set(key, v)
            }
            return ret
        }
    }

    if (typeof proto.intersect !== 'function') {
        proto.intersect = function intersect<T>(
            this: T[],
            list: Iterable<T> | readonly T[] | Set<T>
        ): T[] {
            if (this.length === 0) return []
            let set: Set<T>
            if (list instanceof Set) {
                set = list
            } else {
                set = new Set<T>()
                for (const v of list) {
                    set.add(v)
                }
            }
            if (set.size === 0) return [...this]
            return this.filter(v => set.has(v))
        }
    }

    if (typeof proto.exclude !== 'function') {
        proto.exclude = function exclude<T>(
            this: T[],
            list: Iterable<T> | readonly T[] | Set<T>
        ): T[] {
            if (this.length === 0) return []

            let set: Set<T>
            if (list instanceof Set) {
                set = list
            } else {
                set = new Set<T>()
                for (const v of list) {
                    set.add(v)
                }
            }
            if (set.size === 0) return [...this]
            return this.filter(v => !set.has(v))
        }
    }

    if (typeof proto.chunk !== 'function') {
        proto.chunk = function chunk<T>(this: T[], size: number): T[][] {
            const length = this.length
            if (size <= 0 || length === 0)
                return [this]

            const ret: T[][] = []
            for (let i = 0; i < length; i += size) {
                ret.push(this.slice(i, i + size))
            }
            return ret
        }
    }
})(Array.prototype)
