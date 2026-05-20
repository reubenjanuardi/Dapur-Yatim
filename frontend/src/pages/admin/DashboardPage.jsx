/**
 * Admin: DashboardPage
 * Dashboard manajemen donasi dengan filter status dan aksi konfirmasi/tolak
 */
import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { donationApi, adminApi } from '../../lib/api'
import { formatRupiah, formatDate } from '../../lib/utils'
import Badge, { getDonationStatusVariant, getDonationStatusLabel } from '../../components/common/Badge'

const STATUS_FILTERS = [
  { value: '', label: 'Semua' },
  { value: 'pending', label: 'Menunggu' },
  { value: 'confirmed', label: 'Dikonfirmasi' },
  { value: 'rejected', label: 'Ditolak' },
]

const METHOD_LABELS = {
  bank_transfer: 'Transfer Bank',
  qris: 'QRIS',
  e_wallet: 'E-Wallet',
}

export default function AdminDashboardPage() {
  const navigate = useNavigate()
  const [admin, setAdmin] = useState(null)
  const [donations, setDonations] = useState([])
  const [meta, setMeta] = useState(null)
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(1)
  const [actionLoading, setActionLoading] = useState(null) // ID donasi yang sedang diupdate

  // Ambil data admin yang login
  useEffect(() => {
    adminApi.getMe().then((res) => {
      setAdmin(res.data)
    }).catch(() => {
      // Token expired / invalid
      localStorage.removeItem('access_token')
      navigate('/admin/login', { replace: true })
    })
  }, [navigate])

  // Ambil list donasi
  const fetchDonations = useCallback(async () => {
    setLoading(true)
    try {
      const params = { page, limit: 10 }
      if (statusFilter) params.status = statusFilter
      const res = await donationApi.getAll(params)
      setDonations(res.data || [])
      setMeta(res.meta)
    } catch (err) {
      console.error('[Dashboard] Gagal memuat donasi:', err.message)
    } finally {
      setLoading(false)
    }
  }, [page, statusFilter])

  useEffect(() => {
    fetchDonations()
  }, [fetchDonations])

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    navigate('/admin/login', { replace: true })
  }

  const handleUpdateStatus = async (donationId, newStatus) => {
    setActionLoading(donationId)
    try {
      await donationApi.updateStatus(donationId, newStatus)
      // Refresh list
      await fetchDonations()
    } catch (err) {
      console.error('[Dashboard] Gagal update status:', err.message)
    } finally {
      setActionLoading(null)
    }
  }

  const handleFilterChange = (status) => {
    setStatusFilter(status)
    setPage(1)
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="bg-white border-b border-outline-variant/50 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-xs">DY</span>
            </div>
            <div>
              <h1 className="font-bold text-on-surface text-sm">Admin Panel</h1>
              <p className="text-xs text-on-surface-variant">LKSA Dapur Yatim</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {admin && (
              <span className="text-sm text-on-surface-variant hidden md:block">
                👤 {admin.name}
              </span>
            )}
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
            >
              Keluar
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Stats summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {STATUS_FILTERS.slice(1).map(({ value, label }) => {
            const count = meta?.total
              ? donations.filter((d) => d.status === value).length
              : 0
            return (
              <button
                key={value}
                onClick={() => handleFilterChange(value)}
                className={`card text-left p-4 transition-all ${statusFilter === value ? 'ring-2 ring-primary' : ''}`}
              >
                <p className="text-xs text-on-surface-variant">{label}</p>
                <p className="text-2xl font-bold text-on-surface mt-1">{count}</p>
              </button>
            )
          })}
          <div className="card p-4 bg-primary text-white rounded-xl">
            <p className="text-xs text-white/80">Total (halaman ini)</p>
            <p className="text-2xl font-bold mt-1">{meta?.total || 0}</p>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
          {STATUS_FILTERS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => handleFilterChange(value)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap border transition-all ${
                statusFilter === value
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-on-surface-variant border-outline-variant hover:border-primary'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-card overflow-hidden border border-outline-variant/30">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-surface-container/70 border-b border-outline-variant/40">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-on-surface-variant uppercase">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-on-surface-variant uppercase">Nama</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-on-surface-variant uppercase">Nominal</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-on-surface-variant uppercase">Metode</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-on-surface-variant uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-on-surface-variant uppercase">Tanggal</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-on-surface-variant uppercase">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="border-b border-outline-variant/30 animate-pulse">
                      {[1, 2, 3, 4, 5, 6, 7].map((j) => (
                        <td key={j} className="px-4 py-3">
                          <div className="h-4 bg-surface-container rounded w-full" />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : donations.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-on-surface-variant">
                      <span className="text-3xl block mb-2">📭</span>
                      Tidak ada donasi{statusFilter ? ` dengan status "${statusFilter}"` : ''}.
                    </td>
                  </tr>
                ) : (
                  donations.map((donation) => (
                    <tr key={donation.id} className="border-b border-outline-variant/30 hover:bg-surface/50 transition-colors">
                      <td className="px-4 py-3 text-sm font-mono text-on-surface-variant">#{donation.id}</td>
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-on-surface">{donation.donor_name}</p>
                        <p className="text-xs text-on-surface-variant">{donation.donor_email}</p>
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-on-surface text-right">
                        {formatRupiah(donation.amount)}
                      </td>
                      <td className="px-4 py-3 text-sm text-on-surface-variant">
                        {METHOD_LABELS[donation.payment_method] || donation.payment_method}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Badge variant={getDonationStatusVariant(donation.status)}>
                          {getDonationStatusLabel(donation.status)}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-xs text-on-surface-variant">
                        {formatDate(donation.created_at)}
                      </td>
                      <td className="px-4 py-3">
                        {donation.status === 'pending' ? (
                          <div className="flex items-center gap-1.5 justify-center">
                            <button
                              onClick={() => handleUpdateStatus(donation.id, 'confirmed')}
                              disabled={actionLoading === donation.id}
                              className="text-xs px-2.5 py-1.5 bg-green-100 text-green-700 hover:bg-green-200 rounded-lg font-medium transition-colors disabled:opacity-50"
                            >
                              {actionLoading === donation.id ? '...' : '✅ Konfirmasi'}
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(donation.id, 'rejected')}
                              disabled={actionLoading === donation.id}
                              className="text-xs px-2.5 py-1.5 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg font-medium transition-colors disabled:opacity-50"
                            >
                              {actionLoading === donation.id ? '...' : '❌ Tolak'}
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-on-surface-variant text-center block">—</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {meta && meta.total_pages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-outline-variant/30 bg-surface/50">
              <p className="text-xs text-on-surface-variant">
                Halaman {page} dari {meta.total_pages} ({meta.total} data)
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 text-xs rounded-lg border border-outline-variant hover:border-primary disabled:opacity-40 transition-colors"
                >
                  ← Prev
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(meta.total_pages, p + 1))}
                  disabled={page === meta.total_pages}
                  className="px-3 py-1.5 text-xs rounded-lg border border-outline-variant hover:border-primary disabled:opacity-40 transition-colors"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
