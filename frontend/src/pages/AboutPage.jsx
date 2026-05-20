import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

// ---------------------------------------------------------------------------
// Custom hook: useInView – triggers fade-in once element enters the viewport
// ---------------------------------------------------------------------------
function useInView(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleIntersect = useCallback(([entry]) => {
    if (entry.isIntersecting) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
      ...options,
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, [handleIntersect, options]);

  return { ref, isVisible };
}

// ---------------------------------------------------------------------------
// Helper: animated section wrapper
// ---------------------------------------------------------------------------
function AnimatedSection({ children, className = '', delay = 0 }) {
  const { ref, isVisible } = useInView();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const STATS = [
  { value: '250+', label: 'Anak Binaan', color: 'bg-primary', textColor: 'text-white' },
  { value: '5 Thn', label: 'Berdiri', color: 'bg-secondary', textColor: 'text-white' },
  { value: 'Rp 1,2 M', label: 'Disalurkan', color: 'bg-tertiary', textColor: 'text-white' },
  { value: '98%', label: 'Laporan Transparan', color: 'bg-[#1D3557]', textColor: 'text-white' },
];

const MISI_POINTS = [
  'Memberikan pendidikan berkualitas dan beasiswa bagi anak-anak yatim dan dhuafa yang membutuhkan.',
  'Memastikan terpenuhinya kebutuhan gizi, sandang, dan pangan bagi seluruh anak binaan.',
  'Membangun karakter islami yang berakhlak mulia melalui program pembinaan spiritual rutin.',
  'Menjaga transparansi dan akuntabilitas pengelolaan dana donasi kepada seluruh pemangku kepentingan.',
];

const LEGAL_BADGES = [
  {
    icon: '📋',
    title: 'Izin Operasional Kemensos RI',
    desc: 'Terdaftar resmi di Kementerian Sosial Republik Indonesia dengan nomor 04.02.1/LSM/1234/2019.',
  },
  {
    icon: '🏛️',
    title: 'NPWP Lembaga Terdaftar',
    desc: 'Memiliki Nomor Pokok Wajib Pajak (NPWP) yang aktif dan taat terhadap kewajiban perpajakan.',
  },
  {
    icon: '🏦',
    title: 'Rekening Resmi BRI',
    desc: 'Seluruh transaksi dana donasi dilakukan melalui rekening lembaga resmi di Bank BRI.',
  },
  {
    icon: '📊',
    title: 'Audit Keuangan Tahunan',
    desc: 'Laporan keuangan diaudit secara independen setiap tahun dan dipublikasikan kepada publik.',
  },
];

const TEAM = [
  {
    name: 'Ustadz Ahmad Fauzi',
    role: 'Ketua Yayasan',
    initials: 'AF',
    bg: 'bg-primary',
  },
  {
    name: 'Ibu Sari Dewi',
    role: 'Sekretaris',
    initials: 'SD',
    bg: 'bg-secondary',
  },
  {
    name: 'Bapak Hendra Pratama',
    role: 'Bendahara',
    initials: 'HP',
    bg: 'bg-tertiary',
  },
  {
    name: 'Ibu Nur Aisyah',
    role: 'Koordinator Program',
    initials: 'NA',
    bg: 'bg-[#1D3557]',
  },
];

const WA_TEXT = encodeURIComponent(
  'Assalamu\'alaikum, saya ingin mengetahui lebih lanjut tentang LKSA Dapur Yatim.'
);
const WA_URL = `https://wa.me/6281234567890?text=${WA_TEXT}`;

// ---------------------------------------------------------------------------
// AboutPage
// ---------------------------------------------------------------------------
export default function AboutPage() {
  const breadcrumbs = [{ label: 'Tentang Kami' }];

  return (
    <PageLayout
      title="Tentang Kami"
      subtitle="Mengenal lebih dekat LKSA Dapur Yatim — lembaga yang hadir untuk mendampingi, mendidik, dan memberdayakan anak-anak yatim dan dhuafa di Bandung sejak 2019."
      breadcrumbs={breadcrumbs}
    >
      {/* ================================================================
          1. PROFIL LEMBAGA
      ================================================================ */}
      <section className="section-padding bg-surface">
        <div className="container-default">
          <AnimatedSection>
            <h2 className="section-title">Profil Lembaga</h2>
            <p className="section-subtitle">
              Berdiri dengan niat tulus untuk memberikan perubahan nyata bagi generasi penerus bangsa.
            </p>
          </AnimatedSection>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left: text */}
            <AnimatedSection delay={100}>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  <strong className="text-primary">LKSA Dapur Yatim</strong> adalah Lembaga Kesejahteraan
                  Sosial Anak (LKSA) yang didirikan pada tahun 2019 di Bandung, Jawa Barat. Kami hadir
                  sebagai jembatan kebaikan antara para donatur yang ingin bermanfaat dan anak-anak yatim
                  serta dhuafa yang membutuhkan uluran tangan.
                </p>
                <p>
                  Terdaftar resmi di Kementerian Sosial Republik Indonesia dengan nomor{' '}
                  <span className="font-semibold text-gray-800">04.02.1/LSM/1234/2019</span>, kami
                  beroperasi penuh dengan prinsip transparansi, amanah, dan keberlanjutan. Setiap rupiah
                  yang dipercayakan kepada kami dikelola secara profesional dan dilaporkan secara berkala
                  kepada seluruh pemangku kepentingan.
                </p>
                <p>
                  Selama lebih dari lima tahun berkiprah, kami telah mendampingi lebih dari 250 anak
                  binaan melalui berbagai program — mulai dari pemenuhan kebutuhan pangan dan gizi,
                  beasiswa pendidikan, pembinaan karakter islami, hingga pemberdayaan keluarga prasejahtera.
                </p>
              </div>
            </AnimatedSection>

            {/* Right: stats grid */}
            <AnimatedSection delay={200}>
              <div className="grid grid-cols-2 gap-4">
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className={`${stat.color} ${stat.textColor} rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-md`}
                  >
                    <span className="text-3xl font-extrabold tracking-tight">{stat.value}</span>
                    <span className="mt-1 text-sm font-medium opacity-90">{stat.label}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ================================================================
          2. VISI & MISI
      ================================================================ */}
      <section className="section-padding bg-white">
        <div className="container-default">
          <AnimatedSection>
            <h2 className="section-title">Visi &amp; Misi</h2>
            <p className="section-subtitle">
              Landasan nilai yang mengarahkan setiap langkah dan program kami.
            </p>
          </AnimatedSection>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Visi */}
            <AnimatedSection delay={100}>
              <div className="h-full rounded-2xl bg-primary/5 border border-primary/20 p-8 flex flex-col gap-4">
                <div className="text-4xl" aria-hidden="true">🎯</div>
                <h3 className="text-xl font-bold text-primary">Visi</h3>
                <p className="text-gray-700 leading-relaxed">
                  Menjadi lembaga sosial terpercaya yang mampu mewujudkan anak-anak yatim dan dhuafa
                  sebagai generasi yang mandiri, berakhlak mulia, berprestasi, dan berkontribusi nyata
                  bagi agama, bangsa, dan masyarakat Indonesia.
                </p>
              </div>
            </AnimatedSection>

            {/* Misi */}
            <AnimatedSection delay={200}>
              <div className="h-full rounded-2xl bg-secondary/5 border border-secondary/20 p-8 flex flex-col gap-4">
                <div className="text-4xl" aria-hidden="true">🌱</div>
                <h3 className="text-xl font-bold text-secondary">Misi</h3>
                <ul className="space-y-3">
                  {MISI_POINTS.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700 leading-relaxed">
                      <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-secondary/20 text-secondary text-xs font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ================================================================
          3. LEGALITAS & KEPERCAYAAN
      ================================================================ */}
      <section className="section-padding bg-surface">
        <div className="container-default">
          <AnimatedSection>
            <h2 className="section-title">Legalitas &amp; Kepercayaan</h2>
            <p className="section-subtitle">
              Kami beroperasi secara legal dan transparan agar kepercayaan Anda selalu terjaga.
            </p>
          </AnimatedSection>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LEGAL_BADGES.map((badge, i) => (
              <AnimatedSection key={badge.title} delay={i * 80}>
                <Card className="h-full flex flex-col items-center text-center p-6 gap-4 hover:shadow-lg transition-shadow duration-300">
                  <div
                    className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-3xl"
                    aria-hidden="true"
                  >
                    {badge.icon}
                  </div>
                  <h3 className="font-bold text-gray-800 text-base leading-snug">{badge.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{badge.desc}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          4. TIM PENGURUS
      ================================================================ */}
      <section className="section-padding bg-white">
        <div className="container-default">
          <AnimatedSection>
            <h2 className="section-title">Tim Pengurus</h2>
            <p className="section-subtitle">
              Dikelola oleh individu-individu berdedikasi yang berpengalaman di bidang sosial dan kemanusiaan.
            </p>
          </AnimatedSection>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            {TEAM.map((member, i) => (
              <AnimatedSection key={member.name} delay={i * 80}>
                <Card className="flex flex-col items-center text-center p-6 gap-4 hover:shadow-lg transition-shadow duration-300">
                  {/* Avatar */}
                  <div
                    className={`w-20 h-20 rounded-full ${member.bg} flex items-center justify-center shadow-md`}
                    aria-label={`Foto ${member.name}`}
                  >
                    <span className="text-white text-2xl font-extrabold tracking-wide select-none">
                      {member.initials}
                    </span>
                  </div>

                  <div>
                    <p className="font-bold text-gray-800 text-sm sm:text-base leading-snug">
                      {member.name}
                    </p>
                    <p className="mt-1 text-xs sm:text-sm text-gray-500">{member.role}</p>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          5. CTA
      ================================================================ */}
      <section className="section-padding bg-primary">
        <div className="container-default">
          <AnimatedSection>
            <div className="flex flex-col items-center text-center gap-6">
              <div className="text-5xl" aria-hidden="true">🤝</div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight max-w-2xl">
                Bersama Kita Wujudkan Masa Depan Cerah untuk Anak Yatim
              </h2>
              <p className="text-white/80 max-w-xl leading-relaxed text-sm sm:text-base">
                Setiap kontribusi Anda, sebesar apapun, adalah cahaya harapan bagi mereka yang
                membutuhkan. Mari bergabung bersama ribuan donatur yang telah mempercayakan amanahnya
                kepada LKSA Dapur Yatim.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                {/* WhatsApp */}
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-green-500 hover:bg-green-600 active:bg-green-700 transition-colors duration-200 shadow-lg text-sm sm:text-base"
                  aria-label="Hubungi kami via WhatsApp"
                >
                  <span aria-hidden="true">💬</span>
                  Hubungi via WhatsApp
                </a>

                {/* Donasi */}
                <Link
                  to="/donasi"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-primary bg-white hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200 shadow-lg text-sm sm:text-base"
                  aria-label="Mulai berdonasi sekarang"
                >
                  <span aria-hidden="true">❤️</span>
                  Donasi Sekarang
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </PageLayout>
  );
}
