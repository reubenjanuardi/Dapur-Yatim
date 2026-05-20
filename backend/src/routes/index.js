const express = require('express')
const router = express.Router()

const donationRoutes = require('./donationRoutes')
const activityRoutes = require('./activityRoutes')
const reportRoutes = require('./reportRoutes')
const contactRoutes = require('./contactRoutes')
const adminRoutes = require('./adminRoutes')

router.use('/donations', donationRoutes)
router.use('/activities', activityRoutes)
router.use('/reports', reportRoutes)
router.use('/contact', contactRoutes)
router.use('/admin', adminRoutes)

module.exports = router
