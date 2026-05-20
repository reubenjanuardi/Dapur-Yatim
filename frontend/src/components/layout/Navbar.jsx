import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/logo-dapuryatim.svg'

const NAV_LINKS = [
  { label: 'Beranda', path: '/' },
  { label: 'Tentang Kami', path: '/tentang' },
  { label: ' kegiatan', path: '/kegiatan' },
  { label: 'Transparansi', path: '/transparansi' },
  { label: 'Kontak', path: '/kontak' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setIsOpen(false), [location])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-outline-variant/30'
        : 'bg-white/80 backdrop-blur-md'
        }`}
    >
      <div className="container-default">
        <div className="flex items-center justify-between h-14 md:h-16">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src={logo}
              alt="Dapur Yatim Logo"
              className="w-10 h-10 object-contain transition-transform group-hover:scale-105 duration-200"
            />
            <div className="hidden sm:block">
              <span className="block font-bold text-on-surface text-base tracking-tight leading-tight">Panti Asuhan Dapur Yatim</span>
              <span className="hidden lg:block text-xs text-on-surface-variant leading-tight">Lembaga Kesejahteraan Sosial Anak (LKSA)</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${location.pathname === link.path
                  ? 'bg-primary text-white shadow-md shadow-primary/25'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link to="/donasi" className="btn-primary text-sm shadow-lg shadow-tertiary-container/30">
              Donasi Sekarang
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2.5 rounded-xl hover:bg-surface-container active:bg-surface-high transition-colors"
            aria-label="Toggle menu"
          >
            <div className="relative w-5 h-5">
              <span
                className={`absolute left-0 h-0.5 bg-on-surface transition-all duration-300 rounded-full ${isOpen ? 'top-1/2 -translate-y-1/2 rotate-45 w-full' : 'top-0 w-full'
                  }`}
              />
              <span
                className={`absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-on-surface transition-all duration-300 rounded-full ${isOpen ? 'opacity-0 w-full' : 'opacity-100 w-full'
                  }`}
              />
              <span
                className={`absolute left-0 h-0.5 bg-on-surface transition-all duration-300 rounded-full ${isOpen ? 'top-1/2 -translate-y-1/2 -rotate-45 w-full' : 'bottom-0 w-full'
                  }`}
              />
            </div>
          </button>
        </div>

        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-out ${isOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'
            }`}
        >
          <nav className="space-y-1 pt-2">
            {NAV_LINKS.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${location.pathname === link.path
                  ? 'text-primary bg-primary/10'
                  : 'text-on-surface-variant'
                  }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {location.pathname === link.path && (
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                )}
                {link.label}
              </Link>
            ))}
            <Link
              to="/donasi"
              className="btn-primary w-full mt-3 text-center justify-center text-sm"
            >
              Donasi Sekarang
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}