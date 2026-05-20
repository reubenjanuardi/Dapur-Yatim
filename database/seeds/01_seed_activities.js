/**
 * Seed: 01_seed_activities
 * Data kegiatan dummy yang realistis untuk LKSA Dapur Yatim
 * 6 kegiatan dengan kategori berbeda, semua sudah dipublikasikan
 */

exports.seed = async function (knex) {
  // Hapus data lama sebelum insert
  await knex('activities').del()

  await knex('activities').insert([
    {
      title: 'Program Makan Bergizi Harian — Maret 2024',
      description:
        'Program penyediaan makanan bergizi seimbang setiap hari untuk 85 anak yatim di wilayah binaan Dapur Yatim. Menu dirancang oleh ahli gizi dan disiapkan dengan bahan-bahan segar berkualitas. Program ini berjalan setiap hari Senin-Jumat dan telah memberikan dampak signifikan pada kesehatan dan konsentrasi belajar anak-anak.',
      thumbnail: null,
      category: 'nutrition',
      activity_date: '2024-03-15',
      participants_count: 85,
      is_published: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      title: 'Beasiswa Pendidikan Semester Genap 2023/2024',
      description:
        'Pemberian beasiswa pendidikan kepada 42 anak yatim dan dhuafa untuk mendukung keberlangsungan pendidikan mereka. Beasiswa mencakup biaya SPP, buku pelajaran, seragam sekolah, dan perlengkapan belajar lainnya. Penerima beasiswa terdiri dari 18 siswa SD, 14 siswa SMP, dan 10 siswa SMA dari berbagai sekolah di Bandung.',
      thumbnail: null,
      category: 'education',
      activity_date: '2024-02-01',
      participants_count: 42,
      is_published: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      title: 'Pemeriksaan Kesehatan Gratis & Pengobatan',
      description:
        'Kegiatan pemeriksaan kesehatan gratis yang bekerja sama dengan Puskesmas Kota Bandung dan relawan dokter dari Ikatan Dokter Indonesia (IDI) Cabang Bandung. Layanan yang diberikan meliputi pemeriksaan kesehatan umum, gigi, mata, serta pemberian vitamin dan obat-obatan gratis. Tercatat 120 anak dan keluarga dhuafa menerima manfaat dari kegiatan ini.',
      thumbnail: null,
      category: 'health',
      activity_date: '2024-01-20',
      participants_count: 120,
      is_published: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      title: 'Santunan dan Buka Bersama Ramadan 1445 H',
      description:
        'Kegiatan santunan anak yatim dan buka puasa bersama dalam rangka menyambut bulan suci Ramadan 1445 H. Sebanyak 150 anak yatim dan keluarga dhuafa hadir dalam kegiatan yang penuh kebersamaan ini. Selain santunan berupa uang tunai dan paket kebutuhan pokok, juga diadakan lomba membaca Al-Quran dan ceramah oleh ustadz tamu.',
      thumbnail: null,
      category: 'social',
      activity_date: '2024-03-20',
      participants_count: 150,
      is_published: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      title: 'Pelatihan Keterampilan Digital untuk Remaja Yatim',
      description:
        'Program pelatihan komputer dan keterampilan digital dasar untuk remaja yatim usia 15-18 tahun. Materi pelatihan mencakup dasar-dasar Microsoft Office, pengenalan internet dan media sosial yang sehat, serta dasar-dasar desain grafis menggunakan Canva. Pelatihan berlangsung selama 2 minggu dengan 30 peserta yang mendapatkan sertifikat kompetensi.',
      thumbnail: null,
      category: 'education',
      activity_date: '2024-02-15',
      participants_count: 30,
      is_published: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      title: 'Distribusi Paket Sembako dan Kebutuhan Dasar',
      description:
        'Distribusi paket sembako dan kebutuhan dasar kepada 200 keluarga yatim dan dhuafa di wilayah Bandung Timur dan Bandung Selatan. Setiap paket berisi 10 kg beras, minyak goreng, gula pasir, tepung terigu, mie instan, sarden kaleng, dan kebutuhan pokok lainnya senilai Rp 250.000. Kegiatan ini merupakan bagian dari program sosial bulanan Dapur Yatim.',
      thumbnail: null,
      category: 'social',
      activity_date: '2024-03-01',
      participants_count: 200,
      is_published: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ])
}
