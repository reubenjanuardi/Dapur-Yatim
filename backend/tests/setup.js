/**
 * Test Setup
 * Konfigurasi database test dan lifecycle hooks untuk Jest
 */
const knex = require('knex')

// Gunakan database terpisah untuk testing
process.env.NODE_ENV = 'test'
process.env.DB_NAME = 'dapur_yatim_test'
process.env.DB_HOST = process.env.DB_HOST || 'localhost'
process.env.DB_USER = process.env.DB_USER || 'postgres'
process.env.DB_PASSWORD = process.env.DB_PASSWORD || ''
process.env.JWT_SECRET = 'test_secret_key_min_32_chars_for_jest'

const knexConfig = require('../knexfile')
const db = knex(knexConfig['test'] || knexConfig['development'])

beforeAll(async () => {
  try {
    // Jalankan migrasi di database test
    await db.migrate.latest()
  } catch (err) {
    console.error('[Test Setup] Gagal menjalankan migrasi:', err.message)
    throw err
  }
})

afterAll(async () => {
  try {
    // Tutup koneksi database
    await db.destroy()
  } catch (err) {
    console.error('[Test Setup] Gagal menutup koneksi:', err.message)
  }
})

module.exports = db
