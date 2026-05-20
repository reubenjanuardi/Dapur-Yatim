import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import Card from '../components/common/Card';

function useInView(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleIntersect = useCallback(([entry]) => {
    if (entry.isIntersecting) setIsVisible(true);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(handleIntersect, { threshold: 0.12, rootMargin: '0px 0px -40px 0px', ...options });
    observer.observe(node);
    return () => observer.disconnect();
  }, [handleIntersect, options]);

  return { ref, isVisible };
}

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

const STATS = [
  { value: '250+', label: 'Anak Binaan', color: 'primary', icon: '👶' },
  { value: '5 Thn', label: 'Berdiri', color: 'secondary', icon: '🏛️' },
  { value: 'Rp 1,2 M', label: 'Disalurkan', color: 'tertiary', icon: '💰' },
  { value: '98%', label: 'Transparan', color: 'primary', icon: '📊' },
];

const MISI_POINTS = [
  'Memberikan pendidikan berkualitas dan beasiswa bagi anak-anak yatim dan dhuafa.',
  'Memastikan terpenuhinya kebutuhan gizi, sandang, dan pangan bagi seluruh anak.',
  'Membangun karakter islami yang berakhlak mulia melalui program pembinaan spiritual.',
  'Menjaga transparansi dan akuntabilitas pengelolaan dana donasi kepada seluruh pemangku.',
];

const LEGAL_BADGES = [
  {
    title: 'Izin Kemensos RI',
    desc: 'Terdaftar resmi di Kementerian Sosial dengan nomor 04.02.1/LSM/1234/2019.',
    color: 'primary',
    icon: '📋',
  },
  {
    title: 'NPWP Terdaftar',
    desc: 'Memiliki NPWP aktif dan taat terhadap kewajiban perpajakan.',
    color: 'secondary',
    icon: '🏛️',
  },
  {
    title: 'Rekening Resmi BRI',
    desc: 'Transaksi donasi melalui rekening lembaga resmi di Bank BRI.',
    color: 'tertiary',
    icon: '🏦',
  },
  {
    title: 'Audit Keuangan',
    desc: 'Laporan keuangan diaudit independen setiap tahun.',
    color: 'primary',
    icon: '📈',
  },
];

const TEAM = [
  { name: 'Ustadz Ahmad Fauzi', role: 'Ketua Yayasan', initials: 'AF', color: 'primary' },
  { name: 'Ibu Sari Dewi', role: 'Sekretaris', initials: 'SD', color: 'secondary' },
  { name: 'Bapak Hendra Pratama', role: 'Bendahara', initials: 'HP', color: 'tertiary' },
  { name: 'Ibu Nur Aisyah', role: 'Koordinator Program', initials: 'NA', color: 'primary' },
];

const WA_TEXT = encodeURIComponent("Assalamu'alaikum, saya ingin mengetahui lebih lanjut tentang LKSA Dapur Yatim.");
const WA_URL = `https://wa.me/6281234567890?text=${WA_TEXT}`;

