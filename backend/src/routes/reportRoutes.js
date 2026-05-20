const express = require('express')
const router = express.Router()
const controller = require('../controllers/reportController')

// TODO: Add report routes
router.get('/', controller.getAll)

module.exports = router
