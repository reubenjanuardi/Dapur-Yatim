const db = require('../config/database')
const emailService = require('../services/emailService')

/**
 * GET /api/v1/donations/stats
 * Statistik donasi yang dapat diakses publik
 */
const getStats = async (req, res, next) => {
  try {
    const [totalAmount] = await db('donations')
      .sum('amount as total')
      .where('status', 'confirmed')

    const [totalDonors] = await db('donations')
      .countDistinct('donor_email as count')
      .where('status', 'confirmed')

    const [totalChildren] = await db('beneficiaries')
      .count('id as count')
      .where('is_active', true)

    res.json({
      success: true,
      data: {
        total_amount: parseInt(totalAmount.total) || 0,
        total_donors: parseInt(totalDonors.count) || 0,
        total_children: parseInt(totalChildren.count) || 0,
      },
    })
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

    const [donation] = await db('donations')
      .insert({
        donor_name,
        donor_email,
        donor_phone,
        amount,
        payment_method,
        message: message || null,
        status: 'pending',
        created_at: new Date(),
      })
      .returning(['id', 'donor_name', 'amount', 'payment_method', 'status', 'created_at'])

    // Kirim email konfirmasi
    await emailService.sendDonationConfirmation({
      to: donor_email,
      donorName: donor_name,
      amount,
      donationId: donation.id,
    }).catch((err) => console.warn('Email gagal dikirim:', err.message))

    res.status(201).json({
      success: true,
      message: 'Donasi berhasil disubmit. Kami akan mengirimkan konfirmasi ke email Anda.',
      data: donation,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { getStats, create }
