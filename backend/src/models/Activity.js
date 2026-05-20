/**
 * Model: Activity
 * Abstraksi query database untuk tabel activities
 */
const db = require('../config/database')
const { insertAndFetch, updateAndFetch } = require('../utils/dbHelpers')

const Activity = {
  /**
   * Ambil list kegiatan dengan pagination, filter kategori, dan filter published
   * @param {object} options - { page, limit, category, isPublished }
   * @returns {Promise<{data: Array, meta: object}>}
   */
  async findAll({ page = 1, limit = 9, category, isPublished = true } = {}) {
    try {
      const offset = (page - 1) * limit

      const buildQuery = (q) => {
        if (isPublished !== undefined) q.where('is_published', isPublished)
        if (category && category !== 'all') q.where('category', category)
      }

      const [{ count }] = await db('activities')
        .count('id as count')
        .modify(buildQuery)

      const data = await db('activities')
        .modify(buildQuery)
        .orderBy('activity_date', 'desc')
        .limit(limit)
        .offset(offset)

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
      throw new Error(`Activity.findAll gagal: ${error.message}`)
    }
  },

  /**
   * Ambil satu kegiatan berdasarkan ID (hanya yang published untuk publik)
   * @param {number} id - ID kegiatan
   * @param {boolean} publicOnly - Jika true, hanya return yang is_published=true
   * @returns {Promise<object|null>}
   */
  async findById(id, publicOnly = true) {
    try {
      let query = db('activities').where({ id })
      if (publicOnly) query = query.where('is_published', true)
      const activity = await query.first()
      return activity || null
    } catch (error) {
      throw new Error(`Activity.findById gagal: ${error.message}`)
    }
  },

  /**
   * Buat kegiatan baru
   * @param {object} data - Data kegiatan
   * @returns {Promise<object>} Row kegiatan yang baru dibuat
   */
  async create(data) {
    try {
      const activity = await insertAndFetch(db, 'activities', {
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      return activity
    } catch (error) {
      throw new Error(`Activity.create gagal: ${error.message}`)
    }
  },

  /**
   * Update data kegiatan
   * @param {number} id - ID kegiatan
   * @param {object} data - Data yang akan diupdate
   * @returns {Promise<object>} Row kegiatan yang diupdate
   */
  async update(id, data) {
    try {
      const activity = await updateAndFetch(db, 'activities', { id }, {
        ...data,
        updated_at: new Date().toISOString(),
      })
      return activity
    } catch (error) {
      throw new Error(`Activity.update gagal: ${error.message}`)
    }
  },

  /**
   * Hapus kegiatan (hard delete)
   * @param {number} id - ID kegiatan
   * @returns {Promise<number>} Jumlah row yang dihapus
   */
  async delete(id) {
    try {
      const count = await db('activities').where({ id }).del()
      return count
    } catch (error) {
      throw new Error(`Activity.delete gagal: ${error.message}`)
    }
  },
}

module.exports = Activity
