import { useState, useEffect, useCallback } from 'react';
import PageLayout from '../components/layout/PageLayout';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Modal from '../components/common/Modal';
import Badge, { getCategoryVariant, getCategoryLabel } from '../components/common/Badge';
import ProgressBar from '../components/common/ProgressBar';
import { useApi } from '../hooks/useApi';
import { activityApi } from '../lib/api';
import { formatDate, truncate } from '../lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CATEGORIES = [
  { value: 'all', label: 'Semua' },
  { value: 'education', label: 'Pendidikan' },
  { value: 'health', label: 'Kesehatan' },
  { value: 'nutrition', label: 'Nutrisi' },
  { value: 'social', label: 'Sosial' },
  { value: 'other', label: 'Lainnya' },
];

const LIMIT = 9;

const CATEGORY_EMOJI = {
  education: '📚',
  health: '🏥',
  nutrition: '🍱',
  social: '🤝',
  other: '⭐',
};

const CATEGORY_BG = {
  education: 'bg-blue-100',
  health: 'bg-red-100',
  nutrition: 'bg-green-100',
  social: 'bg-yellow-100',
  other: 'bg-purple-100',
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

/** Skeleton card shown while loading */
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse">
      <div className="h-44 bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mt-4" />
      </div>
    </div>
  );
}

/** Colored placeholder div with emoji when no thumbnail available */
function ActivityThumbnail({ activity }) {
  const category = activity.category || 'other';
  const emoji = CATEGORY_EMOJI[category] ?? '⭐';
  const bg = CATEGORY_BG[category] ?? 'bg-gray-100';

  if (activity.thumbnail_url || activity.image_url) {
    return (
      <img
        src={activity.thumbnail_url || activity.image_url}
        alt={activity.title}
        className="w-full h-44 object-cover"
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextSibling?.classList.remove('hidden');
        }}
      />
    );
  }

  return (
    <div className={`w-full h-44 flex items-center justify-center ${bg}`}>
      <span className="text-6xl select-none">{emoji}</span>
    </div>
  );
}

