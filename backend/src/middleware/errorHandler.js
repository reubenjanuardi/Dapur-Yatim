/**
 * Global error handler middleware untuk Express.
 * Menangkap semua error yang diteruskan via next(error).
 */
const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.url} —`, err.message)

  // Knex / Database errors
  if (err.code === '23505') {
    return res.status(409).json({
      success: false,
      message: 'Data sudah ada. Pastikan tidak ada duplikasi.',
    })
  }

  if (err.code === '23503') {
    return res.status(400).json({
      success: false,
      message: 'Referensi data tidak ditemukan.',
    })
  }

  // Generic error
  const statusCode = err.statusCode || err.status || 500
  const message =
    process.env.NODE_ENV === 'production' && statusCode === 500
      ? 'Terjadi kesalahan pada server. Silakan coba beberapa saat lagi.'
      : err.message || 'Internal Server Error'

  res.status(statusCode).json({
    success: false,
    message,
  })
}

module.exports = errorHandler
