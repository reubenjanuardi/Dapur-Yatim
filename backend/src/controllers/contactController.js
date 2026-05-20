const db = require('../config/database')

const getAll = async (req, res, next) => {
  try {
    const data = await db('contacts').select('*').orderBy('created_at', 'desc')
    res.json({ success: true, data })
  } catch (error) {
    next(error)
  }
}

module.exports = { getAll }
