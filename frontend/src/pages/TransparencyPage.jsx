import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageLayout from '../components/layout/PageLayout'
import Button from '../components/common/Button'
import ProgressBar from '../components/common/ProgressBar'
import useApi from '../hooks/useApi'
import { reportApi, donationApi } from '../lib/api'
import { formatRupiah, formatRupiahShort, getMonthName } from '../lib/utils'

const CURRENT_YEAR = new Date().getFullYear()
const AVAILABLE_YEARS = [CURRENT_YEAR, CURRENT_YEAR - 1, CURRENT_YEAR - 2]

const FUND_ALLOCATIONS = [
  { label: 'Pangan & Gizi', percentage: 45, color: 'tertiary' },
  { label: 'Pendidikan', percentage: 25, color: 'primary' },
  { label: 'Kesehatan', percentage: 20, color: 'secondary' },
  { label: 'Operasional', percentage: 10, color: 'primary' },
]

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']

function StatSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-card animate-pulse">
      <div className="h-4 bg-surface-container rounded w-24 mb-3" />
      <div className="h-8 bg-surface-container rounded w-32 mb-2" />
      <div className="h-3 bg-surface-container rounded w-16" />
    </div>
  )
}

function TableRowSkeleton() {
  return (
    <tr className="border-b border-outline-variant/30 animate-pulse">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <td key={i} className="px-4 py-3"><div className="h-4 bg-surface-container rounded w-full" /></td>
      ))}
    </tr>
  )
}

