import { Link } from 'react-router-dom'
import logo from '../../assets/logo-dapuryatim.svg'

const QUICK_LINKS = [
  { label: 'Beranda', path: '/' },
  { label: 'Tentang Kami', path: '/tentang' },
  { label: ' kegiatan', path: '/k kegiatan' },
  { label: 'Donasi', path: '/donasi' },
  { label: 'Transparansi', path: '/transparansi' },
  { label: 'Kontak', path: '/kontak' },
]

export default function Footer() {
  return (
    <footer className="bg-on-surface text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 pattern-grid" />
      </div>

      <div className="container-default py-12 lg:py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="md:col-span-2 lg:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <img
                src={logo}
                alt="LKSA Dapur Yatim Logo"
                className="w-12 h-12 object-contain"
              />
              <div>
                <span className="font-bold text-white text-lg">LKSA Dapur Yatim</span>
                <p className="text-white/50 text-xs">Lembaga Kesejahteraan Sosial Anak</p>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-sm">
              Mengisi hari anak yatim dan dhuafa dengan harapan, pendidikan, dan kasih sayang melalui pengelolaan dana yang transparan dan akuntabel.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-green-500 hover:scale-110 transition-all duration-200"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a
                href="mailto:info@dapuryatim.org"
                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-200"
                aria-label="Email"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-primary" />
              Navigasi
            </h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/50 hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-2"
                  >
                    <span className="text-xs text-primary">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-secondary" />
              Hubungi Kami
            </h4>
            <address className="not-italic space-y-3 text-sm text-white/50">
              <p className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span>
                  Bojongmalaka Baleendah, Jl. Terusan Purawijaya<br />
                  Kp. Kerenceng Ds. Bojong Malaka No. 99, RT.06/RW.05<br />
                  Kabupaten Bandung, Jawa Barat 40375
                </span>
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <a href="tel:+6281234567890" className="hover:text-white transition-colors">
                  +62 812-3456-7890
                </a>
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0 text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <a href="mailto:info@dapuryatim.org" className="hover:text-white transition-colors">
                  info@dapuryatim.org
                </a>
              </p>
            </address>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-xs text-white/30">Jam Operasional</p>
              <p className="text-xs text-white/50">Senin - Jumat: 08.00 - 17.00</p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-tertiary" />
              Lokasi Kami
            </h4>
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg h-36 relative group">
              <iframe
                title="Peta Lokasi Dapur Yatim"
                src="https://maps.google.com/maps?q=Bojongmalaka%20Baleendah%20Jl.%20Terusan%20Purawijaya,%20Kp.%20Kerenceng%20Ds.%20Bojong%20Malaka%20No.99,%20RT./RW/RW.06/05,%20Bojongmalaka,%20Kec.%20Baleendah,%20Kabupaten%20Bandung,%20Jawa%20Barat%2040375&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
              <a
                href="https://share.google/8nG5XKKpKlHnWU5yL"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-2 right-2 bg-primary hover:bg-primary-dark text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-md transition-colors flex items-center gap-1"
              >
                <span>Petunjuk Arah</span>
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/30">
              © {new Date().getFullYear()} LKSA Dapur Yatim
            </span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="hidden sm:inline text-xs text-white/30">Semua hak dilindungi</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/40">
              Terdaftar Kemensos RI
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}