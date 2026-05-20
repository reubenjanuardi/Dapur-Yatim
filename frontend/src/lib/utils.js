/**
 * lib/utils.js
 * Fungsi utilitas frontend: format Rupiah, tanggal, className, dll.
 */

/**
 * Format angka ke string Rupiah Indonesia
 * @param {number} amount
 * @returns {string} Contoh: "Rp 1.500.000"
 */
export function formatRupiah(amount) {
  if (!amount && amount !== 0) return 'Rp 0'
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format angka ke string Rupiah singkat
 * @param {number} amount
 * @returns {string} Contoh: "Rp 1,5 Jt" atau "Rp 1,2 M"
 */
export function formatRupiahShort(amount) {
  if (!amount && amount !== 0) return 'Rp 0'

  if (amount >= 1_000_000_000) {
    const val = (amount / 1_000_000_000).toFixed(1).replace('.', ',')
    return `Rp ${val} M`
  }

  if (amount >= 1_000_000) {
    const val = (amount / 1_000_000).toFixed(1).replace('.', ',')
    return `Rp ${val} Jt`
  }

  if (amount >= 1_000) {
    const val = (amount / 1_000).toFixed(0)
    return `Rp ${val} Rb`
  }

  return `Rp ${amount}`
}

/** Nama bulan dalam Bahasa Indonesia */
const BULAN_ID = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
]

/**
 * Format tanggal ke format Indonesia
 * @param {string|Date} dateString
 * @param {'full'|'short'|'month-year'} format
 * @returns {string} Contoh: "10 Januari 2024" atau "Jan 2024"
 */
export function formatDate(dateString, format = 'full') {
  if (!dateString) return '-'
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return '-'

  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()

  switch (format) {
    case 'short':
      return `${String(day).padStart(2, '0')} ${BULAN_ID[month].slice(0, 3)} ${year}`
    case 'month-year':
      return `${BULAN_ID[month]} ${year}`
    case 'month-short':
      return BULAN_ID[month].slice(0, 3)
    default:
      return `${day} ${BULAN_ID[month]} ${year}`
  }
}

/**
 * Nama bulan berdasarkan nomor (1-12)
 * @param {number} monthNumber - 1-12
 * @returns {string}
 */
export function getMonthName(monthNumber) {
  return BULAN_ID[(monthNumber - 1) % 12]
}

/**
 * Gabungkan className secara kondisional (clsx-style, tanpa library)
 * @param {...(string|boolean|null|undefined)} classes
 * @returns {string}
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Potong teks dan tambahkan "..." jika melebihi maxLength
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export function truncate(text, maxLength = 100) {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '...'
}

/**
 * Huruf pertama kata kapital
 * @param {string} str
 * @returns {string}
 */
export function capitalizeFirst(str) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Parse angka dari string (untuk input Rupiah)
 * @param {string} str
 * @returns {number}
 */
export function parseNumber(str) {
  if (typeof str === 'number') return str
  const cleaned = String(str).replace(/[^0-9]/g, '')
  return parseInt(cleaned) || 0
}

/**
 * Delay/sleep (untuk UI loading simulation)
 * @param {number} ms
 * @returns {Promise<void>}
 */
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
