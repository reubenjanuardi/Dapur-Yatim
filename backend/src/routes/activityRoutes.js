const express = require('express')
const router = express.Router()
const controller = require('../controllers/activityController')

// TODO: Add activity routes
router.get('/', controller.getAll)

module.exports = router
