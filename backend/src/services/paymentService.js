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

/** Kode unik untuk membedakan antar transaksi bank transfer (3 digit terakhir amount) */
function generateUniqueCode(donationId) {
  return (donationId % 900) + 100 // Menghasilkan angka 100-999
}

/**
 * Generate instruksi pembayaran sesuai metode yang dipilih
 * @param {{ paymentMethod: string, amount: number, donationId: number }} params
 * @returns {object} Instruksi pembayaran
 */
function generatePaymentInstruction({ paymentMethod, amount, donationId }) {
  const uniqueCode = generateUniqueCode(donationId)
  const expiredAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 jam dari sekarang

  switch (paymentMethod) {
    case 'bank_transfer':
      return {
        type: 'bank_transfer',
        bank_name: 'BRI',
        account_number: '1234-5678-9012-3456',
        account_name: 'LKSA Dapur Yatim',
        amount: amount + uniqueCode, // Jumlah + kode unik untuk verifikasi
        unique_code: uniqueCode,
        note: `Transfer tepat sebesar Rp ${(amount + uniqueCode).toLocaleString('id-ID')} (sudah termasuk kode unik ${uniqueCode}) untuk memudahkan verifikasi.`,
        expired_at: expiredAt.toISOString(),
      }

    case 'qris':
      return {
        type: 'qris',
        // URL placeholder — ganti dengan URL QRIS statis atau dinamis dari payment gateway
        qris_url: 'https://placehold.co/300x300/005DAC/white?text=QRIS+Dapur+Yatim',
        qris_string: `00020101021126570011ID.LINKAJA.WWW011893600914DAPURYATIM0215ID20240001000010303UMI51440014ID.CO.QRIS.WWW0215ID20240001000010303UMI5204579953033605802ID5917LKSA Dapur Yatim6007Bandung61054012162070703A016304${uniqueCode}`,
        amount,
        expired_at: expiredAt.toISOString(),
        note: 'Scan QR Code di atas menggunakan aplikasi e-wallet atau mobile banking Anda.',
      }

    case 'e_wallet':
      return {
        type: 'e_wallet',
        options: [
          {
            name: 'GoPay',
            deeplink_url: `gojek://gopay/transfer?amount=${amount}&notes=Donasi+Dapur+Yatim+%23${donationId}`,
            logo: '💚',
          },
          {
            name: 'OVO',
            deeplink_url: `ovo://pay?amount=${amount}&note=Donasi+Dapur+Yatim+%23${donationId}`,
            logo: '💜',
          },
          {
            name: 'DANA',
            deeplink_url: `dana://pay?amount=${amount}&note=Donasi+Dapur+Yatim+%23${donationId}`,
            logo: '💙',
          },
        ],
        amount,
        expired_at: expiredAt.toISOString(),
        note: 'Pilih salah satu e-wallet di bawah dan selesaikan pembayaran.',
      }

    default:
      return {
        type: 'unknown',
        note: 'Metode pembayaran tidak dikenali. Hubungi admin untuk bantuan.',
      }
  }
}

module.exports = { generatePaymentInstruction }
