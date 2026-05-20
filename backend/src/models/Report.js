/**
 * Model: Report
 * Abstraksi query database untuk tabel financial_reports
 */
const db = require('../config/database')
const { insertAndFetch } = require('../utils/dbHelpers')

const Report = {
  /**
   * Ambil list laporan keuangan dengan filter tahun
   * @param {object} options - { year, isPublished }
   * @returns {Promise<Array>}
   */
  async findAll({ year, isPublished = true } = {}) {
    try {
      let query = db('financial_reports')

      if (isPublished !== undefined) {
        query = query.where('is_published', isPublished)
      }

      if (year) {
        query = query.where('report_year', year)
      }

      const data = await query.orderBy('report_year', 'desc').orderBy('report_month', 'desc')
      return data
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
      const report = await db('financial_reports').where({ id }).first()
      return report || null
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
      const report = await insertAndFetch(db, 'financial_reports', {
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      return report
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
      const reports = await db('financial_reports')
        .where({ report_year: year, is_published: true })
        .select(
          'report_month as month',
          'total_income as income',
          'total_expense as expense',
          db.raw('(total_income - total_expense) as surplus')
        )
        .orderBy('report_month', 'asc')

      return reports
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
      const rows = await db('financial_reports')
        .distinct('report_year')
        .where('is_published', true)
        .orderBy('report_year', 'desc')
      return rows.map((r) => r.report_year)
    } catch (error) {
      throw new Error(`Report.getAvailableYears gagal: ${error.message}`)
    }
  },
}

module.exports = Report
