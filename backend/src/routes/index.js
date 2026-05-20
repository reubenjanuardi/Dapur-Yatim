const express = require('express')
const router = express.Router()

const donationRoutes = require('./donationRoutes')
const activityRoutes = require('./activityRoutes')
const reportRoutes = require('./reportRoutes')
const contactRoutes = require('./contactRoutes')

router.use('/donations', donationRoutes)
router.use('/activities', activityRoutes)
router.use('/reports', reportRoutes)
router.use('/contact', contactRoutes)

module.exports = router
