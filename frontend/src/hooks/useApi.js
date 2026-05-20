/**
 * Hook: useApi
 * Generic hook untuk data fetching dengan state management lengkap
 *
 * @example
 * const { data, loading, error, refetch } = useApi(activityApi.getAll, { params: { page: 1 } })
 */
import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * @param {Function} apiFn - Fungsi async API yang akan dipanggil
 * @param {object} options
 * @param {boolean} [options.immediate=true] - Auto-fetch saat mount
 * @param {object} [options.params] - Parameter yang dikirim ke apiFn
 * @param {Function} [options.onSuccess] - Callback saat berhasil
 * @param {Function} [options.onError] - Callback saat error
 * @returns {{ data: any, loading: boolean, error: string|null, refetch: Function, reset: Function }}
 */
export function useApi(apiFn, options = {}) {
  const { immediate = true, params, onSuccess, onError } = options

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(immediate)
  const [error, setError] = useState(null)

  // Ref untuk track apakah component masih mounted (mencegah setState setelah unmount)
  const isMounted = useRef(true)
  // Ref untuk cancel token (jika API mendukung cancel)
  const abortController = useRef(null)

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
      // Abort request yang sedang berjalan
      if (abortController.current) {
        abortController.current.abort()
      }
    }
  }, [])

  const execute = useCallback(
    async (overrideParams) => {
      if (!apiFn) return

      // Abort request sebelumnya jika ada
      if (abortController.current) {
        abortController.current.abort()
      }
      abortController.current = new AbortController()

      setLoading(true)
      setError(null)

      try {
        const callParams = overrideParams !== undefined ? overrideParams : params
        const result = await apiFn(callParams)

        if (!isMounted.current) return

        setData(result)
        if (onSuccess) onSuccess(result)
      } catch (err) {
        if (!isMounted.current) return

        // Abaikan abort error (bukan error nyata)
        if (err.name === 'AbortError') return

        const message = err?.message || 'Terjadi kesalahan. Silakan coba lagi.'
        setError(message)
        if (onError) onError(err)
      } finally {
        if (isMounted.current) setLoading(false)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [apiFn, JSON.stringify(params)]
  )

  // Auto-fetch saat mount jika immediate=true
  useEffect(() => {
    if (immediate) {
      execute()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [immediate, execute])

  /** Reset semua state ke awal */
  const reset = useCallback(() => {
    setData(null)
    setLoading(false)
    setError(null)
  }, [])

  return {
    data,
    loading,
    error,
    refetch: execute,
    reset,
  }
}

export default useApi
