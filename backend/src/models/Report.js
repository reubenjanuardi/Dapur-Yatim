/**
 * Model: Report
 * Abstraksi query database untuk tabel financial_reports menggunakan Supabase JS Client
 */
const supabase = require('../config/supabase')

const Report = {
  /**
   * Ambil list laporan keuangan dengan filter tahun
   * @param {object} options - { year, isPublished }
   * @returns {Promise<Array>}
   */
  async findAll({ year, isPublished = true } = {}) {
    try {
      let query = supabase
        .from('financial_reports')
        .select('*')
        .order('report_year', { ascending: false })
        .order('report_month', { ascending: false })

      if (isPublished !== undefined) {
        query = query.eq('is_published', isPublished)
      }

      if (year) {
        query = query.eq('report_year', year)
      }

      const { data, error } = await query

      if (error) throw error
      return data || []
    } catch (error) {
      throw new Error(`Report.findAll gagal: ${error.message}`)
    }
  },

  /**
   * Ambil satu laporan keuangan berdasarkan ID
   * @param {number} id - ID laporan
   * @returns {Promise<object|null>}
   */
  async findById(id) {
    try {
      const { data, error } = await supabase
        .from('financial_reports')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        if (error.code === 'PGRST116') return null // Single row not found
        throw error
      }
      return data || null
    } catch (error) {
      throw new Error(`Report.findById gagal: ${error.message}`)
    }
  },

  /**
   * Buat laporan keuangan baru
   * @param {object} data - Data laporan
   * @returns {Promise<object>} Row laporan yang baru dibuat
   */
  async create(data) {
    try {
      const now = new Date().toISOString()
      const { data: newReport, error } = await supabase
        .from('financial_reports')
        .insert({
          ...data,
          created_at: now,
          updated_at: now,
        })
        .select()
        .single()

      if (error) throw error
      return newReport
    } catch (error) {
      throw new Error(`Report.create gagal: ${error.message}`)
    }
  },

  /**
   * Ambil ringkasan keuangan per bulan untuk tahun tertentu
   * Digunakan untuk chart di halaman transparansi
   * @param {number} year - Tahun laporan
   * @returns {Promise<Array>} Array per bulan: { month, income, expense, surplus }
   */
  async getSummaryByYear(year) {
    try {
      const { data, error } = await supabase
        .from('financial_reports')
        .select('report_month, total_income, total_expense')
        .eq('report_year', year)
        .eq('is_published', true)
        .order('report_month', { ascending: true })

      if (error) throw error

      return (data || []).map((row) => ({
        month: row.report_month,
        income: row.total_income,
        expense: row.total_expense,
        surplus: row.total_income - row.total_expense,
      }))
    } catch (error) {
      throw new Error(`Report.getSummaryByYear gagal: ${error.message}`)
    }
  },

  /**
   * Ambil daftar tahun yang tersedia dalam laporan
   * @returns {Promise<number[]>}
   */
  async getAvailableYears() {
    try {
      const { data, error } = await supabase
        .from('financial_reports')
        .select('report_year')
        .eq('is_published', true)
        .order('report_year', { ascending: false })

      if (error) throw error

      // Ambil distinct years dari data hasil fetch
      const years = Array.from(new Set((data || []).map((row) => row.report_year)))
      return years
    } catch (error) {
      throw new Error(`Report.getAvailableYears gagal: ${error.message}`)
    }
  },
}

module.exports = Report
