/**
 * Model: Donation
 * Abstraksi query database untuk tabel donations
 */
const db = require('../config/database')
const { insertAndFetch, updateAndFetch } = require('../utils/dbHelpers')

const Donation = {
  /**
   * Ambil list donasi dengan pagination dan filter status
   * @param {object} options - { page, limit, status }
   * @returns {Promise<{data: Array, meta: object}>}
   */
  async findAll({ page = 1, limit = 10, status } = {}) {
    try {
      const offset = (page - 1) * limit
      let query = db('donations').orderBy('created_at', 'desc')

      if (status) {
        query = query.where('status', status)
      }

      const [{ count }] = await db('donations')
        .count('id as count')
        .modify((q) => { if (status) q.where('status', status) })

      const data = await query.limit(limit).offset(offset)

      return {
        data,
        meta: {
          total: parseInt(count),
          page,
          limit,
          total_pages: Math.ceil(parseInt(count) / limit),
        },
      }
    } catch (error) {
      throw new Error(`Donation.findAll gagal: ${error.message}`)
    }
  },

  /**
   * Ambil satu donasi berdasarkan ID
   * @param {number} id - ID donasi
   * @returns {Promise<object|null>}
   */
  async findById(id) {
    try {
      const donation = await db('donations').where({ id }).first()
      return donation || null
    } catch (error) {
      throw new Error(`Donation.findById gagal: ${error.message}`)
    }
  },

  /**
   * Buat donasi baru
   * @param {object} data - Data donasi dari form
   * @returns {Promise<object>} Row donasi yang baru dibuat
   */
  async create(data) {
    try {
      const donation = await insertAndFetch(db, 'donations', {
        ...data,
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      return donation
    } catch (error) {
      throw new Error(`Donation.create gagal: ${error.message}`)
    }
  },

  /**
   * Update status donasi (untuk admin)
   * @param {number} id - ID donasi
   * @param {string} status - Status baru ('confirmed'|'rejected')
   * @param {Date|null} confirmedAt - Waktu konfirmasi (jika status confirmed)
   * @returns {Promise<object>} Row donasi yang diupdate
   */
  async updateStatus(id, status, confirmedAt = null) {
    try {
      const donation = await updateAndFetch(db, 'donations', { id }, {
        status,
        confirmed_at: confirmedAt ? confirmedAt.toISOString() : null,
        updated_at: new Date().toISOString(),
      })
      return donation
    } catch (error) {
      throw new Error(`Donation.updateStatus gagal: ${error.message}`)
    }
  },

  /**
   * Ambil statistik donasi publik
   * Graceful fallback jika tabel beneficiaries belum ada
   * @returns {Promise<{total_amount: number, total_donors: number, total_children: number}>}
   */
  async getPublicStats() {
    try {
      const [{ total }] = await db('donations')
        .sum('amount as total')
        .where('status', 'confirmed')

      const [{ count: donorCount }] = await db('donations')
        .countDistinct('donor_email as count')
        .where('status', 'confirmed')

      // Graceful fallback jika tabel beneficiaries belum ada
      let totalChildren = 250
      try {
        const [{ count }] = await db('beneficiaries')
          .count('id as count')
          .where('is_active', true)
        totalChildren = parseInt(count) || 250
      } catch {
        // tabel belum ada, gunakan nilai default
        totalChildren = 250
      }

      return {
        total_amount: parseInt(total) || 0,
        total_donors: parseInt(donorCount) || 0,
        total_children: totalChildren,
      }
    } catch (error) {
      throw new Error(`Donation.getPublicStats gagal: ${error.message}`)
    }
  },
}

module.exports = Donation
