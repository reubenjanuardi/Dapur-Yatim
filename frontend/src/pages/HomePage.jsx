import { Link } from 'react-router-dom'
import heroImage from '../assets/hero-section.webp'

const STATS = [
  { value: '250+', label: 'Anak Terlayani', icon: '👶' },
  { value: 'Rp 1,2 M', label: 'Dana Disalurkan', icon: '💰' },
  { value: '98%', label: 'Transparansi', icon: '📊' },
  { value: '5 Thn', label: 'Pengalaman', icon: '⭐' },
]

const PROGRAMS = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    title: 'Program Makan Bergizi',
    desc: 'Menyediakan makanan sehat dan bergizi setiap hari untuk anak-anak yatim.',
    color: 'tertiary',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
      </svg>
    ),
    title: 'Beasiswa Pendidikan',
    desc: 'Dukungan biaya pendidikan dari SD hingga SMA agar tidak ada yang putus sekolah.',
    color: 'primary',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
      </svg>
    ),
    title: 'Kesehatan & Medis',
    desc: 'Pemeriksaan kesehatan rutin dan akses layanan medis gratis bagi anak yatim.',
    color: 'secondary',
  },
]

const IMPACT = [
  { value: '15.000+', label: 'Paket makanan terdistribusi' },
  { value: '850+', label: 'Beasiswa pendidikan diberikan' },
  { value: '2.500+', label: 'Pemeriksaan kesehatan gratis' },
]

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden min-h-[70vh] sm:min-h-[80vh] lg:min-h-[90vh] flex items-center text-white bg-black">
        {/* Full-Bleed Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={heroImage}
            alt="Anak-anak Dapur Yatim"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          {/* Dark Overlay Gradient (simulating the reference image look) */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/20 lg:via-black/55 lg:to-transparent z-10" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/45 to-transparent z-10" />
        </div>

        {/* Content Container */}
        <div className="container-default relative z-20 py-16 sm:py-24 w-full">
          <div className="max-w-2xl text-left">
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15] tracking-tight mb-6 text-white drop-shadow-md">
              Bersama Wujudkan Masa Depan Cerah Mereka!
            </h1>

            {/* Description Subhead */}
            <p className="text-base sm:text-lg lg:text-xl text-white/80 leading-relaxed mb-8 max-w-xl drop-shadow-sm">
              Setiap donasi Anda dikelola dengan penuh amanah. Bergabunglah dengan ribuan donatur yang telah memberikan harapan dan senyum bagi anak yatim & dhuafa.
            </p>

            {/* Hero Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-start items-stretch sm:items-center">
              <Link to="/donasi" className="btn-primary text-base px-8 py-4 shadow-xl shadow-primary-container/20 text-center">
                Donasi Sekarang
              </Link>
              <Link to="/tentang" className="btn-secondary text-base px-8 py-4 text-center">
                Pelajari Lebih Lanjut
              </Link>
            </div>
          </div>
        </div>

        {/* Dynamic Transition to next white bg section */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent z-20 pointer-events-none" />
      </section>

      <section className="py-10 md:py-14 bg-white border-b border-outline-variant/20">
        <div className="container-default">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {STATS.map((stat, index) => (
              <div
                key={stat.label}
                className="group relative bg-gradient-to-br from-surface to-surface-low rounded-2xl p-5 md:p-6 border border-outline-variant/30 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
                <div className="text-3xl mb-2">{stat.icon}</div>
                <p className="text-2xl md:text-3xl font-extrabold text-primary">{stat.value}</p>
                <p className="text-sm text-on-surface-variant mt-1 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-default">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wide">Program Unggulan</span>
            </div>
            <h2 className="section-title">Membawa Perubahan Nyata</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Program kami dirancang untuk memenuhi kebutuhan mendasar anak yatim secara menyeluruh.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {PROGRAMS.map((program, index) => (
              <div
                key={program.title}
                className="group card-elevated hover:-translate-y-2 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${
                  program.color === 'primary' ? 'bg-primary/10 text-primary' :
                  program.color === 'secondary' ? 'bg-secondary/10 text-secondary' :
                  'bg-tertiary/10 text-tertiary'
                }`}>
                  {program.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-on-surface mb-3">{program.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{program.desc}</p>
                <div className={`mt-5 pt-4 border-t border-outline-variant/20 flex items-center gap-2 text-sm font-semibold ${
                  program.color === 'primary' ? 'text-primary' :
                  program.color === 'secondary' ? 'text-secondary' :
                  'text-tertiary'
                }`}>
                  <span>Pelajari program</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-r from-primary to-primary-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 pattern-grid" />
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />

        <div className="container-default relative">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4">
              Dampak yang Telah Kita Ciptakan Bersama
            </h2>
            <p className="text-white/80 mb-8 max-w-lg mx-auto">
              Berkat dukungan para donatur, kami telah berhasil memberikan dampak positif bagi ratusan anak setiap tahunnya.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {IMPACT.map((item) => (
                <div key={item.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                  <p className="text-2xl md:text-3xl font-extrabold">{item.value}</p>
                  <p className="text-sm text-white/70 mt-1">{item.label}</p>
                </div>
              ))}
            </div>

            <Link
              to="/donasi"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-surface-low hover:scale-105 transition-all duration-200 shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              Mulai Berdonasi
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-default">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-title mb-4">Siap Memberikan Dampak?</h2>
            <p className="text-on-surface-variant mb-8 max-w-lg mx-auto">
              Setiap donasi, sebesar apapun, akan langsung terasa benefited oleh anak-anak yang membutuhkan. Mari bukti kan kepedulian Anda hari ini.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/donasi" className="btn-primary">
                Donasi Sekarang
              </Link>
              <Link to="/transparansi" className="btn-ghost">
                Lihat Laporan Keuangan
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}