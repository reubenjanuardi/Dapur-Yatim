/**
 * Model: Contact
 * Abstraksi query database untuk tabel contacts menggunakan Supabase JS Client
 */
const supabase = require('../config/supabase')

const Contact = {
  /**
   * Simpan pesan kontak baru
   * @param {object} data - { name, email, subject, message }
   * @returns {Promise<object>} Row kontak yang baru dibuat
   */
  async create(data) {
    try {
      const now = new Date().toISOString()
      const { data: newContact, error } = await supabase
        .from('contacts')
        .insert({
          ...data,
          is_read: false,
          created_at: now,
          updated_at: now,
        })
        .select()
        .single()

      if (error) throw error
      return newContact
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
      const from = (page - 1) * limit
      const to = from + limit - 1

      let query = supabase
        .from('contacts')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })

      if (isRead !== undefined) {
        query = query.eq('is_read', isRead)
      }

      const { data, count, error } = await query.range(from, to)

      if (error) throw error

      return {
        data: data || [],
        meta: {
          total: count || 0,
          page,
          limit,
          total_pages: Math.ceil((count || 0) / limit),
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
      const { data, error } = await supabase
        .from('contacts')
        .update({
          is_read: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      throw new Error(`Contact.markAsRead gagal: ${error.message}`)
    }
  },
}

module.exports = Contact
