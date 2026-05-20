const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

const sendDonationConfirmation = async ({ to, donorName, amount, donationId }) => {
  const formatted = new Intl.NumberFormat('id-ID', {
    style: 'currency', currency: 'IDR', minimumFractionDigits: 0
  }).format(amount)

  await transporter.sendMail({
    from: `"LKSA Dapur Yatim" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Konfirmasi Donasi #${donationId} — LKSA Dapur Yatim`,
    html: `
      <h2>Terima kasih, ${donorName}!</h2>
      <p>Donasi Anda sebesar <strong>${formatted}</strong> telah kami terima.</p>
      <p>ID Donasi: <strong>#${donationId}</strong></p>
      <p>Tim kami akan memverifikasi pembayaran Anda dalam 1x24 jam.</p>
      <br/><p>Salam hangat,<br/>Tim LKSA Dapur Yatim</p>
    `,
  })
}

module.exports = { sendDonationConfirmation }
