import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Beranda', path: '/' },
  { label: 'Tentang Kami', path: '/tentang' },
  { label: 'Kegiatan', path: '/kegiatan' },
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
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-card border-b border-outline-variant/50' : 'bg-white/90 backdrop-blur-md'
      }`}
    >
      <div className="container-default">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">DY</span>
            </div>
            <span className="font-bold text-on-surface group-hover:text-primary transition-colors">
              Dapur Yatim
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'bg-primary/10 text-primary'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center">
            <Link to="/donasi" className="btn-primary text-sm px-5 py-2.5">
              Donasi Sekarang
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-surface-container transition-colors"
            aria-label="Toggle menu"
          >
            <span className="block w-5 h-0.5 bg-on-surface transition-all" />
            <span className="block w-5 h-0.5 bg-on-surface mt-1.5 transition-all" />
            <span className="block w-5 h-0.5 bg-on-surface mt-1.5 transition-all" />
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden border-t border-outline-variant/50 py-3 pb-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-primary bg-primary/10'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/donasi" className="btn-primary w-full mt-3 text-sm">
              Donasi Sekarang
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
