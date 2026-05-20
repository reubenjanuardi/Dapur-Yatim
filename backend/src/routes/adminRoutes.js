/**
 * Routes: Admin
 * Endpoint untuk admin panel (login publik, dashboard protected)
 */
const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')
const authMiddleware = require('../middleware/authMiddleware')

// POST /api/v1/admin/login — Login admin (publik)
router.post('/login', adminController.login)

// GET /api/v1/admin/me — Data admin yang sedang login (protected)
router.get('/me', authMiddleware, adminController.getMe)

// GET /api/v1/admin/donations — List donasi untuk admin (protected)
router.get('/donations', authMiddleware, adminController.getDonations)

// PATCH /api/v1/admin/donations/:id/status — Update status donasi (protected)
router.patch('/donations/:id/status', authMiddleware, adminController.updateDonationStatus)

module.exports = router
