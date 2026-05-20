require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')

const routes = require('./routes/index')
const errorHandler = require('./middleware/errorHandler')

const app = express()
const PORT = process.env.PORT || 3001

// ─── Security Middleware ──────────────────────────────────────────
app.use(helmet())
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173'],
  credentials: true,
}))

// ─── Rate Limiting ────────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { success: false, message: 'Terlalu banyak permintaan. Coba lagi nanti.' },
})
app.use('/api', limiter)

// ─── General Middleware ───────────────────────────────────────────
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// ─── Static Files (uploads) ───────────────────────────────────────
app.use('/uploads', express.static(process.env.UPLOAD_PATH || './uploads'))

// ─── API Routes ───────────────────────────────────────────────────
app.use('/api/v1', routes)

// ─── Health Check ─────────────────────────────────────────────────
app.get('/api/v1/health', (req, res) => {
  res.json({
    success: true,
    message: 'LKSA Dapur Yatim API is running',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  })
})

// ─── 404 Handler ──────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint tidak ditemukan.' })
})

// ─── Global Error Handler ─────────────────────────────────────────
app.use(errorHandler)

// ─── Start Server ─────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Server berjalan di http://localhost:${PORT}`)
  console.log(`📚 Environment: ${process.env.NODE_ENV || 'development'}`)
})

module.exports = app
