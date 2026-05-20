/**
 * Controller: Admin
 * Handler untuk autentikasi dan manajemen admin panel
 */
const db = require('../config/database')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config/env')
const Donation = require('../models/Donation')

/**
 * POST /api/v1/admin/login
 * Login admin — verifikasi credential dan return JWT token
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(422).json({
        success: false,
        message: 'Email dan password wajib diisi.',
      })
    }

    // Cari admin berdasarkan email
    const admin = await db('admins')
      .where({ email, is_active: true })
      .first()

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Email atau password salah.',
      })
    }

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, admin.password_hash)
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Email atau password salah.',
      })
    }

    // Update last_login_at
    await db('admins').where({ id: admin.id }).update({ last_login_at: new Date() })

    // Generate JWT token
    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: admin.role, name: admin.name },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    )

    res.json({
      success: true,
      message: 'Login berhasil.',
      data: {
        token,
        admin: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
        },
      },
    })
  } catch (error) {
    next(error)
  }
}

/**
 * GET /api/v1/admin/me
 * Ambil data admin yang sedang login (dari req.admin yang di-attach oleh authMiddleware)
 */
const getMe = async (req, res, next) => {
  try {
    const admin = await db('admins')
      .where({ id: req.admin.id })
      .select('id', 'name', 'email', 'role', 'last_login_at', 'created_at')
      .first()

    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin tidak ditemukan.' })
    }

    res.json({ success: true, data: admin })
  } catch (error) {
    next(error)
  }
}

/**
 * GET /api/v1/admin/donations
 * Ambil list donasi untuk admin (dengan filter dan pagination)
 */
const getDonations = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status } = req.query
    const result = await Donation.findAll({
      page: parseInt(page),
      limit: parseInt(limit),
      status,
    })

    res.json({ success: true, ...result })
  } catch (error) {
    next(error)
  }
}

/**
 * PATCH /api/v1/admin/donations/:id/status
 * Update status donasi (confirmed / rejected)
 */
const updateDonationStatus = async (req, res, next) => {
  try {
    const { id } = req.params
    const { status } = req.body

    if (!['confirmed', 'rejected'].includes(status)) {
      return res.status(422).json({
        success: false,
        message: 'Status tidak valid. Gunakan: confirmed atau rejected.',
      })
    }

    const confirmedAt = status === 'confirmed' ? new Date() : null
    const donation = await Donation.updateStatus(parseInt(id), status, confirmedAt)

    if (!donation) {
      return res.status(404).json({ success: false, message: 'Donasi tidak ditemukan.' })
    }

    res.json({
      success: true,
      message: `Status donasi berhasil diubah menjadi ${status}.`,
      data: donation,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { login, getMe, getDonations, updateDonationStatus }
