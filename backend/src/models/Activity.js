/**
 * Model: Activity
 * Abstraksi query database untuk tabel activities menggunakan Supabase JS Client
 */
const supabase = require('../config/supabase')

const Activity = {
  /**
   * Ambil list kegiatan dengan pagination, filter kategori, dan filter published
   * @param {object} options - { page, limit, category, isPublished }
   * @returns {Promise<{data: Array, meta: object}>}
   */
  async findAll({ page = 1, limit = 9, category, isPublished = true } = {}) {
    try {
      const from = (page - 1) * limit
      const to = from + limit - 1

      let query = supabase
        .from('activities')
        .select('*', { count: 'exact' })
        .order('activity_date', { ascending: false })

      if (isPublished !== undefined) {
        query = query.eq('is_published', isPublished)
      }

      if (category && category !== 'all') {
        query = query.eq('category', category)
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
      let query = supabase
        .from('activities')
        .select('*')
        .eq('id', id)

      if (publicOnly) {
        query = query.eq('is_published', true)
      }

      const { data, error } = await query.single()

      if (error) {
        if (error.code === 'PGRST116') return null // Single row not found
        throw error
      }
      return data || null
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
      const now = new Date().toISOString()
      const { data: newActivity, error } = await supabase
        .from('activities')
        .insert({
          ...data,
          created_at: now,
          updated_at: now,
        })
        .select()
        .single()

      if (error) throw error
      return newActivity
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
      const { data: updatedActivity, error } = await supabase
        .from('activities')
        .update({
          ...data,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return updatedActivity
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
      const { error } = await supabase
        .from('activities')
        .delete()
        .eq('id', id)

      if (error) throw error
      return 1 // return count of deleted row
    } catch (error) {
      throw new Error(`Activity.delete gagal: ${error.message}`)
    }
  },
}

module.exports = Activity
