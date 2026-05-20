/**
 * Model: Donation
 * Abstraksi query database untuk tabel donations menggunakan Supabase JS Client
 */
const supabase = require('../config/supabase')

const Donation = {
  /**
   * Ambil list donasi dengan pagination dan filter status
   * @param {object} options - { page, limit, status }
   * @returns {Promise<{data: Array, meta: object}>}
   */
  async findAll({ page = 1, limit = 10, status } = {}) {
    try {
      const from = (page - 1) * limit
      const to = from + limit - 1

      let query = supabase
        .from('donations')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })

      if (status) {
        query = query.eq('status', status)
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
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        if (error.code === 'PGRST116') return null // Single row not found
        throw error
      }
      return data || null
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
      const now = new Date().toISOString()
      const { data: newDonation, error } = await supabase
        .from('donations')
        .insert({
          ...data,
          status: 'pending',
          created_at: now,
          updated_at: now,
        })
        .select()
        .single()

      if (error) throw error
      return newDonation
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
      const { data, error } = await supabase
        .from('donations')
        .update({
          status,
          confirmed_at: confirmedAt ? confirmedAt.toISOString() : null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      throw new Error(`Donation.updateStatus gagal: ${error.message}`)
    }
  },

  /**
   * Ambil statistik donasi publik
   * @returns {Promise<{total_amount: number, total_donors: number, total_children: number}>}
   */
  async getPublicStats() {
    try {
      // Hitung total sum amount donasi yang confirmed
      // Supabase JS tidak support sum() langsung tanpa rpc atau select custom.
      // Solusi termudah yang andal: select all confirmed amounts
      const { data: donations, error: donError } = await supabase
        .from('donations')
        .select('amount, donor_email')
        .eq('status', 'confirmed')

      if (donError) throw donError

      const totalAmount = donations.reduce((sum, row) => sum + (row.amount || 0), 0)
      
      // Hitung unique donor_email
      const uniqueEmails = new Set(donations.map(row => row.donor_email).filter(Boolean))
      const totalDonors = uniqueEmails.size

      // Ambil beneficiaries count (default fallback: 250)
      let totalChildren = 250
      try {
        const { count, error: benError } = await supabase
          .from('beneficiaries')
          .select('*', { count: 'exact', head: true })
          .eq('is_active', true)

        if (!benError && count !== null) {
          totalChildren = count
        }
      } catch {
        // tabel belum ada, gunakan default
      }

      return {
        total_amount: totalAmount,
        total_donors: totalDonors,
        total_children: totalChildren,
      }
    } catch (error) {
      throw new Error(`Donation.getPublicStats gagal: ${error.message}`)
    }
  },
}

module.exports = Donation
