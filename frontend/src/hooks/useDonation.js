/**
 * Hook: useDonation
 * State management khusus untuk proses submit form donasi
 *
 * @example
 * const { submit, loading, error, success, donationResult, reset } = useDonation()
 */
import { useState, useCallback } from 'react'
import { donationApi } from '../lib/api'

/**
 * @returns {{
 *   submit: (formData: object) => Promise<void>,
 *   loading: boolean,
 *   error: string|null,
 *   success: boolean,
 *   donationResult: object|null,
 *   reset: () => void
 * }}
 */
export function useDonation() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  /** Menyimpan data donasi setelah berhasil (termasuk instruksi pembayaran) */
  const [donationResult, setDonationResult] = useState(null)

  /**
   * Submit form donasi ke API
   * @param {object} formData - Data dari form donasi
   */
  const submit = useCallback(async (formData) => {
    setLoading(true)
    setError(null)

    try {
      const result = await donationApi.create(formData)

      setDonationResult(result.data)
      setSuccess(true)
    } catch (err) {
      const message = err?.message || 'Gagal mengirim donasi. Silakan coba lagi.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [])

  /** Reset state ke kondisi awal (untuk mulai donasi baru) */
  const reset = useCallback(() => {
    setLoading(false)
    setError(null)
    setSuccess(false)
    setDonationResult(null)
  }, [])

  return {
    submit,
    loading,
    error,
    success,
    donationResult,
    reset,
  }
}

export default useDonation
