/**
 * Routes: Contact
 * Endpoint publik untuk formulir kontak
 */
const express = require('express')
const router = express.Router()
const contactController = require('../controllers/contactController')
const validateRequest = require('../middleware/validateRequest')
const { createContactSchema } = require('../middleware/validateRequest')

// POST /api/v1/contact — Kirim pesan kontak baru
router.post('/', validateRequest(createContactSchema), contactController.send)

module.exports = router
