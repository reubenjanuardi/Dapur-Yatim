/**
 * Service: Payment (Placeholder)
 * Generator instruksi pembayaran berdasarkan metode yang dipilih donatur
 *
 * @note Ini adalah placeholder service. Untuk integrasi ke payment gateway nyata:
 *   - Midtrans: gunakan @midtrans/midtrans-client dan ganti generatePaymentInstruction
 *     dengan call ke Midtrans Snap API atau Core API
 *   - Xendit: gunakan xendit-node dan integrasikan ke Xendit Invoice API
 *   - Pastiikan menyimpan payment_id dari gateway ke tabel donations
 */

/**
 * CRC16 CCITT
 */
function crc16(input) {
  let crc = 0xffff
  for (let i = 0; i < input.length; i++) {
    crc ^= input.charCodeAt(i) << 8
    for (let j = 0; j < 8; j++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1
    }
  }
  return (crc & 0xffff).toString(16).toUpperCase().padStart(4, '0')
}

/**
 * Pad length to 2 digits
 */
function pad2(n) {
  return n < 10 ? '0' + n : String(n)
}

/**
 * Generate QRIS dinamis dari QRIS statis + nominal
 * @param {string} qrisStatic - QRIS static string
 * @param {number} amount - nominal pembayaran
 * @returns {string} QRIS payload dinamis
 */
function generateDynamicQris(qrisStatic, amount) {
  if (!qrisStatic || !amount || amount <= 0) {
    throw new Error('QRIS static atau amount tidak valid')
  }

  // 1️ Switch static → dynamic (010211 → 010212)
  let q = qrisStatic.slice(0, -4).replace('010211', '010212')

  // 2️⃣ Split sebelum country code
  const parts = q.split('5802ID')
  if (parts.length !== 2) {
    throw new Error('Format QRIS tidak valid')
  }

  // 3️⃣ Inject amount (tag 54)
  const amountStr = String(amount)
  q = parts[0] + '54' + pad2(amountStr.length) + amountStr + '5802ID' + parts[1]

  // 4️ Append CRC
  return q + crc16(q)
}

// QRIS statis Dapur Yatim
const QRIS_STATIC = '00020101021126690021ID.CO.BANKMANDIRI.WWW01189360000801908076490211719080764960303UMI51440014ID.CO.QRIS.WWW0215ID10254387794600303UMI5204549953033605802ID5921Dapur Yatim Indonesia6013Bandung (Kab)61054037562070703A016304F2D0'

/**
 * Generate instruksi pembayaran sesuai metode yang dipilih
 * @param {{ paymentMethod: string, amount: number }} params
 * @returns {object} Instruksi pembayaran
 */
function generatePaymentInstruction({ paymentMethod, amount }) {
  const expiredAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 jam dari sekarang

  switch (paymentMethod) {
    case 'bank_transfer':
      return {
        type: 'bank_transfer',
        banks: [
          {
            name: 'BRI',
            account_number: '0895-01-037286-53-5',
            account_name: 'DAPUR YATIM INDONESIA',
          },
          {
            name: 'BJB',
            account_number: '01222-3986-1100',
            account_name: 'DAPUR YATIM INDONESIA',
          },
          {
            name: 'Mandiri',
            account_number: '130-00-1442878-6',
            account_name: 'DAPUR YATIM INDONESIA',
          },
        ],
        amount,
        note: `Transfer tepat sebesar Rp ${amount.toLocaleString('id-ID')} ke salah satu rekening di atas.`,
        expired_at: expiredAt.toISOString(),
      }

    case 'qris':
      return {
        type: 'qris',
        qris_url: 'https://placehold.co/300x300/005DAC/white?text=QRIS+Dapur+Yatim',
        qris_string: generateDynamicQris(QRIS_STATIC, amount),
        amount,
        expired_at: expiredAt.toISOString(),
        note: 'Scan QR Code di atas menggunakan aplikasi e-wallet atau mobile banking Anda. Nominal sudah terisi otomatis.',
      }

    default:
      return {
        type: 'unknown',
        note: 'Metode pembayaran tidak dikenali. Hubungi admin untuk bantuan.',
      }
  }
}

module.exports = { generatePaymentInstruction }
