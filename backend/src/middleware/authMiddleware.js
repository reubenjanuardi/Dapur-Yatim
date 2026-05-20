/**
 * Middleware: Auth (JWT Verification)
 * Memverifikasi JWT token dari header Authorization: Bearer <token>
 * Attach req.admin dengan payload token jika valid
 */
const jwt = require('jsonwebtoken')
const config = require('../config/env')

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Akses ditolak. Token autentikasi tidak ditemukan.',
    })
  }

  const token = authHeader.slice(7) // Hapus "Bearer " prefix

  try {
    const decoded = jwt.verify(token, config.jwt.secret)
    req.admin = decoded // { id, email, role, name, iat, exp }
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Sesi telah berakhir. Silakan login kembali.',
      })
    }

    return res.status(401).json({
      success: false,
      message: 'Token tidak valid. Silakan login kembali.',
    })
  }
}

module.exports = authMiddleware
