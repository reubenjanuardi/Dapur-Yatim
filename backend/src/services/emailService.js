/**
 * Service: Email
 * Konfigurasi Nodemailer dan fungsi-fungsi pengiriman email
 */
const nodemailer = require('nodemailer')

/** Buat transporter Nodemailer dari ENV config */
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

/**
 * Format angka ke Rupiah Indonesia
 * @param {number} amount
 * @returns {string}
 */
function formatRupiah(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount)
}

/**
 * Kirim email konfirmasi donasi ke donatur
 * @param {{ to: string, donorName: string, amount: number, donationId: number }} params
 */
const sendDonationConfirmation = async ({ to, donorName, amount, donationId }) => {
  const formatted = formatRupiah(amount)

  await transporter.sendMail({
    from: `"LKSA Dapur Yatim" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Konfirmasi Donasi #${donationId} — LKSA Dapur Yatim`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #005DAC; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">🍽️ LKSA Dapur Yatim</h1>
        </div>
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px;">
          <h2 style="color: #191C1E;">Terima kasih, ${donorName}! 🎉</h2>
          <p style="color: #414752; line-height: 1.6;">
            Donasi Anda sebesar <strong style="color: #005DAC;">${formatted}</strong> telah kami terima
            dan sedang dalam proses verifikasi.
          </p>
          <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #005DAC; margin: 20px 0;">
            <p style="margin: 0; color: #414752;">
              <strong>ID Donasi:</strong> #${donationId}<br>
              <strong>Jumlah:</strong> ${formatted}<br>
              <strong>Status:</strong> Menunggu Konfirmasi
            </p>
          </div>
          <p style="color: #414752; line-height: 1.6;">
            Tim kami akan memverifikasi pembayaran Anda dalam <strong>1×24 jam</strong>.
            Simpan ID donasi Anda sebagai bukti transaksi.
          </p>
          <p style="color: #414752;">
            Semoga amal baik Anda menjadi berkah bagi anak-anak yatim yang kami layani. 🤲
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #717783; font-size: 12px; text-align: center;">
            LKSA Dapur Yatim | Bandung, Jawa Barat<br>
            Email: info@dapuryatim.org | WhatsApp: +62 812-3456-7890
          </p>
        </div>
      </div>
    `,
  })
}

/**
 * Kirim notifikasi email ke admin saat ada pesan kontak masuk
 * @param {{ adminEmail: string, senderName: string, senderEmail: string, subject: string, message: string, contactId: number }} params
 */
const sendContactNotification = async ({
  adminEmail,
  senderName,
  senderEmail,
  subject,
  message,
  contactId,
}) => {
  if (!adminEmail) {
    console.warn('[Email] ADMIN_EMAIL tidak dikonfigurasi — notifikasi kontak dilewati.')
    return
  }

  await transporter.sendMail({
    from: `"LKSA Dapur Yatim System" <${process.env.EMAIL_USER}>`,
    to: adminEmail,
    replyTo: senderEmail,
    subject: `[Pesan Kontak #${contactId}] ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #006E1C; padding: 20px; border-radius: 8px 8px 0 0;">
          <h2 style="color: white; margin: 0; font-size: 18px;">📬 Pesan Kontak Baru Masuk</h2>
          <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0; font-size: 14px;">ID Pesan: #${contactId}</p>
        </div>
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #717783; width: 120px;"><strong>Pengirim:</strong></td>
              <td style="padding: 8px 0; color: #191C1E;">${senderName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #717783;"><strong>Email:</strong></td>
              <td style="padding: 8px 0; color: #191C1E;"><a href="mailto:${senderEmail}">${senderEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #717783;"><strong>Subjek:</strong></td>
              <td style="padding: 8px 0; color: #191C1E;">${subject}</td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 16px 0;">
          <h3 style="color: #191C1E; margin: 0 0 8px;">Isi Pesan:</h3>
          <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #eee;">
            <p style="margin: 0; color: #414752; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 20px; color: #717783; font-size: 12px;">
            Balas langsung ke email ini untuk merespons pengirim.<br>
            Sistem LKSA Dapur Yatim — ${new Date().toLocaleString('id-ID')}
          </p>
        </div>
      </div>
    `,
  })
}

module.exports = { sendDonationConfirmation, sendContactNotification }
