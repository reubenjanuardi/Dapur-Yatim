import { useState } from 'react';
import { useForm } from 'react-hook-form';
import PageLayout from '../components/layout/PageLayout';
import Button from '../components/common/Button';
import { contactApi } from '../lib/api';

// ---------------------------------------------------------------------------
// FAQ data
// ---------------------------------------------------------------------------
const FAQ_ITEMS = [
  {
    question: 'Bagaimana cara berdonasi?',
    answer:
      'Berdonasi di LKSA Dapur Yatim sangat mudah — cukup tiga langkah: (1) Pilih nominal donasi yang ingin Anda berikan pada halaman Donasi, (2) Isi data diri Anda sebagai bukti kepercayaan, dan (3) Lakukan transfer ke rekening yang tertera lalu konfirmasi pembayaran. Tim kami akan memverifikasi dalam 1×24 jam.',
  },
  {
    question: 'Apakah donasi saya aman?',
    answer:
      'Ya, setiap donasi yang masuk dikelola secara transparan dan akuntabel. Kami menerbitkan laporan keuangan bulanan yang dapat diakses oleh seluruh donatur. Selain itu, LKSA Dapur Yatim telah terdaftar secara resmi dan diawasi oleh Dinas Sosial Kota Bandung.',
  },
  {
    question: 'Kapan laporan keuangan dipublikasikan?',
    answer:
      'Laporan keuangan bulanan dipublikasikan setiap awal bulan berikutnya — biasanya pada minggu pertama. Anda dapat mengaksesnya langsung di halaman Laporan pada website kami, atau berlangganan melalui email untuk mendapatkan notifikasi otomatis.',
  },
  {
    question: 'Bagaimana cara menjadi relawan?',
    answer:
      'Kami selalu membuka kesempatan bagi siapa pun yang ingin berkontribusi sebagai relawan. Silakan hubungi kami melalui WhatsApp di +62 812-3456-7890 atau kirim email ke info@dapuryatim.org dengan subjek "Pendaftaran Relawan". Tim kami akan menghubungi Anda untuk proses selanjutnya.',
  },
];

