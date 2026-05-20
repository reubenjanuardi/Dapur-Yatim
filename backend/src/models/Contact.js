/**
 * Model: Contact
 * Abstraksi query database untuk tabel contacts (pesan masuk dari form kontak)
 */
const db = require('../config/database')
const { insertAndFetch, updateAndFetch } = require('../utils/dbHelpers')

const Contact = {
  /**
   * Simpan pesan kontak baru
   * @param {object} data - { name, email, subject, message }
   * @returns {Promise<object>} Row kontak yang baru dibuat
   */
  async create(data) {
    try {
      const contact = await insertAndFetch(db, 'contacts', {
        ...data,
        is_read: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      return contact
    } catch (error) {
      throw new Error(`Contact.create gagal: ${error.message}`)
    }
  },

  /**
   * Ambil list pesan kontak untuk admin dengan pagination
   * @param {object} options - { isRead, page, limit }
   * @returns {Promise<{data: Array, meta: object}>}
   */
  async findAll({ isRead, page = 1, limit = 20 } = {}) {
    try {
      const offset = (page - 1) * limit

      const buildQuery = (q) => {
        if (isRead !== undefined) q.where('is_read', isRead)
      }

      const [{ count }] = await db('contacts')
        .count('id as count')
        .modify(buildQuery)

      const data = await db('contacts')
        .modify(buildQuery)
        .orderBy('created_at', 'desc')
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
      throw new Error(`Contact.findAll gagal: ${error.message}`)
    }
  },

  /**
   * Tandai pesan sebagai sudah dibaca
   * @param {number} id - ID pesan
   * @returns {Promise<object>} Row yang diupdate
   */
  async markAsRead(id) {
    try {
      const contact = await updateAndFetch(db, 'contacts', { id }, {
        is_read: true,
        updated_at: new Date().toISOString(),
      })
      return contact
    } catch (error) {
      throw new Error(`Contact.markAsRead gagal: ${error.message}`)
    }
  },
}

module.exports = Contact
