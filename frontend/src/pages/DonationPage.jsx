/**
 * DonationPage.jsx
 * Halaman donasi dengan alur 3 langkah: Nominal → Data Diri → Konfirmasi
 */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import PageLayout from '../components/layout/PageLayout'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import useDonation from '../hooks/useDonation'
import { formatRupiah } from '../lib/utils'

const PRESET_AMOUNTS = [25000, 50000, 100000, 250000, 500000]
const PAYMENT_METHODS = [
  {
    id: 'bank_transfer',
    label: 'Transfer Bank',
    icon: '🏦',
    desc: 'BRI · 1234-5678-9012-3456 · a.n. LKSA Dapur Yatim',
  },
  {
    id: 'qris',
    label: 'QRIS',
    icon: '📱',
    desc: 'Scan QR menggunakan aplikasi e-wallet atau m-banking',
  },
  {
    id: 'e_wallet',
    label: 'E-Wallet',
    icon: '💳',
    desc: 'GoPay, OVO, DANA, dan dompet digital lainnya',
  },
]

/** Komponen step indicator */
function StepIndicator({ currentStep }) {
  const steps = ['Nominal', 'Data Diri', 'Konfirmasi']
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((label, index) => {
        const step = index + 1
        const isActive = step === currentStep
        const isDone = step < currentStep
        return (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  isDone
                    ? 'bg-secondary text-white'
                    : isActive
                    ? 'bg-primary text-white shadow-button'
                    : 'bg-surface-container text-on-surface-variant'
                }`}
              >
                {isDone ? '✓' : step}
              </div>
              <span
                className={`text-xs mt-1.5 font-medium ${
                  isActive ? 'text-primary' : isDone ? 'text-secondary' : 'text-on-surface-variant'
                }`}
              >
                {label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-16 md:w-24 h-0.5 mb-5 mx-2 transition-colors duration-300 ${
                  step < currentStep ? 'bg-secondary' : 'bg-outline-variant'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

/** Step 1: Pilih nominal dan metode pembayaran */
function Step1({ amount, setAmount, customAmount, setCustomAmount, paymentMethod, setPaymentMethod, onNext }) {
  const isCustom = !PRESET_AMOUNTS.includes(amount) || amount === null
  const effectiveAmount = isCustom ? parseInt(customAmount) || 0 : amount
  const isValid = effectiveAmount >= 10000 && paymentMethod

  return (
    <div className="space-y-6">
      {/* Pilih Nominal */}
      <div>
        <h3 className="text-base font-semibold text-on-surface mb-3">Pilih Nominal Donasi</h3>
        <div className="grid grid-cols-3 gap-2.5 mb-3">
          {PRESET_AMOUNTS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => { setAmount(preset); setCustomAmount('') }}
              className={`py-3 rounded-lg text-sm font-semibold border-2 transition-all duration-200 ${
                amount === preset && !isCustom
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-outline-variant bg-white text-on-surface hover:border-primary/50'
              }`}
            >
              {formatRupiah(preset)}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setAmount(null)}
            className={`py-3 rounded-lg text-sm font-semibold border-2 transition-all duration-200 ${
              isCustom
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-outline-variant bg-white text-on-surface hover:border-primary/50'
            }`}
          >
            Nominal Lain
          </button>
        </div>

        {isCustom && (
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-medium">Rp</span>
            <input
              type="number"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder="Masukkan nominal (min. 10.000)"
              min="10000"
              className="input-field pl-10"
              autoFocus
            />
          </div>
        )}

        {effectiveAmount > 0 && effectiveAmount < 10000 && (
          <p className="text-red-500 text-sm mt-1.5">Nominal minimal donasi adalah {formatRupiah(10000)}.</p>
        )}
      </div>

      {/* Pilih Metode Pembayaran */}
      <div>
        <h3 className="text-base font-semibold text-on-surface mb-3">Metode Pembayaran</h3>
        <div className="space-y-2.5">
          {PAYMENT_METHODS.map((method) => (
            <button
              key={method.id}
              type="button"
              onClick={() => setPaymentMethod(method.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                paymentMethod === method.id
                  ? 'border-primary bg-primary/5'
                  : 'border-outline-variant bg-white hover:border-primary/50'
              }`}
            >
              <span className="text-2xl">{method.icon}</span>
              <div className="flex-1">
                <p className={`font-semibold text-sm ${paymentMethod === method.id ? 'text-primary' : 'text-on-surface'}`}>
                  {method.label}
                </p>
                <p className="text-xs text-on-surface-variant mt-0.5">{method.desc}</p>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  paymentMethod === method.id ? 'border-primary' : 'border-outline-variant'
                }`}
              >
                {paymentMethod === method.id && (
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <Button onClick={onNext} disabled={!isValid} className="w-full">
        Lanjutkan →
      </Button>
    </div>
  )
}

/** Step 2: Isi data donatur */
function Step2({ amount, paymentMethod, onNext, onBack }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm()
  const message = watch('message', '')
  const methodLabel = PAYMENT_METHODS.find((m) => m.id === paymentMethod)?.label || paymentMethod

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-5">
      {/* Summary */}
      <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
        <p className="text-sm text-on-surface-variant">Anda akan berdonasi</p>
        <p className="text-xl font-bold text-primary">{formatRupiah(amount)}</p>
        <p className="text-sm text-on-surface-variant">via {methodLabel}</p>
      </div>

      {/* Nama */}
      <div>
        <label htmlFor="donor_name" className="block text-sm font-medium text-on-surface mb-1.5">
          Nama Lengkap <span className="text-red-500">*</span>
        </label>
        <input
          id="donor_name"
          type="text"
          placeholder="Nama Anda"
          className={`input-field ${errors.donor_name ? 'border-red-400 focus:border-red-500' : ''}`}
          {...register('donor_name', {
            required: 'Nama wajib diisi.',
            minLength: { value: 2, message: 'Nama minimal 2 karakter.' },
          })}
        />
        {errors.donor_name && <p className="text-red-500 text-sm mt-1">{errors.donor_name.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="donor_email" className="block text-sm font-medium text-on-surface mb-1.5">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="donor_email"
          type="email"
          placeholder="email@contoh.com"
          className={`input-field ${errors.donor_email ? 'border-red-400' : ''}`}
          {...register('donor_email', {
            required: 'Email wajib diisi.',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Format email tidak valid.' },
          })}
        />
        {errors.donor_email && <p className="text-red-500 text-sm mt-1">{errors.donor_email.message}</p>}
      </div>

      {/* No HP */}
      <div>
        <label htmlFor="donor_phone" className="block text-sm font-medium text-on-surface mb-1.5">
          Nomor HP <span className="text-on-surface-variant font-normal">(opsional)</span>
        </label>
        <input
          id="donor_phone"
          type="tel"
          placeholder="08xx-xxxx-xxxx"
          className="input-field"
          {...register('donor_phone', {
            pattern: { value: /^[0-9+\-\s]{10,15}$/, message: 'Format nomor HP tidak valid.' },
          })}
        />
        {errors.donor_phone && <p className="text-red-500 text-sm mt-1">{errors.donor_phone.message}</p>}
      </div>

      {/* Pesan */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-on-surface mb-1.5">
          Pesan / Doa <span className="text-on-surface-variant font-normal">(opsional)</span>
        </label>
        <textarea
          id="message"
          rows={3}
          maxLength={500}
          placeholder="Tulis pesan atau doa untuk anak-anak yatim..."
          className="input-field resize-none"
          {...register('message', { maxLength: { value: 500, message: 'Pesan maksimal 500 karakter.' } })}
        />
        <p className="text-xs text-on-surface-variant mt-1 text-right">{message.length}/500</p>
      </div>

      {/* Anonim */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          className="w-4 h-4 accent-primary"
          {...register('is_anonymous')}
        />
        <span className="text-sm text-on-surface-variant">Sembunyikan nama saya (donasi anonim)</span>
      </label>

      {/* Buttons */}
      <div className="flex gap-3 pt-1">
        <Button variant="secondary" onClick={onBack} type="button" className="flex-1">
          ← Kembali
        </Button>
        <Button type="submit" className="flex-1">
          Lanjutkan →
        </Button>
      </div>
    </form>
  )
}

/** Step 3: Konfirmasi & Instruksi Pembayaran */
function Step3({ donationResult, onReset }) {
  if (!donationResult) return null

  const instruction = donationResult.payment_instruction
  const methodLabel = PAYMENT_METHODS.find((m) => m.id === donationResult.payment_method)?.label

  return (
    <div className="text-center space-y-6">
      {/* Success icon */}
      <div className="flex justify-center">
        <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center">
          <span className="text-4xl">✅</span>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-on-surface">Donasi Berhasil Disubmit!</h3>
        <p className="text-on-surface-variant mt-2">
          Terima kasih telah berdonasi untuk anak-anak yatim.
        </p>
      </div>

      {/* Donation ID */}
      <div className="bg-surface-container rounded-xl p-4">
        <p className="text-sm text-on-surface-variant">Nomor Donasi Anda</p>
        <p className="text-2xl font-bold text-primary mt-1">#{donationResult.id}</p>
        <p className="text-sm text-on-surface-variant mt-1">Simpan nomor ini sebagai referensi.</p>
      </div>

      {/* Payment Instructions */}
      <div className="bg-white border border-outline-variant rounded-xl p-5 text-left space-y-3">
        <h4 className="font-semibold text-on-surface">Instruksi Pembayaran ({methodLabel})</h4>

        {instruction?.type === 'bank_transfer' && (
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Bank</span>
              <span className="font-semibold">{instruction.bank_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">No. Rekening</span>
              <span className="font-semibold font-mono">{instruction.account_number}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Atas Nama</span>
              <span className="font-semibold">{instruction.account_name}</span>
            </div>
            <div className="flex justify-between border-t border-outline-variant pt-2 mt-2">
              <span className="text-on-surface-variant">Total Transfer</span>
              <span className="font-bold text-primary text-base">{formatRupiah(instruction.amount)}</span>
            </div>
            <p className="text-xs text-amber-700 bg-amber-50 p-2.5 rounded-lg">{instruction.note}</p>
          </div>
        )}

        {instruction?.type === 'qris' && (
          <div className="space-y-3">
            <div className="flex justify-center">
              <img
                src={instruction.qris_url}
                alt="QRIS Code Dapur Yatim"
                className="w-48 h-48 rounded-lg border border-outline-variant"
              />
            </div>
            <p className="text-sm text-center font-semibold text-primary">
              Jumlah: {formatRupiah(instruction.amount)}
            </p>
            <p className="text-xs text-on-surface-variant text-center">{instruction.note}</p>
          </div>
        )}

        {instruction?.type === 'e_wallet' && (
          <div className="space-y-2">
            <p className="text-sm text-on-surface-variant">{instruction.note}</p>
            <p className="font-semibold text-primary">{formatRupiah(instruction.amount)}</p>
            <div className="flex gap-2 flex-wrap">
              {instruction.options?.map((opt) => (
                <a
                  key={opt.name}
                  href={opt.deeplink_url}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-outline-variant text-sm font-medium hover:border-primary transition-colors"
                >
                  {opt.logo} {opt.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <p className="text-sm text-on-surface-variant bg-amber-50 border border-amber-200 rounded-xl p-3">
        ⏰ Konfirmasi pembayaran dalam <strong>1×24 jam</strong>. Kami akan mengirimkan notifikasi ke email Anda.
      </p>

      <div className="flex gap-3">
        <Button variant="secondary" onClick={onReset} className="flex-1">
          Donasi Lagi
        </Button>
        <Link to="/transparansi" className="btn-primary flex-1 text-center">
          Lihat Laporan
        </Link>
      </div>
    </div>
  )
}

// ─── Main DonationPage ────────────────────────────────────────────────────────

export default function DonationPage() {
  const [step, setStep] = useState(1)
  const [amount, setAmount] = useState(100000)
  const [customAmount, setCustomAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [formData, setFormData] = useState(null)

  const { submit, loading, error, success, donationResult, reset } = useDonation()

  const effectiveAmount = PRESET_AMOUNTS.includes(amount) ? amount : parseInt(customAmount) || 0

  const handleStep1Next = () => setStep(2)

  const handleStep2Next = (data) => {
    setFormData(data)
    handleSubmit(data)
  }

  const handleSubmit = async (data) => {
    const payload = {
      donor_name: data.is_anonymous ? 'Donatur Anonim' : data.donor_name,
      donor_email: data.donor_email,
      donor_phone: data.donor_phone || undefined,
      amount: effectiveAmount,
      payment_method: paymentMethod,
      message: data.message || undefined,
    }
    await submit(payload)
    setStep(3)
  }

  const handleReset = () => {
    reset()
    setStep(1)
    setAmount(100000)
    setCustomAmount('')
    setPaymentMethod('')
    setFormData(null)
  }

  return (
    <PageLayout
      title="Form Donasi"
      subtitle="Setiap donasi Anda memberikan dampak nyata bagi kehidupan anak-anak yatim."
      breadcrumbs={[{ label: 'Donasi' }]}
    >
      <section className="section-padding">
        <div className="container-default max-w-2xl">
          {/* Step Indicator */}
          <StepIndicator currentStep={step} />

          <Card className="shadow-card-hover">
            {/* Error global */}
            {error && step !== 3 && (
              <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                ❌ {error}
              </div>
            )}

            {step === 1 && (
              <Step1
                amount={amount}
                setAmount={setAmount}
                customAmount={customAmount}
                setCustomAmount={setCustomAmount}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                onNext={handleStep1Next}
              />
            )}

            {step === 2 && (
              <Step2
                amount={effectiveAmount}
                paymentMethod={paymentMethod}
                onNext={handleStep2Next}
                onBack={() => setStep(1)}
              />
            )}

            {step === 3 && (
              <>
                {loading ? (
                  <div className="text-center py-12">
                    <div className="inline-block w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
                    <p className="text-on-surface-variant">Memproses donasi Anda...</p>
                  </div>
                ) : success && donationResult ? (
                  <Step3 donationResult={donationResult} onReset={handleReset} />
                ) : (
                  <div className="text-center py-8 text-red-600">
                    <p>❌ {error || 'Terjadi kesalahan. Silakan coba lagi.'}</p>
                    <Button variant="secondary" onClick={() => setStep(2)} className="mt-4">
                      ← Kembali
                    </Button>
                  </div>
                )}
              </>
            )}
          </Card>

          {/* Trust badges */}
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-on-surface-variant">
            <span>🔒 Transaksi Aman</span>
            <span>📊 Laporan Transparan</span>
            <span>✅ Terdaftar Kemensos RI</span>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
