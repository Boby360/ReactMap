// @ts-check

/**
 * Wraps an i18next `t` function with a per-call-site cache.
 *
 * The menu filter generators call `t` tens of thousands of times with a small
 * set of repeated keys (types, generations, perms, rarities, ...). Caching the
 * results returns exactly what `t` would, without repeating the lookups.
 *
 * Only calls whose arguments are all primitives are cached.
 *
 * @template {(...args: any[]) => any} T
 * @param {T} t
 * @returns {T}
 */
export function memoizeTranslation(t) {
  const cache = new Map()
  return /** @type {T} */ (
    (...args) => {
      if (args.some((arg) => arg !== null && typeof arg === 'object')) {
        return t(...args)
      }
      const key =
        args.length === 1
          ? `${typeof args[0]}:${args[0]}`
          : args.map((arg) => `${typeof arg}:${arg}`).join('\u0000')
      if (cache.has(key)) return cache.get(key)
      const value = t(...args)
      cache.set(key, value)
      return value
    }
  )
}
