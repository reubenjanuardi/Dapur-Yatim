const express = require('express')
const router = express.Router()
const controller = require('../controllers/contactController')

// TODO: Add contact routes
router.get('/', controller.getAll)

module.exports = router