export default function AboutPage() {
  return (
    <PageLayout
      title="Tentang Kami"
      subtitle="Mengenal lebih dekat LKSA Dapur Yatim — lembaga yang hadir untuk mendampingi dan memberdayakan anak-anak yatim dan dhuafa."
      breadcrumbs={[{ label: 'Tentang Kami' }]}
    >
      <section className="section-padding bg-surface">
        <div className="container-default">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-semibold text-primary uppercase tracking-wide">Profil Lembaga</span>
              </div>
              <h2 className="section-title">Berdiri dengan Niat Tulus</h2>
              <p className="section-subtitle max-w-2xl mx-auto">
                Memberikan perubahan nyata bagi generasi penerus bangsa sejak 2019.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <AnimatedSection delay={100}>
              <div className="prose prose-lg text-on-surface-variant">
                <p>
                  <strong className="text-primary text-xl">LKSA Dapur Yatim</strong> adalah Lembaga Kesejahteraan Sosial Anak yang didirikan pada tahun 2019 di Bandung, Jawa Barat. Kami hadir sebagai jembatan kebaikan antara para donatur dan anak-anak yatim serta dhuafa yang membutuhkan.
                </p>
                <p>
                  Terdaftar resmi di Kementerian Sosial Republik Indonesia dengan nomor <span className="font-semibold text-on-surface">04.02.1/LSM/1234/2019</span>, kami beroperasi dengan prinsip transparansi, amanah, dan keberlanjutan.
                </p>
                <p>
                  Selama lebih dari lima tahun, kami telah mendampingi lebih dari 250 anak binaan melalui program pangan, pendidikan, dan pembinaan karakter islami.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="grid grid-cols-2 gap-4">
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className={`bg-${stat.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
                  >
                    <span className="text-3xl block mb-2">{stat.icon}</span>
                    <span className="text-3xl font-extrabold block">{stat.value}</span>
                    <span className="text-sm font-medium opacity-90">{stat.label}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-default">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary/10 rounded-full mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                <span className="text-xs font-semibold text-secondary uppercase tracking-wide">Visi & Misi</span>
              </div>
              <h2 className="section-title">Landasan Nilai Kami</h2>
              <p className="section-subtitle max-w-xl mx-auto">
                Mengarahkan setiap langkah dan program kami untuk memberikan yang terbaik.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatedSection delay={100}>
              <div className="h-full bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">Visi</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Menjadi lembaga sosial terpercaya yang mampu mewujudkan anak-anak yatim dan dhuafa sebagai generasi yang mandiri, berakhlak mulia, berprestasi, dan berkontribusi nyata bagi agama, bangsa, dan masyarakat Indonesia.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="h-full bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-2xl p-8 border border-secondary/20">
                <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-secondary mb-4">Misi</h3>
                <ul className="space-y-3">
                  {MISI_POINTS.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-on-surface-variant">
                      <span className="mt-1 w-5 h-5 rounded-full bg-secondary/20 text-secondary text-xs font-bold flex items-center justify-center flex-shrink-0">
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

      <section className="section-padding bg-surface">
        <div className="container-default">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-tertiary/10 rounded-full mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
                <span className="text-xs font-semibold text-tertiary uppercase tracking-wide">Legalitas & Kepercayaan</span>
              </div>
              <h2 className="section-title">Operasi Legal & Transparan</h2>
              <p className="section-subtitle max-w-xl mx-auto">
                Kepercayaan Anda adalah prioritas utama kami.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {LEGAL_BADGES.map((badge, i) => (
              <AnimatedSection key={badge.title} delay={i * 80}>
                <Card className="text-center p-6 hover:-translate-y-1 transition-all duration-300">
                  <div className={`w-14 h-14 rounded-2xl bg-${badge.color}/10 flex items-center justify-center mx-auto mb-4`}>
                    <span className="text-2xl">{badge.icon}</span>
                  </div>
                  <h3 className="font-bold text-on-surface mb-2">{badge.title}</h3>
                  <p className="text-sm text-on-surface-variant">{badge.desc}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-default">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="section-title">Tim Pengurus</h2>
              <p className="section-subtitle max-w-xl mx-auto">
                Dikelola oleh individu berpengalaman di bidang sosial dan kemanusiaan.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {TEAM.map((member, i) => (
              <AnimatedSection key={member.name} delay={i * 80}>
                <Card className="text-center p-6 hover:-translate-y-1 transition-all duration-300">
                  <div className={`w-20 h-20 rounded-2xl bg-${member.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <span className="text-white text-xl font-extrabold">{member.initials}</span>
                  </div>
                  <p className="font-bold text-on-surface">{member.name}</p>
                  <p className="text-sm text-on-surface-variant mt-1">{member.role}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-r from-primary to-primary-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 pattern-grid" />
        </div>
        <div className="container-default relative">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
                Bersama Wujudkan Masa Depan Cerah untuk Anak Yatim
              </h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Setiap kontribusi Anda adalah cahaya harapan bagi mereka yang membutuhkan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-green-500 hover:bg-green-600 transition-all hover:scale-105 shadow-lg"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Hubungi via WhatsApp
                </a>
                <Link
                  to="/donasi"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-primary bg-white hover:bg-surface-low transition-all hover:scale-105 shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
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