/** Individual activity card */
function ActivityCard({ activity, onClick }) {
  return (
    <div
      className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden cursor-pointer group"
      onClick={() => onClick(activity)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(activity)}
      aria-label={`Lihat detail kegiatan: ${activity.title}`}
    >
      {/* Thumbnail */}
      <div className="overflow-hidden">
        <div className="group-hover:scale-105 transition-transform duration-300">
          <ActivityThumbnail activity={activity} />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        {/* Badge + Date */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <Badge variant={getCategoryVariant(activity.category)}>
            {getCategoryLabel(activity.category)}
          </Badge>
          <span className="text-xs text-on-surface-variant">
            {formatDate(activity.activity_date || activity.date || activity.created_at)}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-on-surface text-base leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {activity.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-on-surface-variant leading-relaxed">
          {truncate(activity.description, 100)}
        </p>

        {/* Footer */}
        <div className="mt-auto pt-3 border-t border-outline-variant flex items-center gap-1 text-sm text-on-surface-variant">
          <span>👥</span>
          <span>
            <strong className="text-on-surface">
              {(activity.participants_count ?? activity.beneficiaries ?? 0).toLocaleString('id-ID')}
            </strong>{' '}
            Penerima Manfaat
          </span>
        </div>
      </div>
    </div>
  );
}

/** Full detail content inside the modal */
function ActivityDetail({ activity }) {
  const category = activity.category || 'other';
  const emoji = CATEGORY_EMOJI[category] ?? '⭐';
  const bg = CATEGORY_BG[category] ?? 'bg-gray-100';

  return (
    <div className="space-y-4">
      {/* Hero */}
      {activity.thumbnail_url || activity.image_url ? (
        <img
          src={activity.thumbnail_url || activity.image_url}
          alt={activity.title}
          className="w-full h-52 object-cover rounded-xl"
        />
      ) : (
        <div className={`w-full h-52 flex items-center justify-center rounded-xl ${bg}`}>
          <span className="text-8xl select-none">{emoji}</span>
        </div>
      )}

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant={getCategoryVariant(activity.category)}>
          {getCategoryLabel(activity.category)}
        </Badge>
        <span className="text-sm text-on-surface-variant">
          📅 {formatDate(activity.activity_date || activity.date || activity.created_at)}
        </span>
        <span className="text-sm text-on-surface-variant">
          👥{' '}
          <strong className="text-on-surface">
            {(activity.participants_count ?? activity.beneficiaries ?? 0).toLocaleString('id-ID')}
          </strong>{' '}
          Penerima Manfaat
        </span>
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold text-on-surface leading-snug">{activity.title}</h2>

      {/* Location if available */}
      {activity.location && (
        <p className="text-sm text-on-surface-variant">
          📍 <span className="text-on-surface">{activity.location}</span>
        </p>
      )}

      {/* Description */}
      <div className="prose prose-sm max-w-none text-on-surface-variant leading-relaxed">
        {activity.description
          ? activity.description.split('\n').map((para, i) =>
              para.trim() ? <p key={i}>{para}</p> : <br key={i} />
            )
          : <p className="italic">Tidak ada deskripsi tersedia.</p>}
      </div>
    </div>
  );
}

/** Pagination controls */
function Pagination({ page, totalPages, totalItems, limit, onPageChange }) {
  const start = totalItems === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, totalItems);

  // Build visible page numbers (max 5)
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (page <= 3) return [1, 2, 3, 4, 5];
    if (page >= totalPages - 2) return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [page - 2, page - 1, page, page + 1, page + 2];
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      {/* Summary */}
      <p className="text-sm text-on-surface-variant">
        Menampilkan{' '}
        <strong className="text-on-surface">{start}–{end}</strong>{' '}
        dari <strong className="text-on-surface">{totalItems.toLocaleString('id-ID')}</strong> kegiatan
      </p>

      {/* Buttons */}
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {/* Prev */}
        <Button
          variant="outline"
          size="sm"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          ← Sebelumnya
        </Button>

        {/* Page numbers */}
        {pageNumbers.map((num) => (
          <button
            key={num}
            onClick={() => onPageChange(num)}
            className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors duration-150 ${
              num === page
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary'
            }`}
          >
            {num}
          </button>
        ))}

        {/* Next */}
        <Button
          variant="outline"
          size="sm"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Berikutnya →
        </Button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------

export default function ActivitiesPage() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('all');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Build API params
  const buildParams = useCallback(() => {
    const params = { page, limit: LIMIT };
    if (category !== 'all') params.category = category;
    return params;
  }, [page, category]);

  const {
    data,
    loading,
    error,
    refetch,
  } = useApi(() => activityApi.getAll(buildParams()), { immediate: false });

  // Refetch whenever page or category changes
  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, category]);

  // Derived data
  const activities = data?.data ?? data?.activities ?? data?.items ?? [];
  const totalItems = data?.total ?? data?.total_items ?? data?.count ?? 0;
  const totalPages = data?.total_pages ?? data?.totalPages ?? Math.ceil(totalItems / LIMIT) ?? 1;

  // Handlers
  const handleCategoryChange = (value) => {
    setCategory(value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCardClick = (activity) => {
    setSelectedActivity(activity);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedActivity(null), 300);
  };

  return (
    <PageLayout
      title="Kegiatan Kami"
      subtitle="Dokumentasi program dan kegiatan yang telah kami laksanakan"
      breadcrumbs={[{ label: 'Kegiatan' }]}
    >
      <section className="section-padding">
        <div className="container-default">

          {/* ----------------------------------------------------------------
              Category Filter Bar
          ---------------------------------------------------------------- */}
          <div className="mb-8">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => handleCategoryChange(cat.value)}
                  className={`
                    flex-shrink-0 snap-start px-4 py-2 rounded-full text-sm font-medium
                    transition-all duration-200 whitespace-nowrap
                    ${category === cat.value
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-white border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary'
                    }
                  `}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* ----------------------------------------------------------------
              Loading State
          ---------------------------------------------------------------- */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {/* ----------------------------------------------------------------
              Error State
          ---------------------------------------------------------------- */}
          {!loading && error && (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
              <div className="text-5xl">⚠️</div>
              <p className="text-on-surface-variant text-base max-w-sm">
                Terjadi kesalahan saat memuat data kegiatan. Silakan coba lagi.
              </p>
              <Button variant="primary" onClick={refetch}>
                Coba Lagi
              </Button>
            </div>
          )}

          {/* ----------------------------------------------------------------
              Empty State
          ---------------------------------------------------------------- */}
          {!loading && !error && activities.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
              <div className="text-6xl">📭</div>
              <p className="text-on-surface font-semibold text-lg">Belum Ada Kegiatan</p>
              <p className="text-on-surface-variant text-sm max-w-xs">
                Belum ada kegiatan untuk kategori ini. Silakan pilih kategori lain atau cek kembali nanti.
              </p>
              {category !== 'all' && (
                <Button variant="outline" onClick={() => handleCategoryChange('all')}>
                  Lihat Semua Kegiatan
                </Button>
              )}
            </div>
          )}

          {/* ----------------------------------------------------------------
              Activity Grid
          ---------------------------------------------------------------- */}
          {!loading && !error && activities.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {activities.map((activity) => (
                  <ActivityCard
                    key={activity.id ?? activity._id ?? activity.slug}
                    activity={activity}
                    onClick={handleCardClick}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  totalItems={totalItems}
                  limit={LIMIT}
                  onPageChange={handlePageChange}
                />
              )}

              {/* Item count when only one page */}
              {totalPages <= 1 && totalItems > 0 && (
                <p className="text-center text-sm text-on-surface-variant mt-8">
                  Menampilkan{' '}
                  <strong className="text-on-surface">{activities.length}</strong>{' '}
                  dari{' '}
                  <strong className="text-on-surface">{totalItems}</strong> kegiatan
                </p>
              )}
            </>
          )}

        </div>
      </section>

      {/* ------------------------------------------------------------------
          Detail Modal
      ------------------------------------------------------------------ */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={selectedActivity?.title ?? ''}
      >
        {selectedActivity && (
          <div className="space-y-6">
            <ActivityDetail activity={selectedActivity} />

            <div className="flex justify-end pt-2 border-t border-outline-variant">
              <Button variant="primary" onClick={handleModalClose}>
                Tutup
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </PageLayout>
  );
}
