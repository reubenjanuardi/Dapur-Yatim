/**
 * Routes: Report
 * Endpoint publik untuk laporan keuangan
 */
const express = require('express')
const router = express.Router()
const reportController = require('../controllers/reportController')

// GET /api/v1/reports — List laporan keuangan (opsional filter ?year=2024)
router.get('/', reportController.getAll)

// GET /api/v1/reports/summary — Ringkasan per bulan untuk chart (?year=2024)
router.get('/summary', reportController.getSummary)

module.exports = router
