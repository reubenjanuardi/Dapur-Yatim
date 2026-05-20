/**
 * TransparencyPage.jsx
 * Halaman transparansi keuangan — laporan donasi, chart, dan alokasi dana
 */
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
  { label: 'Pangan & Gizi', percentage: 45, color: 'tertiary', icon: '🍱' },
  { label: 'Pendidikan', percentage: 25, color: 'primary', icon: '📚' },
  { label: 'Kesehatan', percentage: 20, color: 'secondary', icon: '🏥' },
  { label: 'Operasional', percentage: 10, color: 'tertiary', icon: '⚙️' },
]

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']

/** Skeleton card loading */
function StatSkeleton() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-card animate-pulse">
      <div className="h-4 bg-surface-container rounded w-24 mb-3" />
      <div className="h-8 bg-surface-container rounded w-32 mb-2" />
      <div className="h-3 bg-surface-container rounded w-16" />
    </div>
  )
}

/** Skeleton tabel baris */
function TableRowSkeleton() {
  return (
    <tr className="border-b border-outline-variant/30 animate-pulse">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-4 bg-surface-container rounded w-full" />
        </td>
      ))}
    </tr>
  )
}

/** Bar chart sederhana menggunakan CSS div — tanpa library eksternal */
function BarChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-on-surface-variant text-sm">
        Belum ada data untuk tahun ini.
      </div>
    )
  }

  const allValues = data.flatMap((d) => [d.income || 0, d.expense || 0])
  const maxValue = Math.max(...allValues, 1)
  const [tooltip, setTooltip] = useState(null)

  return (
    <div className="relative">
      {/* Y-axis labels */}
      <div className="flex">
        <div className="w-16 flex flex-col justify-between text-right pr-2 text-xs text-on-surface-variant h-40">
          <span>{formatRupiahShort(maxValue)}</span>
          <span>{formatRupiahShort(maxValue * 0.5)}</span>
          <span>Rp 0</span>
        </div>

        {/* Bars area */}
        <div className="flex-1 relative">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            {[0, 1, 2].map((i) => (
              <div key={i} className="border-t border-outline-variant/30 w-full" />
            ))}
          </div>

          {/* Bars */}
          <div className="flex items-end justify-around h-40 gap-1 relative z-10">
            {MONTH_LABELS.map((monthLabel, index) => {
              const monthData = data.find((d) => (d.month - 1) === index)
              const incomeHeight = monthData ? (monthData.income / maxValue) * 100 : 0
              const expenseHeight = monthData ? (monthData.expense / maxValue) * 100 : 0

              return (
                <div
                  key={monthLabel}
                  className="flex-1 flex items-end gap-0.5 justify-center group cursor-pointer"
                  onMouseEnter={() => monthData && setTooltip({ index, data: monthData, label: getMonthName(index + 1) })}
                  onMouseLeave={() => setTooltip(null)}
                >
                  {/* Income bar */}
                  <div
                    className="flex-1 max-w-[10px] md:max-w-[14px] rounded-t-sm bg-secondary/70 hover:bg-secondary transition-all duration-300 relative"
                    style={{ height: `${incomeHeight}%`, minHeight: monthData ? '2px' : '0' }}
                  />
                  {/* Expense bar */}
                  <div
                    className="flex-1 max-w-[10px] md:max-w-[14px] rounded-t-sm bg-tertiary-container/70 hover:bg-tertiary-container transition-all duration-300"
                    style={{ height: `${expenseHeight}%`, minHeight: monthData ? '2px' : '0' }}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 bg-on-surface text-white text-xs rounded-lg px-3 py-2 shadow-lg whitespace-nowrap pointer-events-none">
          <p className="font-semibold">{tooltip.label}</p>
          <p>📈 Masuk: {formatRupiahShort(tooltip.data.income)}</p>
          <p>📉 Keluar: {formatRupiahShort(tooltip.data.expense)}</p>
          <p className={tooltip.data.surplus >= 0 ? 'text-green-300' : 'text-red-300'}>
            {tooltip.data.surplus >= 0 ? '✅' : '⚠️'} Surplus: {formatRupiahShort(Math.abs(tooltip.data.surplus))}
          </p>
        </div>
      )}

      {/* X-axis labels */}
      <div className="flex ml-16 mt-1">
        <div className="flex-1 flex justify-around">
          {MONTH_LABELS.map((label) => (
            <span key={label} className="text-xs text-on-surface-variant flex-1 text-center">
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 justify-center mt-3">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-secondary" />
          <span className="text-xs text-on-surface-variant">Pemasukan</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-tertiary-container" />
          <span className="text-xs text-on-surface-variant">Pengeluaran</span>
        </div>
      </div>
    </div>
  )
}

// ─── Main TransparencyPage ────────────────────────────────────────────────────

export default function TransparencyPage() {
  const [selectedYear, setSelectedYear] = useState(CURRENT_YEAR)

  // Fetch stats donasi
  const {
    data: statsData,
    loading: statsLoading,
  } = useApi(donationApi.getStats, { immediate: true })

  // Fetch laporan keuangan berdasarkan tahun terpilih
  const {
    data: reportsData,
    loading: reportsLoading,
    error: reportsError,
    refetch: refetchReports,
  } = useApi(reportApi.getAll, {
    immediate: true,
    params: { year: selectedYear },
  })

  // Fetch summary untuk chart
  const {
    data: summaryData,
    loading: summaryLoading,
    refetch: refetchSummary,
  } = useApi(reportApi.getSummary, {
    immediate: true,
    params: { year: selectedYear },
  })

  // Refetch saat tahun berubah
  useEffect(() => {
    refetchReports({ year: selectedYear })
    refetchSummary({ year: selectedYear })
  }, [selectedYear])

  const stats = statsData?.data || {}
  const reports = reportsData?.data || []
  const monthlySummary = summaryData?.data?.monthly_summary || []
  const availableYears = summaryData?.data?.available_years || AVAILABLE_YEARS

  return (
    <PageLayout
      title="Laporan Transparansi"
      subtitle="Kami berkomitmen untuk terbuka dan transparan dalam pengelolaan setiap donasi yang dipercayakan kepada kami."
      breadcrumbs={[{ label: 'Transparansi' }]}
    >
      {/* ─── Stats Section ─────────────────────────────────────────── */}
      <section className="py-12 bg-white border-b border-outline-variant/30">
        <div className="container-default">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statsLoading ? (
              [1, 2, 3].map((i) => <StatSkeleton key={i} />)
            ) : (
              <>
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20">
                  <p className="text-sm font-medium text-primary mb-1">Total Dana Terhimpun</p>
                  <p className="text-3xl font-bold text-primary">{formatRupiahShort(stats.total_amount || 0)}</p>
                  <p className="text-xs text-on-surface-variant mt-2">{formatRupiah(stats.total_amount || 0)}</p>
                </div>
                <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-xl p-6 border border-secondary/20">
                  <p className="text-sm font-medium text-secondary mb-1">Total Donatur</p>
                  <p className="text-3xl font-bold text-secondary">{(stats.total_donors || 0).toLocaleString('id-ID')}</p>
                  <p className="text-xs text-on-surface-variant mt-2">Donatur Terdaftar</p>
                </div>
                <div className="bg-gradient-to-br from-tertiary/10 to-tertiary/5 rounded-xl p-6 border border-tertiary/20">
                  <p className="text-sm font-medium text-tertiary mb-1">Anak Terlayani</p>
                  <p className="text-3xl font-bold text-tertiary">{(stats.total_children || 250).toLocaleString('id-ID')}+</p>
                  <p className="text-xs text-on-surface-variant mt-2">Penerima Manfaat Aktif</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ─── Chart Section ─────────────────────────────────────────── */}
      <section className="section-padding">
        <div className="container-default">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="section-title text-2xl">Ringkasan Keuangan</h2>
              <p className="text-on-surface-variant text-sm mt-1">Pemasukan vs pengeluaran per bulan</p>
            </div>
            {/* Filter tahun */}
            <div className="flex items-center gap-2">
              {(availableYears.length > 0 ? availableYears : AVAILABLE_YEARS).map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all ${
                    selectedYear === year
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-on-surface border-outline-variant hover:border-primary'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-6">
            {summaryLoading ? (
              <div className="h-48 flex items-center justify-center animate-pulse">
                <div className="text-on-surface-variant text-sm">Memuat chart...</div>
              </div>
            ) : (
              <BarChart data={monthlySummary} />
            )}
          </div>
        </div>
      </section>

      {/* ─── Reports Table Section ─────────────────────────────────── */}
      <section className="pb-16">
        <div className="container-default">
          <h2 className="section-title text-2xl mb-6">Laporan Bulanan {selectedYear}</h2>

          {reportsError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 text-red-700 text-sm">
              ⚠️ Gagal memuat laporan: {reportsError}
            </div>
          )}

          <div className="overflow-x-auto rounded-xl border border-outline-variant/40 bg-white shadow-card">
            <table className="w-full">
              <thead>
                <tr className="bg-surface-container/70 border-b border-outline-variant/40">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-on-surface-variant uppercase tracking-wide">Periode</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-on-surface-variant uppercase tracking-wide">Pemasukan</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-on-surface-variant uppercase tracking-wide">Pengeluaran</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-on-surface-variant uppercase tracking-wide">Surplus/Defisit</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-on-surface-variant uppercase tracking-wide">Status</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-on-surface-variant uppercase tracking-wide">Dokumen</th>
                </tr>
              </thead>
              <tbody>
                {reportsLoading ? (
                  [1, 2, 3].map((i) => <TableRowSkeleton key={i} />)
                ) : reports.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-on-surface-variant">
                      <span className="text-3xl block mb-2">📋</span>
                      Belum ada laporan keuangan untuk tahun {selectedYear}.
                    </td>
                  </tr>
                ) : (
                  reports.map((report) => {
                    const surplus = (report.total_income || 0) - (report.total_expense || 0)
                    const isDeficit = surplus < 0
                    return (
                      <tr key={report.id} className="border-b border-outline-variant/30 hover:bg-surface/50 transition-colors">
                        <td className="px-4 py-3 text-sm font-medium text-on-surface">
                          {getMonthName(report.report_month)} {report.report_year}
                        </td>
                        <td className="px-4 py-3 text-sm text-right font-medium text-secondary">
                          {formatRupiah(report.total_income)}
                        </td>
                        <td className="px-4 py-3 text-sm text-right text-on-surface-variant">
                          {formatRupiah(report.total_expense)}
                        </td>
                        <td className={`px-4 py-3 text-sm text-right font-semibold ${isDeficit ? 'text-red-600' : 'text-secondary'}`}>
                          {isDeficit ? '-' : '+'}{formatRupiah(Math.abs(surplus))}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                            Dipublikasikan
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          {report.document_url ? (
                            <a
                              href={report.document_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-medium text-primary hover:underline"
                            >
                              📄 Unduh PDF
                            </a>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-surface-container text-on-surface-variant">
                              Segera Hadir
                            </span>
                          )}
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

      {/* ─── Fund Allocation Section ───────────────────────────────── */}
      <section className="section-padding bg-white border-t border-outline-variant/30">
        <div className="container-default">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title text-2xl mb-2">Bagaimana Dana Anda Digunakan?</h2>
              <p className="text-on-surface-variant mb-8">
                Setiap rupiah yang Anda percayakan kami kelola dengan penuh amanah dan efisiensi.
              </p>
              <div className="space-y-5">
                {FUND_ALLOCATIONS.map((item) => (
                  <ProgressBar
                    key={item.label}
                    label={`${item.icon} ${item.label}`}
                    value={item.percentage}
                    color={item.color}
                    showPercentage
                    size="md"
                  />
                ))}
              </div>
            </div>

            <div className="bg-surface rounded-2xl p-6 border border-outline-variant/30">
              <h3 className="font-semibold text-on-surface mb-4">📌 Prinsip Pengelolaan Kami</h3>
              <ul className="space-y-3">
                {[
                  ['✅', 'Semua donasi dicatat dan dilaporkan setiap bulan'],
                  ['🔍', 'Laporan diaudit secara independen setiap tahun'],
                  ['📧', 'Donatur menerima notifikasi konfirmasi via email'],
                  ['🏛️', 'Rekening lembaga terpisah dari rekening pengurus'],
                  ['📊', 'Data donasi dapat diakses publik di halaman ini'],
                ].map(([icon, text]) => (
                  <li key={text} className="flex items-start gap-3 text-sm text-on-surface-variant">
                    <span className="text-base mt-0.5">{icon}</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA Section ───────────────────────────────────────────── */}
      <section className="py-14 bg-primary">
        <div className="container-default text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Yakin dengan Transparansi Kami?
          </h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            Bergabunglah dengan ratusan donatur yang telah mempercayakan amanah mereka kepada LKSA Dapur Yatim.
          </p>
          <Link
            to="/donasi"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-surface-low transition-colors"
          >
            💝 Donasi Sekarang
          </Link>
        </div>
      </section>
    </PageLayout>
  )
}
