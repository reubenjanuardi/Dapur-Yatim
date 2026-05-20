import { Link } from 'react-router-dom'

const STATS = [
  { value: '250+', label: 'Anak Terlayani' },
  { value: 'Rp 1,2 M', label: 'Dana Disalurkan' },
  { value: '98%', label: 'Transparansi Laporan' },
  { value: '5 Thn', label: 'Pengalaman Melayani' },
]

const PROGRAMS = [
  {
    icon: '🍱',
    title: 'Program Makan Bergizi',
    desc: 'Menyediakan makanan sehat dan bergizi setiap hari untuk anak-anak yatim di lingkungan binaan kami.',
  },
  {
    icon: '📚',
    title: 'Beasiswa Pendidikan',
    desc: 'Memberikan dukungan biaya pendidikan dari tingkat SD hingga SMA agar tidak ada anak yang putus sekolah.',
  },
  {
    icon: '🏥',
    title: 'Kesehatan & Medis',
    desc: 'Pemeriksaan kesehatan rutin dan akses layanan medis gratis bagi anak yatim dan keluarga dhuafa.',
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary/5 via-surface to-secondary/5">
        <div className="container-default">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary text-sm font-semibold rounded-full mb-6">
              Lembaga Terpercaya Sejak 2019
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-on-surface leading-tight tracking-tight mb-6">
              Bersama Kita Wujudkan{' '}
              <span className="text-primary">Masa Depan</span> yang Lebih Baik
            </h1>
            <p className="text-lg text-on-surface-variant leading-relaxed mb-8 max-w-xl mx-auto">
              Setiap donasi Anda dikelola dengan penuh amanah dan transparansi. Bersama LKSA Dapur Yatim,
              mari pastikan setiap anak yatim mendapat hak atas pangan, pendidikan, dan kasih sayang.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/donasi" className="btn-primary">
                Donasi Sekarang
              </Link>
              <Link to="/transparansi" className="btn-secondary">
                Lihat Laporan Keuangan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y border-outline-variant/30">
        <div className="container-default">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-on-surface-variant mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="section-padding">
        <div className="container-default">
          <div className="text-center mb-12">
            <h2 className="section-title">Program Unggulan Kami</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Setiap program dirancang untuk memenuhi kebutuhan mendasar anak yatim dan dhuafa secara menyeluruh.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROGRAMS.map((program) => (
              <div key={program.title} className="card">
                <div className="text-4xl mb-4">{program.icon}</div>
                <h3 className="text-lg font-semibold text-on-surface mb-2">{program.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{program.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary">
        <div className="container-default text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Siap Memberikan Dampak Nyata?</h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            Donasi Anda, sebesar apapun, akan langsung terasa manfaatnya oleh anak-anak yang membutuhkan.
          </p>
          <Link
            to="/donasi"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-surface-low transition-colors"
          >
            Mulai Berdonasi
          </Link>
        </div>
      </section>
    </>
  )
}