function BarChart({ data }) {
  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-48 text-on-surface-variant text-sm">Belum ada data.</div>
  }

  const allValues = data.flatMap((d) => [d.income || 0, d.expense || 0])
  const maxValue = Math.max(...allValues, 1)
  const [tooltip, setTooltip] = useState(null)

  return (
    <div className="relative">
      <div className="flex">
        <div className="w-14 md:w-20 flex flex-col justify-between text-right pr-2 text-xs text-on-surface-variant h-40">
          <span>{formatRupiahShort(maxValue)}</span>
          <span>{formatRupiahShort(maxValue * 0.5)}</span>
          <span>Rp 0</span>
        </div>
        <div className="flex-1 relative">
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            {[0, 1, 2].map((i) => <div key={i} className="border-t border-outline-variant/30 w-full" />)}
          </div>
          <div className="flex items-end justify-around h-40 gap-1 md:gap-2 relative z-10">
            {MONTH_LABELS.map((monthLabel, index) => {
              const monthData = data.find((d) => (d.month - 1) === index)
              const incomeHeight = monthData ? (monthData.income / maxValue) * 100 : 0
              const expenseHeight = monthData ? (monthData.expense / maxValue) * 100 : 0

              return (
                <div key={monthLabel} className="flex items-end gap-0.5 md:gap-1 justify-center flex-1 group cursor-pointer"
                  onMouseEnter={() => monthData && setTooltip({ index, data: monthData, label: getMonthName(index + 1) })}
                  onMouseLeave={() => setTooltip(null)}>
                  <div className="w-2 md:w-3 rounded-t-sm bg-secondary/70 hover:bg-secondary transition-all" style={{ height: `${incomeHeight}%`, minHeight: monthData ? '2px' : '0' }} />
                  <div className="w-2 md:w-3 rounded-t-sm bg-tertiary/70 hover:bg-tertiary transition-all" style={{ height: `${expenseHeight}%`, minHeight: monthData ? '2px' : '0' }} />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {tooltip && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 bg-on-surface text-white text-xs rounded-xl px-3 py-2 shadow-xl whitespace-nowrap pointer-events-none">
          <p className="font-bold mb-1">{tooltip.label}</p>
          <p className="text-green-300">↑ {formatRupiahShort(tooltip.data.income)}</p>
          <p className="text-orange-300">↓ {formatRupiahShort(tooltip.data.expense)}</p>
        </div>
      )}

      <div className="flex ml-14 md:ml-20 mt-2">
        <div className="flex-1 flex justify-around">
          {MONTH_LABELS.map((label) => (
            <span key={label} className="text-xs text-on-surface-variant flex-1 text-center">{label}</span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 justify-center mt-4">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-secondary" />
          <span className="text-xs text-on-surface-variant">Pemasukan</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-tertiary" />
          <span className="text-xs text-on-surface-variant">Pengeluaran</span>
        </div>
      </div>
    </div>
  )
}

export default function TransparencyPage() {
  const [selectedYear, setSelectedYear] = useState(CURRENT_YEAR)

  const { data: statsData, loading: statsLoading } = useApi(donationApi.getStats, { immediate: true })
  const { data: reportsData, loading: reportsLoading, error: reportsError, refetch: refetchReports } = useApi(reportApi.getAll, { immediate: true, params: { year: selectedYear } })
  const { data: summaryData, loading: summaryLoading, refetch: refetchSummary } = useApi(reportApi.getSummary, { immediate: true, params: { year: selectedYear } })

  useEffect(() => { refetchReports({ year: selectedYear }); refetchSummary({ year: selectedYear }) }, [selectedYear])

  const stats = statsData?.data || {}
  const reports = reportsData?.data || []
  const monthlySummary = summaryData?.data?.monthly_summary || []

  return (
    <PageLayout
      title="Laporan Transparansi"
      subtitle="Kami berkomitmen terbuka dalam pengelolaan setiap donasi yang dipercayakan."
      breadcrumbs={[{ label: 'Transparansi' }]}
    >
      <section className="py-10 md:py-14 bg-white border-b border-outline-variant/20">
        <div className="container-default">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {statsLoading ? (
              [1, 2, 3].map((i) => <StatSkeleton key={i} />)
            ) : (
              <>
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-primary">Total Dana</span>
                  </div>
                  <p className="text-3xl font-extrabold text-primary">{formatRupiahShort(stats.total_amount || 0)}</p>
                  <p className="text-xs text-on-surface-variant mt-2">{formatRupiah(stats.total_amount || 0)}</p>
                </div>
                <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl p-6 border border-secondary/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-secondary">Total Donatur</span>
                  </div>
                  <p className="text-3xl font-extrabold text-secondary">{(stats.total_donors || 0).toLocaleString('id-ID')}</p>
                  <p className="text-xs text-on-surface-variant mt-2">Donatur Terdaftar</p>
                </div>
                <div className="bg-gradient-to-br from-tertiary/10 to-tertiary/5 rounded-2xl p-6 border border-tertiary/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-tertiary/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-tertiary">Anak Terlayani</span>
                  </div>
                  <p className="text-3xl font-extrabold text-tertiary">{(stats.total_children || 250)}+</p>
                  <p className="text-xs text-on-surface-variant mt-2">Penerima Manfaat</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-default">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-xs font-semibold text-secondary uppercase tracking-wide">Grafik Keuangan</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-on-surface">Ringkasan Keuangan</h2>
              <p className="text-on-surface-variant text-sm mt-1">Pemasukan vs pengeluaran per bulan</p>
            </div>
            <div className="flex items-center gap-2">
              {(AVAILABLE_YEARS).map((year) => (
                <button key={year} onClick={() => setSelectedYear(year)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${
                    selectedYear === year ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-white text-on-surface border-outline-variant hover:border-primary'
                  }`}>
                  {year}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-5 md:p-8 border border-outline-variant/30">
            {summaryLoading ? (
              <div className="h-48 flex items-center justify-center">
                <div className="text-on-surface-variant text-sm">Memuat data...</div>
              </div>
            ) : <BarChart data={monthlySummary} />}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container-default">
          <h2 className="text-2xl md:text-3xl font-bold text-on-surface mb-6">Laporan Bulanan {selectedYear}</h2>

          {reportsError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 text-red-700 text-sm flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              Gagal memuat laporan
            </div>
          )}

          <div className="overflow-x-auto rounded-2xl border border-outline-variant/40 bg-white shadow-card">
            <table className="w-full">
              <thead>
                <tr className="bg-surface-container/70 border-b border-outline-variant/40">
                  <th className="px-4 py-4 text-left text-xs font-bold text-on-surface-variant uppercase tracking-wide">Periode</th>
                  <th className="px-4 py-4 text-right text-xs font-bold text-on-surface-variant uppercase tracking-wide">Pemasukan</th>
                  <th className="px-4 py-4 text-right text-xs font-bold text-on-surface-variant uppercase tracking-wide">Pengeluaran</th>
                  <th className="px-4 py-4 text-right text-xs font-bold text-on-surface-variant uppercase tracking-wide">Saldo</th>
                  <th className="px-4 py-4 text-center text-xs font-bold text-on-surface-variant uppercase tracking-wide">Status</th>
                  <th className="px-4 py-4 text-center text-xs font-bold text-on-surface-variant uppercase tracking-wide">Dokumen</th>
                </tr>
              </thead>
              <tbody>
                {reportsLoading ? (
                  [1, 2, 3].map((i) => <TableRowSkeleton key={i} />)
                ) : reports.length === 0 ? (
                  <tr><td colSpan={6} className="px-4 py-12 text-center text-on-surface-variant">Belum ada laporan untuk tahun {selectedYear}.</td></tr>
                ) : (
                  reports.map((report) => {
                    const surplus = (report.total_income || 0) - (report.total_expense || 0)
                    const isDeficit = surplus < 0
                    return (
                      <tr key={report.id} className="border-b border-outline-variant/30 hover:bg-surface/50 transition-colors">
                        <td className="px-4 py-4 text-sm font-bold text-on-surface">{getMonthName(report.report_month)} {report.report_year}</td>
                        <td className="px-4 py-4 text-sm text-right font-semibold text-secondary">{formatRupiah(report.total_income)}</td>
                        <td className="px-4 py-4 text-sm text-right text-on-surface-variant">{formatRupiah(report.total_expense)}</td>
                        <td className={`px-4 py-4 text-sm text-right font-bold ${isDeficit ? 'text-red-500' : 'text-secondary'}`}>
                          {isDeficit ? '-' : '+'}{formatRupiah(Math.abs(surplus))}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">Terpublikasi</span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          {report.document_url ? (
                            <a href={report.document_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                              Unduh
                            </a>
                          ) : <span className="text-xs text-on-surface-variant">-</span>}
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white border-t border-outline-variant/20">
        <div className="container-default">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-tertiary" />
                <span className="text-xs font-semibold text-tertiary uppercase tracking-wide">Alokasi Dana</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-on-surface mb-3">Bagaimana Dana Anda Digunakan?</h2>
              <p className="text-on-surface-variant mb-8">Setiap rupiah dikelola dengan penuh amanah dan efisiensi.</p>
              <div className="space-y-4">
                {FUND_ALLOCATIONS.map((item) => (
                  <ProgressBar key={item.label} label={item.label} value={item.percentage} color={item.color} showPercentage size="lg" />
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-surface to-surface-container rounded-2xl p-6 border border-outline-variant/30">
              <h3 className="font-bold text-on-surface mb-5 flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                Prinsip Pengelolaan Kami
              </h3>
              <ul className="space-y-3">
                {[['Semua donasi dicatat dan dilaporkan bulanan', 'text-green-500'], ['Laporan diaudit independen setiap tahun', 'text-blue-500'], ['Donatur dapat akses data publik', 'text-purple-500'], ['Rekening lembaga terpisah dari pengurus', 'text-orange-500'], ['Notifikasi konfirmasi via email', 'text-primary']].map(([text, color]) => (
                  <li key={text} className="flex items-start gap-3 text-sm text-on-surface-variant">
                    <svg className={`w-5 h-5 ${color} flex-shrink-0 mt-0.5`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 bg-gradient-to-r from-primary to-primary-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 pattern-grid" />
        </div>
        <div className="container-default relative text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4">Yakin dengan Transparansi Kami?</h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">Bergabunglah dengan ratusan donatur yang telah mempercayakan amanah mereka.</p>
          <Link to="/donasi" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-surface-low hover:scale-105 transition-all shadow-xl">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
            Donasi Sekarang
          </Link>
        </div>
      </section>
    </PageLayout>
  )
}