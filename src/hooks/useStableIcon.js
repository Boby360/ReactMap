// @ts-check
import { useRef } from 'react'

/**
 * @param {Record<string, unknown>} options
 * @returns {string | null}
 */
function getIconKey(options) {
  if (options.html && typeof options.html !== 'string') return null
  return JSON.stringify(options)
}

/**
 * Marker icon builders return a new Leaflet icon on every render. When the
 * `icon` prop identity changes, react-leaflet calls `marker.setIcon()`, which
 * throws away the marker's DOM and rebuilds it from the HTML string.
 *
 * This hook returns the previous icon instance when the new one has identical
 * options, so markers are only rebuilt when their appearance actually changes.
 *
 * @template {import('leaflet').Icon | import('leaflet').DivIcon} T
 * @param {T} icon
 * @returns {T}
 */
export function useStableIcon(icon) {
  const ref = useRef(
    /** @type {{ icon: T, key: string | null, ctor: Function } | null} */ (
      null
    ),
  )
  const key = getIconKey(/** @type {Record<string, unknown>} */ (icon.options))
  const prev = ref.current
  if (
    prev &&
    key !== null &&
    prev.key === key &&
    prev.ctor === icon.constructor
  ) {
    return prev.icon
  }
  ref.current = { icon, key, ctor: icon.constructor }
  return icon
}
