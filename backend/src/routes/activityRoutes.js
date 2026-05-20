/**
 * Routes: Activity
 * Endpoint publik untuk kegiatan lembaga
 */
const express = require('express')
const router = express.Router()
const activityController = require('../controllers/activityController')

// GET /api/v1/activities — List kegiatan dengan pagination dan filter kategori
router.get('/', activityController.getAll)

// GET /api/v1/activities/:id — Detail satu kegiatan (hanya yang published)
router.get('/:id', activityController.getById)

module.exports = router
