/**
 * Environment Configuration & Validation
 * Memastikan semua ENV yang wajib tersedia saat startup aplikasi
 */
require('dotenv').config()

/**
 * Validasi ENV yang wajib ada
 * Melempar Error jika ada yang missing (mencegah silent failure)
 * @param {string[]} keys - Daftar ENV key yang wajib ada
 */
function requireEnv(keys) {
  const missing = keys.filter((key) => !process.env[key])
  if (missing.length > 0 && process.env.NODE_ENV === 'production') {
    throw new Error(
      `[Config] Environment variable wajib tidak ditemukan: ${missing.join(', ')}\n` +
      'Pastikan file .env sudah dikonfigurasi dengan benar.'
    )
  }
}

// Validasi ENV wajib di production
requireEnv([
  'DB_HOST', 'DB_PORT', 'DB_NAME', 'DB_USER', 'DB_PASSWORD',
  'JWT_SECRET',
])

/**
 * Objek konfigurasi terstruktur yang di-export untuk digunakan di seluruh aplikasi
 */
const config = {
  /** Konfigurasi aplikasi Express */
  app: {
    port: parseInt(process.env.PORT) || 3001,
    env: process.env.NODE_ENV || 'development',
    url: process.env.APP_URL || 'http://localhost:3001',
    allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173'],
  },

  /** Konfigurasi koneksi database PostgreSQL */
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    name: process.env.DB_NAME || 'dapur_yatim_db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
  },

  /** Konfigurasi JWT authentication */
  jwt: {
    secret: process.env.JWT_SECRET || 'dev_secret_change_in_production_min_32_chars',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },

  /** Konfigurasi email (Nodemailer) */
  email: {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || '',
    adminEmail: process.env.ADMIN_EMAIL || process.env.EMAIL_USER || '',
  },

  /** Konfigurasi upload file */
  upload: {
    path: process.env.UPLOAD_PATH || './uploads',
    maxSizeMB: parseInt(process.env.MAX_FILE_SIZE) || 5242880, // 5MB default
  },
}

module.exports = config
