/**
 * Utils: formatCurrency
 * Fungsi utilitas untuk format angka Rupiah Indonesia
 */

/**
 * Format angka ke string Rupiah lengkap
 * @param {number} amount - Jumlah dalam Rupiah
 * @returns {string} Contoh: "Rp 1.500.000"
 */
function formatRupiah(amount) {
  if (!amount && amount !== 0) return 'Rp 0'
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format angka ke string Rupiah singkat (untuk display dashboard)
 * @param {number} amount - Jumlah dalam Rupiah
 * @returns {string} Contoh: "Rp 1,5 Jt" atau "Rp 1,2 M"
 */
function formatRupiahShort(amount) {
  if (!amount && amount !== 0) return 'Rp 0'

  if (amount >= 1_000_000_000) {
    const val = (amount / 1_000_000_000).toFixed(1)
    return `Rp ${val} M`
  }

  if (amount >= 1_000_000) {
    const val = (amount / 1_000_000).toFixed(1)
    return `Rp ${val} Jt`
  }

  if (amount >= 1_000) {
    const val = (amount / 1_000).toFixed(0)
    return `Rp ${val} Rb`
  }

  return `Rp ${amount}`
}

/**
 * Parse string Rupiah kembali ke integer
 * @param {string} str - Contoh: "Rp 1.500.000" atau "1500000"
 * @returns {number}
 */
function parseRupiah(str) {
  if (typeof str === 'number') return str
  const cleaned = str.replace(/[^0-9]/g, '')
  return parseInt(cleaned) || 0
}

module.exports = { formatRupiah, formatRupiahShort, parseRupiah }
