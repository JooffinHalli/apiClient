type PickByMethod<O, M extends string> = {
    [K in keyof O as O[K] extends Record<M, unknown> ? K : never]: (
        O[K] extends Record<M, infer X> ? X : never
    )
}

type ToFn<T> = <U extends keyof T>(
    url: U,
    ...options: (
        Partial<Omit<T[U], 'res'>> extends Omit<T[U], 'res'> // is optional?
            ? [{ [K in keyof T[U] as K extends 'res' ? never : K]: T[U][K] }?] // Omit<T[U], 'res'>?
            : [{ [K in keyof T[U] as K extends 'res' ? never : K]: T[U][K] } ] // Omit<T[U], 'res'>
    )
) => Promise<T[U] extends { 'res': infer R } ? R : unknown>

export type ApiMethod<P, M extends string> = ToFn<PickByMethod<P, M>>

