import { useState, useEffect, useCallback } from 'react';
import PageLayout from '../components/layout/PageLayout';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Modal from '../components/common/Modal';
import Badge, { getCategoryVariant, getCategoryLabel } from '../components/common/Badge';
import { useApi } from '../hooks/useApi';
import { activityApi } from '../lib/api';
import { formatDate, truncate } from '../lib/utils';

const CATEGORIES = [
  { value: 'all', label: 'Semua' },
  { value: 'education', label: 'Pendidikan' },
  { value: 'health', label: 'Kesehatan' },
  { value: 'nutrition', label: 'Nutrisi' },
  { value: 'social', label: 'Sosial' },
  { value: 'other', label: 'Lainnya' },
];

const LIMIT = 9;

const CATEGORY_CONFIG = {
  education: { color: 'primary', icon: '📚' },
  health: { color: 'secondary', icon: '🏥' },
  nutrition: { color: 'tertiary', icon: '🍱' },
  social: { color: 'primary', icon: '🤝' },
  other: { color: 'tertiary', icon: '⭐' },
};

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden animate-pulse border border-outline-variant/30">
      <div className="h-48 bg-surface-container" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-surface-container rounded w-1/3" />
        <div className="h-5 bg-surface-container rounded w-3/4" />
        <div className="h-4 bg-surface-container rounded w-full" />
        <div className="h-4 bg-surface-container rounded w-5/6" />
      </div>
    </div>
  );
}

function ActivityThumbnail({ activity }) {
  const category = activity.category || 'other';
  const config = CATEGORY_CONFIG[category] || CATEGORY_CONFIG.other;

  if (activity.thumbnail_url || activity.image_url) {
    return (
      <img
        src={activity.thumbnail_url || activity.image_url}
        alt={activity.title}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextSibling?.classList.remove('hidden');
        }}
      />
    );
  }

  return (
    <div className={`w-full h-48 bg-${config.color}/10 flex items-center justify-center`}>
      <span className="text-5xl">{config.icon}</span>
    </div>
  );
}

function ActivityCard({ activity, onClick }) {
  const category = activity.category || 'other';
  const config = CATEGORY_CONFIG[category] || CATEGORY_CONFIG.other;

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden border border-outline-variant/30 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
      onClick={() => onClick(activity)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(activity)}
      aria-label={`Lihat detail: ${activity.title}`}
    >
      <div className="overflow-hidden">
        <div className="group-hover:scale-105 transition-transform duration-500">
          <ActivityThumbnail activity={activity} />
        </div>
      </div>
      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <Badge variant={getCategoryVariant(activity.category)} size="sm">
            {getCategoryLabel(activity.category)}
          </Badge>
          <span className="text-xs text-on-surface-variant font-medium">
            {formatDate(activity.activity_date || activity.date || activity.created_at)}
          </span>
        </div>
        <h3 className="font-bold text-on-surface text-lg leading-snug group-hover:text-primary transition-colors line-clamp-2">
          {activity.title}
        </h3>
        <p className="text-sm text-on-surface-variant line-clamp-2">
          {truncate(activity.description, 80)}
        </p>
        <div className="pt-3 mt-2 border-t border-outline-variant/30 flex items-center gap-2 text-sm">
          <div className={`w-8 h-8 rounded-lg bg-${config.color}/10 flex items-center justify-center`}>
            <svg className={`w-4 h-4 text-${config.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </div>
          <span className="text-on-surface-variant">
            <strong className="text-on-surface font-semibold">{(activity.participants_count ?? activity.beneficiaries ?? 0).toLocaleString('id-ID')}</strong> penerima
          </span>
        </div>
      </div>
    </div>
  );
}

function ActivityDetail({ activity }) {
  const category = activity.category || 'other';
  const config = CATEGORY_CONFIG[category] || CATEGORY_CONFIG.other;

  return (
    <div className="space-y-6">
      {activity.thumbnail_url || activity.image_url ? (
        <img
          src={activity.thumbnail_url || activity.image_url}
          alt={activity.title}
          className="w-full h-56 object-cover rounded-2xl"
        />
      ) : (
        <div className={`w-full h-56 bg-${config.color}/10 flex items-center justify-center rounded-2xl`}>
          <span className="text-7xl">{config.icon}</span>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <Badge variant={getCategoryVariant(activity.category)}>
          {getCategoryLabel(activity.category)}
        </Badge>
        <span className="flex items-center gap-1.5 text-sm text-on-surface-variant">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          {formatDate(activity.activity_date || activity.date || activity.created_at)}
        </span>
        <span className="flex items-center gap-1.5 text-sm text-on-surface-variant">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <strong className="text-on-surface font-semibold">{(activity.participants_count ?? activity.beneficiaries ?? 0).toLocaleString('id-ID')}</strong> penerima
        </span>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-on-surface">{activity.title}</h2>
        {activity.location && (
          <p className="flex items-center gap-2 mt-2 text-on-surface-variant">
            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            {activity.location}
          </p>
        )}
      </div>

      <div className="prose prose-base max-w-none text-on-surface-variant">
        {activity.description
          ? activity.description.split('\n').map((para, i) => para.trim() ? <p key={i}>{para}</p> : <br key={i} />)
          : <p className="italic">Tidak ada deskripsi tersedia.</p>}
      </div>
    </div>
  );
}

function Pagination({ page, totalPages, totalItems, limit, onPageChange }) {
  const start = totalItems === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, totalItems);

  const getPageNumbers = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (page <= 3) return [1, 2, 3, 4, 5];
    if (page >= totalPages - 2) return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [page - 2, page - 1, page, page + 1, page + 2];
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col items-center gap-4 mt-12">
      <p className="text-sm text-on-surface-variant">
        Menampilkan <strong className="text-on-surface">{start}–{end}</strong> dari <strong className="text-on-surface">{totalItems.toLocaleString('id-ID')}</strong> kegiatan
      </p>
      <div className="flex items-center gap-2">
        <Button variant="secondary" size="sm" disabled={page === 1} onClick={() => onPageChange(page - 1)}>
          ← Prev
        </Button>
        {pageNumbers.map((num) => (
          <button
            key={num}
            onClick={() => onPageChange(num)}
            className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all ${
              num === page
                ? 'bg-primary text-white shadow-lg shadow-primary/30'
                : 'bg-white border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary'
            }`}
          >
            {num}
          </button>
        ))}
        <Button variant="secondary" size="sm" disabled={page === totalPages} onClick={() => onPageChange(page + 1)}>
          Next →
        </Button>
      </div>
    </div>
  );
}

