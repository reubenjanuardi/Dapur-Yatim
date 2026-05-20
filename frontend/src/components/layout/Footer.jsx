import { Link } from 'react-router-dom'

const QUICK_LINKS = [
  { label: 'Beranda', path: '/' },
  { label: 'Tentang Kami', path: '/tentang' },
  { label: 'Kegiatan', path: '/kegiatan' },
  { label: 'Donasi', path: '/donasi' },
  { label: 'Transparansi', path: '/transparansi' },
  { label: 'Kontak', path: '/kontak' },
]

export default function Footer() {
  return (
    <footer className="bg-on-surface text-white">
      <div className="container-default py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary-container flex items-center justify-center">
                <span className="text-white font-bold text-sm">DY</span>
              </div>
              <span className="font-bold text-white">LKSA Dapur Yatim</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Lembaga Kesejahteraan Sosial Anak yang berfokus pada pemenuhan kebutuhan anak yatim dan dhuafa
              dengan pengelolaan transparan dan akuntabel.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Navigasi</h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Kontak</h4>
            <address className="not-italic space-y-2 text-sm text-white/60">
              <p>Jl. Contoh No. 123, Bandung</p>
              <p>Jawa Barat 40000</p>
              <a href="tel:+6281234567890" className="block hover:text-white transition-colors">
                +62 812-3456-7890
              </a>
              <a href="mailto:info@dapuryatim.org" className="block hover:text-white transition-colors">
                info@dapuryatim.org
              </a>
            </address>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} LKSA Dapur Yatim. Semua hak dilindungi.
          </p>
          <p className="text-xs text-white/40">Terdaftar di Kementerian Sosial RI</p>
        </div>
      </div>
    </footer>
  )
}
