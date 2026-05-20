/**
 * Component: PageLayout
 * Wrapper standar untuk semua halaman selain HomePage
 * Menampilkan page header dengan title, subtitle, dan breadcrumbs
 */
import { Link } from 'react-router-dom'

/**
 * @param {{
 *   children: React.ReactNode,
 *   title?: string,
 *   subtitle?: string,
 *   breadcrumbs?: Array<{label: string, path?: string}>
 * }} props
 */
export default function PageLayout({ children, title, subtitle, breadcrumbs }) {
  return (
    <>
      {/* Page Header */}
      {(title || breadcrumbs) && (
        <section className="bg-gradient-to-br from-primary/5 via-surface to-secondary/5 border-b border-outline-variant/30 py-10 md:py-14">
          <div className="container-default">
            {/* Breadcrumbs */}
            {breadcrumbs && breadcrumbs.length > 0 && (
              <nav aria-label="Breadcrumb" className="mb-4">
                <ol className="flex items-center gap-1.5 text-sm text-on-surface-variant">
                  <li>
                    <Link to="/" className="hover:text-primary transition-colors">
                      Beranda
                    </Link>
                  </li>
                  {breadcrumbs.map((crumb, index) => (
                    <li key={index} className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-outline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      {crumb.path && index < breadcrumbs.length - 1 ? (
                        <Link to={crumb.path} className="hover:text-primary transition-colors">
                          {crumb.label}
                        </Link>
                      ) : (
                        <span className="text-on-surface font-medium">{crumb.label}</span>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            {/* Title & Subtitle */}
            {title && (
              <div>
                <h1 className="section-title">{title}</h1>
                {subtitle && <p className="section-subtitle max-w-2xl">{subtitle}</p>}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Page Content */}
      <div>{children}</div>
    </>
  )
}
