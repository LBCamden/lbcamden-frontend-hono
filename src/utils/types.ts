export type ValueOf<T> = T[keyof T]
export type ValueOfArray<T extends unknown[] | undefined> = NonNullable<T>[number]
