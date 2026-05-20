/**
 * Controller: Donation
 * Handler untuk endpoint donasi
 */
const Donation = require('../models/Donation')
const emailService = require('../services/emailService')
const paymentService = require('../services/paymentService')

/**
 * GET /api/v1/donations/stats
 * Statistik donasi yang dapat diakses publik
 */
const getStats = async (req, res, next) => {
  try {
    const stats = await Donation.getPublicStats()
    res.json({ success: true, data: stats })
  } catch (error) {
    next(error)
  }
}

/**
 * POST /api/v1/donations
 * Submit donasi baru dari calon donatur
 */
const create = async (req, res, next) => {
  try {
    const { donor_name, donor_email, donor_phone, amount, payment_method, message } = req.body

    const donation = await Donation.create({
      donor_name,
      donor_email,
      donor_phone: donor_phone || null,
      amount,
      payment_method,
      message: message || null,
    })

    // Generate instruksi pembayaran sesuai metode
    const paymentInstruction = paymentService.generatePaymentInstruction({
      paymentMethod: payment_method,
      amount,
    })

    // Kirim email konfirmasi (non-blocking — error email tidak menggagalkan donasi)
    emailService.sendDonationConfirmation({
      to: donor_email,
      donorName: donor_name,
      amount,
      donationId: donation.id,
    }).catch((err) => console.warn('[Email] Gagal mengirim konfirmasi donasi:', err.message))

    res.status(201).json({
      success: true,
      message: 'Donasi berhasil disubmit. Silakan selesaikan pembayaran sesuai instruksi.',
      data: {
        ...donation,
        payment_instruction: paymentInstruction,
      },
    })
  } catch (error) {
    next(error)
  }
}

/**
 * GET /api/v1/donations (Admin only)
 * Ambil list semua donasi dengan filter dan pagination
 */
const getAll = async (req, res, next) => {
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
 * PATCH /api/v1/admin/donations/:id/status (Admin only)
 * Update status donasi
 */
const updateStatus = async (req, res, next) => {
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

module.exports = { getStats, create, getAll, updateStatus }