// ---------------------------------------------------------------------------
// ChevronIcon
// ---------------------------------------------------------------------------
function ChevronIcon({ open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : 'rotate-0'}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// LoadingSpinner
// ---------------------------------------------------------------------------
function LoadingSpinner() {
  return (
    <svg
      className="animate-spin h-4 w-4 mr-2 inline-block"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// ContactInfoItem
// ---------------------------------------------------------------------------
function ContactInfoItem({ emoji, label, children }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-xl mt-0.5 flex-shrink-0">{emoji}</span>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">
          {label}
        </p>
        <div className="text-gray-800 text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FAQAccordion
// ---------------------------------------------------------------------------
function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => setOpenIndex((prev) => (prev === idx ? null : idx));

  return (
    <section className="section-padding">
      <div className="container-default">
        <h2 className="section-title text-center mb-2">Pertanyaan yang Sering Diajukan</h2>
        <p className="section-subtitle text-center mb-10">
          Temukan jawaban atas pertanyaan umum seputar donasi dan kegiatan kami.
        </p>

        <div className="max-w-3xl mx-auto divide-y divide-gray-200 border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx}>
                {/* Header */}
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-gray-900 text-sm sm:text-base">
                    {item.question}
                  </span>
                  <ChevronIcon open={isOpen} />
                </button>

                {/* Content — smooth slide via max-height trick */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-6 pb-6 text-gray-600 text-sm leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// ContactPage
// ---------------------------------------------------------------------------
export default function ContactPage() {
  // Form states
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  const pesanValue = watch('pesan', '');

  // ── Submit handler ──────────────────────────────────────────────────────
  const onSubmit = async (data) => {
    setSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      await contactApi.send({
        name: data.namaLengkap,
        email: data.email,
        subject: data.subjek,
        message: data.pesan,
      });
      setSubmitSuccess(true);
      reset();
    } catch (err) {
      console.error('Gagal mengirim pesan kontak:', err);
      setSubmitError(
        err?.message ||
          'Terjadi kesalahan saat mengirim pesan. Silakan coba lagi atau hubungi kami melalui WhatsApp.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ── Field helper: error text ────────────────────────────────────────────
  const FieldError = ({ name }) =>
    errors[name] ? (
      <p className="mt-1 text-xs text-red-600">{errors[name].message}</p>
    ) : null;

  return (
    <PageLayout
      title="Hubungi Kami"
      subtitle="Kami siap membantu Anda. Jangan ragu untuk menghubungi kami."
      breadcrumbs={[{ label: 'Kontak' }]}
    >
      {/* ── 2-column section ─────────────────────────────────────────────── */}
      <section className="section-padding">
        <div className="container-default">
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* ── Left column: Contact Info (40%) ───────────────────────── */}
            <div className="w-full lg:w-2/5 space-y-6">
              {/* Info Card */}
              <div className="card p-6 space-y-6">
                <h3 className="text-lg font-bold text-gray-900">Informasi Kontak</h3>

                <div className="space-y-5">
                  <ContactInfoItem emoji="📍" label="Alamat">
                    Jl. Mawar No. 23, Kel. Cipedes, Kec. Sukajadi,
                    <br />
                    Bandung, Jawa Barat 40162
                  </ContactInfoItem>

                  <ContactInfoItem emoji="📞" label="WhatsApp">
                    +62 812-3456-7890
                  </ContactInfoItem>

                  <ContactInfoItem emoji="📧" label="Email">
                    <a
                      href="mailto:info@dapuryatim.org"
                      className="text-primary hover:underline break-all"
                    >
                      info@dapuryatim.org
                    </a>
                  </ContactInfoItem>

                  <ContactInfoItem emoji="🕐" label="Jam Operasional">
                    <p>Senin – Jumat: 08.00 – 17.00 WIB</p>
                    <p>Sabtu: 09.00 – 13.00 WIB</p>
                  </ContactInfoItem>
                </div>

                {/* WhatsApp CTA */}
                <a
                  href="https://wa.me/6281234567890?text=Halo%20LKSA%20Dapur%20Yatim%2C%20saya%20ingin%20bertanya%20mengenai..."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-green-500 text-white font-semibold text-sm hover:bg-green-600 active:bg-green-700 transition-colors duration-200 shadow-sm"
                >
                  <span className="text-base">💬</span>
                  Chat via WhatsApp
                </a>
              </div>

              {/* Placeholder Map */}
              <div className="bg-surface rounded-xl h-48 flex items-center justify-center border border-gray-200 shadow-sm overflow-hidden">
                <a
                  href="https://maps.google.com/?q=Bandung"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 text-gray-500 hover:text-primary transition-colors duration-200 group"
                >
                  <span className="text-4xl group-hover:scale-110 transition-transform duration-200">
                    🗺️
                  </span>
                  <span className="text-sm font-medium">Lihat di Google Maps →</span>
                </a>
              </div>
            </div>

            {/* ── Right column: Contact Form (60%) ──────────────────────── */}
            <div className="w-full lg:w-3/5">
              <div className="card p-6 sm:p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Kirim Pesan</h3>

                {/* Success state */}
                {submitSuccess && (
                  <div className="mb-6 rounded-xl bg-green-50 border border-green-200 p-5">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">✅</span>
                      <div>
                        <p className="font-semibold text-green-800 mb-1">
                          Pesan Anda berhasil terkirim!
                        </p>
                        <p className="text-green-700 text-sm leading-relaxed">
                          Terima kasih telah menghubungi kami. Tim LKSA Dapur Yatim akan
                          merespons pesan Anda dalam 1×24 jam pada hari kerja. Jika
                          mendesak, silakan hubungi kami langsung via WhatsApp.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                  {/* Nama Lengkap */}
                  <div>
                    <label
                      htmlFor="namaLengkap"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="namaLengkap"
                      type="text"
                      placeholder="Masukkan nama lengkap Anda"
                      className={`input-field ${errors.namaLengkap ? 'border-red-400 focus:ring-red-300' : ''}`}
                      {...register('namaLengkap', {
                        required: 'Nama lengkap wajib diisi.',
                        minLength: { value: 2, message: 'Nama minimal 2 karakter.' },
                        maxLength: { value: 100, message: 'Nama maksimal 100 karakter.' },
                      })}
                    />
                    <FieldError name="namaLengkap" />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="contoh@email.com"
                      className={`input-field ${errors.email ? 'border-red-400 focus:ring-red-300' : ''}`}
                      {...register('email', {
                        required: 'Email wajib diisi.',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Format email tidak valid.',
                        },
                      })}
                    />
                    <FieldError name="email" />
                  </div>

                  {/* Subjek */}
                  <div>
                    <label
                      htmlFor="subjek"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Subjek <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="subjek"
                      type="text"
                      placeholder="Topik pesan Anda"
                      className={`input-field ${errors.subjek ? 'border-red-400 focus:ring-red-300' : ''}`}
                      {...register('subjek', {
                        required: 'Subjek wajib diisi.',
                        minLength: { value: 5, message: 'Subjek minimal 5 karakter.' },
                        maxLength: { value: 200, message: 'Subjek maksimal 200 karakter.' },
                      })}
                    />
                    <FieldError name="subjek" />
                  </div>

                  {/* Pesan */}
                  <div>
                    <label
                      htmlFor="pesan"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Pesan <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="pesan"
                      rows={5}
                      placeholder="Tuliskan pesan Anda di sini..."
                      className={`input-field resize-none ${errors.pesan ? 'border-red-400 focus:ring-red-300' : ''}`}
                      {...register('pesan', {
                        required: 'Pesan wajib diisi.',
                        minLength: { value: 10, message: 'Pesan minimal 10 karakter.' },
                        maxLength: { value: 1000, message: 'Pesan maksimal 1000 karakter.' },
                      })}
                    />
                    <div className="mt-1 flex items-center justify-between">
                      <FieldError name="pesan" />
                      <span
                        className={`ml-auto text-xs tabular-nums ${
                          pesanValue.length > 950 ? 'text-red-500' : 'text-gray-400'
                        }`}
                      >
                        {pesanValue.length}/1000 karakter
                      </span>
                    </div>
                  </div>

                  {/* Submit error */}
                  {submitError && (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                      ⚠️ {submitError}
                    </p>
                  )}

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <LoadingSpinner />
                        Mengirim Pesan...
                      </>
                    ) : (
                      <>
                        <span>📨</span>
                        Kirim Pesan
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ Accordion ──────────────────────────────────────────────────── */}
      <FAQAccordion />
    </PageLayout>
  );
}
