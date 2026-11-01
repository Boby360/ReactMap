// @ts-check

/**
 * Runs `callback` when the browser is idle (or after `timeout` ms at the
 * latest) so heavy, non-urgent work does not block startup rendering.
 *
 * @param {() => void} callback
 * @param {number} [timeout]
 * @returns {() => void} cancel function, suitable as a `useEffect` cleanup
 */
export function scheduleIdle(callback, timeout = 2000) {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    const handle = window.requestIdleCallback(() => callback(), { timeout })
    return () => window.cancelIdleCallback(handle)
  }
  const handle = setTimeout(callback, 1)
  return () => clearTimeout(handle)
}
