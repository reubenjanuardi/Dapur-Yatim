const express = require('express')
const router = express.Router()
const donationController = require('../controllers/donationController')
const validateRequest = require('../middleware/validateRequest')
const { createDonationSchema } = require('../middleware/validateRequest')

// GET /api/v1/donations/stats — Statistik donasi publik
router.get('/stats', donationController.getStats)

// POST /api/v1/donations — Submit donasi baru
router.post('/', validateRequest(createDonationSchema), donationController.create)

module.exports = router