export default function ActivitiesPage() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('all');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const buildParams = useCallback(() => {
    const params = { page, limit: LIMIT };
    if (category !== 'all') params.category = category;
    return params;
  }, [page, category]);

  const { data, loading, error, refetch } = useApi(() => activityApi.getAll(buildParams()), { immediate: false });

  useEffect(() => { refetch(); }, [page, category]);

  const activities = data?.data ?? data?.activities ?? data?.items ?? [];
  const totalItems = data?.total ?? data?.total_items ?? data?.count ?? 0;
  const totalPages = data?.total_pages ?? data?.totalPages ?? Math.ceil(totalItems / LIMIT) ?? 1;

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
      title=" kegiatan Kami"
      subtitle="Dokumentasi program dan kegiatan yang telah kami laksanakan untuk anak-anak yatim dan dhuafa."
      breadcrumbs={[{ label: ' kegiatan' }]}
    >
      <section className="section-padding">
        <div className="container-default">
          <div className="mb-8">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => handleCategoryChange(cat.value)}
                  className={`flex-shrink-0 snap-start px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                    category === cat.value
                      ? 'bg-primary text-white shadow-lg shadow-primary/30'
                      : 'bg-white border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {!loading && error && (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
              <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
              </div>
              <p className="text-on-surface-variant text-base max-w-sm">
                Terjadi kesalahan saat memuat data. Silakan coba lagi.
              </p>
              <Button variant="primary" onClick={refetch}>Coba Lagi</Button>
            </div>
          )}

          {!loading && !error && activities.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
              <div className="w-20 h-20 rounded-2xl bg-surface-container flex items-center justify-center">
                <span className="text-4xl">📭</span>
              </div>
              <p className="font-semibold text-on-surface text-lg">Belum Ada Kegiatan</p>
              <p className="text-on-surface-variant text-sm max-w-xs">
                Belum ada kegiatan untuk kategori ini.
              </p>
              {category !== 'all' && (
                <Button variant="outline" onClick={() => handleCategoryChange('all')}>
                  Lihat Semua
                </Button>
              )}
            </div>
          )}

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
              {totalPages > 1 && (
                <Pagination page={page} totalPages={totalPages} totalItems={totalItems} limit={LIMIT} onPageChange={handlePageChange} />
              )}
            </>
          )}
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={handleModalClose} title={selectedActivity?.title ?? ''}>
        {selectedActivity && (
          <div className="space-y-6">
            <ActivityDetail activity={selectedActivity} />
            <div className="flex justify-end pt-4 border-t border-outline-variant">
              <Button variant="primary" onClick={handleModalClose}>Tutup</Button>
            </div>
          </div>
        )}
      </Modal>
    </PageLayout>
  );
}