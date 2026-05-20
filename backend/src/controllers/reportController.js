/**
 * Controller: Report
 * Handler untuk endpoint laporan keuangan
 */
const Report = require('../models/Report')

/**
 * GET /api/v1/reports
 * Ambil list laporan keuangan (filter opsional berdasarkan tahun)
 */
const getAll = async (req, res, next) => {
  try {
    const { year } = req.query
    const data = await Report.findAll({
      year: year ? parseInt(year) : undefined,
      isPublished: true,
    })

    res.json({ success: true, data })
  } catch (error) {
    next(error)
  }
}

/**
 * GET /api/v1/reports/summary
 * Ambil ringkasan keuangan per bulan untuk chart transparansi
 * Param: ?year=2024
 */
const getSummary = async (req, res, next) => {
  try {
    const { year } = req.query
    const currentYear = new Date().getFullYear()
    const targetYear = year ? parseInt(year) : currentYear

    const [summary, availableYears] = await Promise.all([
      Report.getSummaryByYear(targetYear),
      Report.getAvailableYears(),
    ])

    res.json({
      success: true,
      data: {
        year: targetYear,
        available_years: availableYears,
        monthly_summary: summary,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { getAll, getSummary }
