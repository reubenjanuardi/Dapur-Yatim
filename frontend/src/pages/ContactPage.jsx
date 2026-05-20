import { useState } from 'react';
import { useForm } from 'react-hook-form';
import PageLayout from '../components/layout/PageLayout';
import Button from '../components/common/Button';
import { contactApi } from '../lib/api';

const FAQ_ITEMS = [
  {
    question: 'Bagaimana cara berdonasi?',
    answer: 'Berdonasi sangat mudah — pilih nominal donasi pada halaman Donasi, isi data diri, lalu lakukan transfer ke rekening yang tertera. Kami akan memverifikasi dalam 1×24 jam.',
  },
  {
    question: 'Apakah donasi saya aman?',
    answer: 'Ya, setiap donasi dikelola secara transparan. Kami menerbitkan laporan keuangan bulanan yang dapat diakses seluruh donatur. LKSA Dapur Yatim terdaftar dan diawasi oleh Dinas Sosial.',
  },
  {
    question: 'Kapan laporan keuangan dipublikasikan?',
    answer: 'Laporan bulanan dipublikasikan setiap awal bulan — biasanya minggu pertama. Anda dapat mengaksesnya di halaman Transparansi website kami.',
  },
  {
    question: 'Bagaimana cara menjadi relawan?',
    answer: 'Kami selalu membuka peluang bagi siapa saja. Hubungi kami melalui WhatsApp +62 812-3456-7890 atau email ke info@dapuryatim.org dengan subjek "Pendaftaran Relawan".',
  },
];

function ChevronIcon({ open }) {
  return (
    <svg className={`w-5 h-5 text-on-surface-variant transition-transform duration-300 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
    </svg>
  );
}

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (idx) => setOpenIndex((prev) => (prev === idx ? null : idx));

  return (
    <section className="section-padding bg-surface">
      <div className="container-default">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wide">FAQ</span>
          </div>
          <h2 className="section-title">Pertanyaan yang Sering Diajukan</h2>
        </div>

        <div className="max-w-2xl mx-auto space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="bg-white rounded-2xl border border-outline-variant/30 overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-surface/50 transition-colors"
                >
                  <span className="font-bold text-on-surface text-sm">{item.question}</span>
                  <ChevronIcon open={isOpen} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="px-5 pb-4 text-sm text-on-surface-variant leading-relaxed">{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ mode: 'onTouched' });
  const pesanValue = watch('pesan', '');

  const onSubmit = async (data) => {
    setSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);
    try {
      await contactApi.send({ name: data.namaLengkap, email: data.email, subject: data.subjek, message: data.pesan });
      setSubmitSuccess(true);
      reset();
    } catch (err) {
      setSubmitError(err?.message || 'Gagal mengirim pesan. Silakan coba lagi.');
    } finally {
      setSubmitting(false);
    }
  };

  const FieldError = ({ name }) => errors[name] ? <p className="mt-1 text-xs text-red-500">{errors[name].message}</p> : null;

  return (
    <PageLayout
      title="Hubungi Kami"
      subtitle="Kami siap membantu. Jangan ragu untuk menghubungi kami."
      breadcrumbs={[{ label: 'Kontak' }]}
    >
      <section className="section-padding">
        <div className="container-default">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="card-elevated p-6">
                <h3 className="text-lg font-bold text-on-surface mb-6">Informasi Kontak</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide mb-1">Alamat</p>
                      <p className="text-sm text-on-surface">
                        Bojongmalaka Baleendah, Jl. Terusan Purawijaya<br />
                        Kp. Kerenceng Ds. Bojong Malaka No. 99, RT.06/RW.05<br />
                        Kec. Baleendah, Kabupaten Bandung, Jawa Barat 40375
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide mb-1">WhatsApp</p>
                      <a href="tel:+6281234567890" className="text-sm text-on-surface hover:text-primary transition-colors">+62 812-3456-7890</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide mb-1">Email</p>
                      <a href="mailto:info@dapuryatim.org" className="text-sm text-on-surface hover:text-primary transition-colors">info@dapuryatim.org</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide mb-1">Jam Operasional</p>
                      <p className="text-sm text-on-surface">Senin - Jumat: 08.00 - 17.00</p>
                      <p className="text-sm text-on-surface-variant">Sabtu: 09.00 - 13.00</p>
                    </div>
                  </div>
                </div>

                <a
                  href="https://wa.me/6281234567890?text=Halo%20Dapur%20Yatim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-green-500 text-white font-bold hover:bg-green-600 transition-all hover:scale-[1.02] shadow-lg shadow-green-500/20"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Chat via WhatsApp
                </a>
              </div>

              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/20">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  </svg>
                  <span className="font-bold text-on-surface">Lokasi Kami</span>
                </div>
                <p className="text-sm text-on-surface-variant mb-4">Bojongmalaka, Kec. Baleendah, Kabupaten Bandung</p>
                <a
                  href="https://share.google/8nG5XKKpKlHnWU5yL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                >
                  Buka di Google Maps
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="card-elevated p-6 sm:p-8">
                <h3 className="text-lg font-bold text-on-surface mb-6">Kirim Pesan</h3>

                {submitSuccess && (
                  <div className="mb-6 rounded-2xl bg-green-50 border border-green-200 p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold text-green-800 mb-1">Pesan Terkirim!</p>
                        <p className="text-sm text-green-700">Kami akan merespons dalam 1×24 jam.</p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                  <div>
                    <label htmlFor="namaLengkap" className="input-label">Nama Lengkap <span className="text-red-500">*</span></label>
                    <input id="namaLengkap" type="text" placeholder="Masukkan nama lengkap" className={`input-field ${errors.namaLengkap ? 'border-red-400' : ''}`} {...register('namaLangkal', { required: 'Nama wajib diisi', minLength: { value: 2, message: 'Min 2 karakter' } })} />
                    <FieldError name="namaLengkap" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="input-label">Email <span className="text-red-500">*</span></label>
                      <input id="email" type="email" placeholder="email@example.com" className={`input-field ${errors.email ? 'border-red-400' : ''}`} {...register('email', { required: 'Email wajib diisi', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Format tidak valid' } })} />
                      <FieldError name="email" />
                    </div>
                    <div>
                      <label htmlFor="subjek" className="input-label">Subjek <span className="text-red-500">*</span></label>
                      <input id="subjek" type="text" placeholder="Topik pesan" className={`input-field ${errors.subjek ? 'border-red-400' : ''}`} {...register('subjek', { required: 'Subjek wajib diisi', minLength: { value: 5, message: 'Min 5 karakter' } })} />
                      <FieldError name="subjek" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="pesan" className="input-label">Pesan <span className="text-red-500">*</span></label>
                    <textarea id="pesan" rows={5} placeholder="Tuliskan pesan Anda..." className={`input-field resize-none ${errors.pesan ? 'border-red-400' : ''}`} {...register('pesan', { required: 'Pesan wajib diisi', minLength: { value: 10, message: 'Min 10 karakter' } })} />
                    <div className="flex justify-between mt-1">
                      <FieldError name="pesan" />
                      <span className={`text-xs ${pesanValue.length > 950 ? 'text-red-500' : 'text-on-surface-variant'}`}>{pesanValue.length}/1000</span>
                    </div>
                  </div>

                  {submitError && (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      {submitError}
                    </p>
                  )}

                  <button type="submit" disabled={submitting} className="btn-primary w-full py-4 text-base disabled:opacity-60">
                    {submitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                        Mengirim...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                        Kirim Pesan
                      </span>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQAccordion />
    </PageLayout>
  );
}