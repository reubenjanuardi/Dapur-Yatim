/**
 * Controller: Contact
 * Handler untuk endpoint formulir kontak
 */
const Contact = require('../models/Contact')
const emailService = require('../services/emailService')
const config = require('../config/env')

/**
 * POST /api/v1/contact
 * Simpan pesan kontak dan kirim notifikasi email ke admin
 */
const send = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body

    // Simpan pesan ke database
    const contact = await Contact.create({ name, email, subject, message })

    // Kirim notifikasi email ke admin (non-blocking)
    emailService.sendContactNotification({
      adminEmail: config.email.adminEmail,
      senderName: name,
      senderEmail: email,
      subject,
      message,
      contactId: contact.id,
    }).catch((err) => console.warn('[Email] Gagal mengirim notifikasi kontak ke admin:', err.message))

    res.json({
      success: true,
      message: 'Pesan Anda berhasil terkirim. Kami akan merespons dalam 1-2 hari kerja.',
      data: {
        id: contact.id,
        name: contact.name,
        subject: contact.subject,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { send }
