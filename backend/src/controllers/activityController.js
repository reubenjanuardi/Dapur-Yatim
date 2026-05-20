/**
 * Controller: Activity
 * Handler untuk endpoint kegiatan lembaga
 */
const Activity = require('../models/Activity')

/**
 * GET /api/v1/activities
 * Ambil list kegiatan dengan filter dan pagination
 */
const getAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 9, category } = req.query

    const result = await Activity.findAll({
      page: parseInt(page),
      limit: parseInt(limit),
      category,
      isPublished: true,
    })

    res.json({
      success: true,
      data: result.data,
      meta: result.meta,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * GET /api/v1/activities/:id
 * Ambil detail satu kegiatan (hanya yang sudah dipublikasikan)
 */
const getById = async (req, res, next) => {
  try {
    const { id } = req.params
    const activity = await Activity.findById(parseInt(id), true)

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Kegiatan tidak ditemukan atau belum dipublikasikan.',
      })
    }

    res.json({ success: true, data: activity })
  } catch (error) {
    next(error)
  }
}

module.exports = { getAll, getById }
