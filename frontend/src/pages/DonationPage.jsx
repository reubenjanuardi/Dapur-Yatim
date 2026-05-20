import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import PageLayout from '../components/layout/PageLayout'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import useDonation from '../hooks/useDonation'
import { formatRupiah } from '../lib/utils'
import { QRCodeSVG } from 'qrcode.react'

const PRESET_AMOUNTS = [25000, 50000, 100000, 250000, 500000]
const PAYMENT_METHODS = [
  { id: 'bank_transfer', label: 'Transfer Bank', desc: 'Via Bank BRI/BJB/Mandiri' },
  { id: 'qris', label: 'QRIS', desc: 'Scan QR Code' },
]

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
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 ${isDone
                  ? 'bg-secondary text-white shadow-lg shadow-secondary/30'
                  : isActive
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-surface-container text-on-surface-variant'
                  }`}
              >
                {isDone ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                ) : step}
              </div>
              <span className={`text-xs mt-2 font-semibold ${isActive ? 'text-primary' : isDone ? 'text-secondary' : 'text-on-surface-variant'}`}>
                {label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-12 md:w-20 h-1 mx-1 rounded-full transition-colors duration-300 ${step < currentStep ? 'bg-secondary' : 'bg-outline-variant'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

function Step1({ amount, setAmount, customAmount, setCustomAmount, paymentMethod, setPaymentMethod, onNext }) {
  const isCustom = !PRESET_AMOUNTS.includes(amount) || amount === null
  const effectiveAmount = isCustom ? parseInt(customAmount) || 0 : amount
  const isValid = effectiveAmount >= 10000 && paymentMethod

  return (
    <div className="space-y-6">
      <div>
        <label className="input-label">Pilih Nominal Donasi</label>
        <div className="grid grid-cols-3 gap-2.5 mb-3">
          {PRESET_AMOUNTS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => { setAmount(preset); setCustomAmount('') }}
              className={`py-3.5 rounded-xl text-sm font-bold border-2 transition-all duration-200 ${amount === preset && !isCustom
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-outline-variant/50 bg-white text-on-surface hover:border-primary/50'
                }`}
            >
              {formatRupiah(preset)}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setAmount(null)}
            className={`py-3.5 rounded-xl text-sm font-bold border-2 transition-all duration-200 ${isCustom
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-outline-variant/50 bg-white text-on-surface hover:border-primary/50'
              }`}
          >
            Lainnya
          </button>
        </div>

        {isCustom && (
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-semibold">Rp</span>
            <input
              type="number"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder="Minimal 10.000"
              min="10000"
              className="input-field pl-12"
              autoFocus
            />
          </div>
        )}

        {effectiveAmount > 0 && effectiveAmount < 10000 && (
          <p className="text-red-500 text-sm mt-2">Nominal minimal adalah {formatRupiah(10000)}</p>
        )}
      </div>

      <div>
        <label className="input-label">Metode Pembayaran</label>
        <div className="space-y-2.5">
          {PAYMENT_METHODS.map((method) => (
            <button
              key={method.id}
              type="button"
              onClick={() => setPaymentMethod(method.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 text-left ${paymentMethod === method.id
                ? 'border-primary bg-primary/5'
                : 'border-outline-variant/50 bg-white hover:border-primary/50'
                }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${paymentMethod === method.id ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant'
                }`}>
                {method.id === 'bank_transfer' && (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                )}
                {method.id === 'qris' && (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <p className={`font-bold ${paymentMethod === method.id ? 'text-primary' : 'text-on-surface'}`}>
                  {method.label}
                </p>
                <p className="text-xs text-on-surface-variant mt-0.5">{method.desc}</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === method.id ? 'border-primary' : 'border-outline-variant'
                }`}>
                {paymentMethod === method.id && <div className="w-3 h-3 rounded-full bg-primary" />}
              </div>
            </button>
          ))}
        </div>
      </div>

      <Button onClick={onNext} disabled={!isValid} className="w-full py-4 text-base">
        Lanjutkan →
      </Button>
    </div>
  )
}

function Step2({ amount, paymentMethod, onNext, onBack }) {
  const { register, handleSubmit, formState: { errors }, watch } = useForm()
  const message = watch('message', '')
  const methodLabel = PAYMENT_METHODS.find((m) => m.id === paymentMethod)?.label || paymentMethod

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-5">
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-5 border border-primary/20">
        <p className="text-sm text-on-surface-variant">Total Donasi</p>
        <p className="text-3xl font-extrabold text-primary">{formatRupiah(amount)}</p>
        <p className="text-sm text-on-surface-variant mt-1">via {methodLabel}</p>
      </div>

      <div>
        <label htmlFor="donor_name" className="input-label">Nama Lengkap <span className="text-red-500">*</span></label>
        <input
          id="donor_name"
          type="text"
          placeholder="Masukkan nama lengkap Anda"
          className={`input-field ${errors.donor_name ? 'border-red-400 focus:border-red-500' : ''}`}
          {...register('donor_name', { required: 'Nama wajib diisi', minLength: { value: 2, message: 'Min 2 karakter' } })}
        />
        {errors.donor_name && <p className="text-red-500 text-sm mt-1">{errors.donor_name.message}</p>}
      </div>

      <div>
        <label htmlFor="donor_email" className="input-label">Email <span className="text-red-500">*</span></label>
        <input
          id="donor_email"
          type="email"
          placeholder="email@example.com"
          className={`input-field ${errors.donor_email ? 'border-red-400' : ''}`}
          {...register('donor_email', { required: 'Email wajib diisi', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Format tidak valid' } })}
        />
        {errors.donor_email && <p className="text-red-500 text-sm mt-1">{errors.donor_email.message}</p>}
      </div>

      <div>
        <label htmlFor="donor_phone" className="input-label">Nomor HP <span className="text-on-surface-variant font-normal">(opsional)</span></label>
        <input
          id="donor_phone"
          type="tel"
          placeholder="08xxxxxxxxxx"
          className="input-field"
          {...register('donor_phone', { pattern: { value: /^[0-9+\-\s]{10,15}$/, message: 'Format tidak valid' } })}
        />
        {errors.donor_phone && <p className="text-red-500 text-sm mt-1">{errors.donor_phone.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className="input-label">Pesan / Doa <span className="text-on-surface-variant font-normal">(opsional)</span></label>
        <textarea
          id="message"
          rows={3}
          maxLength={500}
          placeholder="Tulis pesan atau doa untuk anak-anak..."
          className="input-field resize-none"
          {...register('message', { maxLength: { value: 500, message: 'Maks 500 karakter' } })}
        />
        <p className="text-xs text-on-surface-variant mt-1 text-right">{message.length}/500</p>
      </div>

      <label className="flex items-center gap-3 cursor-pointer p-3 bg-surface rounded-xl">
        <input type="checkbox" className="w-5 h-5 accent-primary rounded" {...register('is_anonymous')} />
        <span className="text-sm text-on-surface-variant">Sembunyikan nama saya (donasi anonim)</span>
      </label>

      <div className="flex gap-3 pt-2">
        <Button variant="secondary" onClick={onBack} type="button" className="flex-1 py-3">
          ← Kembali
        </Button>
        <Button type="submit" className="flex-1 py-3">
          Lanjutkan →
        </Button>
      </div>
    </form>
  )
}

function Step3({ donationResult, onReset }) {
  if (!donationResult) return null

  const instruction = donationResult.payment_instruction
  const methodLabel = PAYMENT_METHODS.find((m) => m.id === donationResult.payment_method)?.label

  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <div className="w-24 h-24 rounded-2xl bg-secondary/10 flex items-center justify-center">
          <svg className="w-12 h-12 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-on-surface">Donasi Berhasil!</h3>
        <p className="text-on-surface-variant mt-2">Terima kasih atas kebaikannya.</p>
      </div>

      <div className="bg-surface-container rounded-2xl p-5">
        <p className="text-sm text-on-surface-variant">Nomor Donasi</p>
        <p className="text-3xl font-extrabold text-primary mt-1">#{donationResult.id}</p>
      </div>

      <div className="bg-white border border-outline-variant rounded-2xl p-5 text-left">
        <h4 className="font-bold text-on-surface mb-4">Instruksi Pembayaran</h4>

        {instruction?.type === 'bank_transfer' && (
          <div className="space-y-4">
            <p className="text-xs text-on-surface-variant mb-3">Transfer ke salah satu rekening berikut:</p>
            <div className="space-y-3">
              {instruction.banks?.map((bank, idx) => (
                <div key={idx} className="bg-surface-container/50 rounded-xl p-4 border border-outline-variant/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-on-surface">{bank.name}</span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-semibold">A/N {bank.account_name}</span>
                  </div>
                  <p className="font-mono text-lg font-bold text-primary tracking-wide">{bank.account_number}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between pt-3 border-t border-outline-variant">
              <span className="text-on-surface-variant text-sm">Total Transfer</span>
              <span className="font-bold text-xl text-primary">{formatRupiah(instruction.amount)}</span>
            </div>
            <p className="text-xs text-amber-700 bg-amber-50 p-3 rounded-xl">{instruction.note}</p>
          </div>
        )}

        {instruction?.type === 'qris' && (
          <div className="text-center">
            <div className="inline-block p-4 bg-white rounded-xl border border-outline-variant">
              <QRCodeSVG value={instruction.qris_string} size={192} level="M" />
            </div>
            <p className="font-bold text-primary mt-3">{formatRupiah(instruction.amount)}</p>
          </div>
        )}
      </div>

      <p className="text-sm text-on-surface-variant bg-amber-50 border border-amber-200 rounded-xl p-4">
        Konfirmasi dalam 1×24 jam. Notifikasi akan dikirim ke email Anda.
      </p>

      <div className="flex gap-3">
        <Button variant="secondary" onClick={onReset} className="flex-1">Donasi Lagi</Button>
        <Link to="/transparansi" className="btn-primary flex-1 text-center">Lihat Laporan</Link>
      </div>
    </div>
  )
}

export default function DonationPage() {
  const [step, setStep] = useState(1)
  const [amount, setAmount] = useState(100000)
  const [customAmount, setCustomAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [formData, setFormData] = useState(null)

  const { submit, loading, error, success, donationResult, reset } = useDonation()

  const effectiveAmount = PRESET_AMOUNTS.includes(amount) ? amount : parseInt(customAmount) || 0

  const handleStep1Next = () => setStep(2)
  const handleStep2Next = (data) => { setFormData(data); handleSubmit(data) }

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

  const handleReset = () => { reset(); setStep(1); setAmount(100000); setCustomAmount(''); setPaymentMethod(''); setFormData(null) }

  return (
    <PageLayout
      title="Form Donasi"
      subtitle="Setiap donasi Anda memberikan dampak nyata bagi kehidupan anak-anak yatim."
      breadcrumbs={[{ label: 'Donasi' }]}
    >
      <section className="section-padding">
        <div className="container-default max-w-xl">
          <StepIndicator currentStep={step} />

          <Card className="shadow-card-elevated">
            {error && step !== 3 && (
              <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            {step === 1 && (
              <Step1 amount={amount} setAmount={setAmount} customAmount={customAmount} setCustomAmount={setCustomAmount} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} onNext={handleStep1Next} />
            )}

            {step === 2 && (
              <Step2 amount={effectiveAmount} paymentMethod={paymentMethod} onNext={handleStep2Next} onBack={() => setStep(1)} />
            )}

            {step === 3 && (
              <>
                {loading ? (
                  <div className="text-center py-12">
                    <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-on-surface-variant">Memproses donasi...</p>
                  </div>
                ) : success && donationResult ? (
                  <Step3 donationResult={donationResult} onReset={handleReset} />
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <p className="text-red-600 font-medium">{error || 'Terjadi kesalahan'}</p>
                    <Button variant="secondary" onClick={() => setStep(2)} className="mt-4">← Kembali</Button>
                  </div>
                )}
              </>
            )}
          </Card>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-on-surface-variant">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              Transaksi Aman
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Laporan Transparan
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Terdaftar Kemensos
            </span>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}