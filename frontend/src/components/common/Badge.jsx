/**
 * Component: Badge
 * Label pill-shaped untuk menampilkan status atau kategori
 */

/** @param {{ children: React.ReactNode, variant?: 'success'|'warning'|'info'|'error'|'neutral', className?: string }} props */
export default function Badge({ children, variant = 'neutral', className = '' }) {
  const variantClasses = {
    success: 'bg-green-100 text-green-800 border border-green-200',
    warning: 'bg-amber-100 text-amber-800 border border-amber-200',
    info: 'bg-blue-100 text-blue-800 border border-blue-200',
    error: 'bg-red-100 text-red-800 border border-red-200',
    neutral: 'bg-surface-container text-on-surface-variant border border-outline-variant',
    // Kategori kegiatan
    education: 'bg-blue-100 text-blue-800 border border-blue-200',
    health: 'bg-green-100 text-green-800 border border-green-200',
    nutrition: 'bg-orange-100 text-orange-800 border border-orange-200',
    social: 'bg-purple-100 text-purple-800 border border-purple-200',
    other: 'bg-gray-100 text-gray-800 border border-gray-200',
  }

  const variantClass = variantClasses[variant] || variantClasses.neutral

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${variantClass} ${className}`}
    >
      {children}
    </span>
  )
}

/**
 * Helper untuk mendapatkan variant badge berdasarkan kategori kegiatan
 * @param {string} category
 * @returns {string}
 */
export function getCategoryVariant(category) {
  const map = {
    education: 'education',
    health: 'health',
    nutrition: 'nutrition',
    social: 'social',
    other: 'other',
  }
  return map[category] || 'neutral'
}

/**
 * Helper label kategori dalam Bahasa Indonesia
 * @param {string} category
 * @returns {string}
 */
export function getCategoryLabel(category) {
  const map = {
    education: 'Pendidikan',
    health: 'Kesehatan',
    nutrition: 'Nutrisi',
    social: 'Sosial',
    other: 'Lainnya',
  }
  return map[category] || category
}

/**
 * Helper untuk status donasi
 * @param {string} status
 * @returns {string}
 */
export function getDonationStatusVariant(status) {
  const map = {
    confirmed: 'success',
    pending: 'warning',
    rejected: 'error',
  }
  return map[status] || 'neutral'
}

/**
 * Helper label status donasi dalam Bahasa Indonesia
 * @param {string} status
 * @returns {string}
 */
export function getDonationStatusLabel(status) {
  const map = {
    confirmed: 'Dikonfirmasi',
    pending: 'Menunggu',
    rejected: 'Ditolak',
  }
  return map[status] || status
}
