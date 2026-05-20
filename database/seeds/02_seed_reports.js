/**
 * Seed: 02_seed_reports
 * Data laporan keuangan dummy 6 bulan terakhir
 * Angka dalam Rupiah yang realistis untuk lembaga skala menengah
 */

exports.seed = async function (knex) {
  // Hapus data lama sebelum insert
  await knex('financial_reports').del()

  const currentYear = 2024

  await knex('financial_reports').insert([
    {
      title: 'Laporan Keuangan Januari 2024',
      report_month: 1,
      report_year: currentYear,
      total_income: 45750000,   // Rp 45.750.000
      total_expense: 38200000,  // Rp 38.200.000
      summary:
        'Bulan Januari 2024 mencatat pemasukan sebesar Rp 45.750.000 yang bersumber dari donasi rutin, infaq, dan program beasiswa sponsor. Pengeluaran sebesar Rp 38.200.000 dialokasikan untuk program makan bergizi harian (55%), beasiswa pendidikan (25%), operasional (12%), dan kesehatan (8%). Surplus bulan ini sebesar Rp 7.550.000 dimasukkan ke dalam dana cadangan.',
      document_url: null,
      is_published: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      title: 'Laporan Keuangan Februari 2024',
      report_month: 2,
      report_year: currentYear,
      total_income: 52300000,   // Rp 52.300.000
      total_expense: 49800000,  // Rp 49.800.000
      summary:
        'Februari 2024 merupakan bulan pencairan beasiswa semester genap sehingga pengeluaran meningkat signifikan. Total pemasukan Rp 52.300.000 dari donasi online, transfer bank, dan donasi korporat. Pengeluaran Rp 49.800.000 didominasi pencairan beasiswa (40%), program gizi (35%), operasional (15%), dan kesehatan (10%). Surplus tipis Rp 2.500.000.',
      document_url: null,
      is_published: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      title: 'Laporan Keuangan Maret 2024',
      report_month: 3,
      report_year: currentYear,
      total_income: 89500000,   // Rp 89.500.000 (Ramadan boost)
      total_expense: 71200000,  // Rp 71.200.000
      summary:
        'Maret 2024 bertepatan dengan awal Ramadan 1445 H, menghasilkan lonjakan donasi yang sangat signifikan. Pemasukan mencapai Rp 89.500.000 — tertinggi dalam semester ini. Pengeluaran Rp 71.200.000 dialokasikan untuk santunan Ramadan (45%), makan buka bersama (20%), paket sembako (20%), dan program rutin (15%). Surplus Rp 18.300.000 dimasukkan dana cadangan.',
      document_url: null,
      is_published: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      title: 'Laporan Keuangan Oktober 2023',
      report_month: 10,
      report_year: 2023,
      total_income: 38600000,   // Rp 38.600.000
      total_expense: 41200000,  // Rp 41.200.000
      summary:
        'Oktober 2023 mengalami defisit tipis akibat penambahan penerima manfaat baru sebanyak 12 anak. Total pemasukan Rp 38.600.000 dari donasi reguler. Pengeluaran Rp 41.200.000 meningkat karena biaya onboarding penerima manfaat baru, kunjungan rumah, dan dokumen administrasi. Defisit Rp 2.600.000 ditutup dari dana cadangan yang tersedia.',
      document_url: null,
      is_published: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      title: 'Laporan Keuangan November 2023',
      report_month: 11,
      report_year: 2023,
      total_income: 42100000,   // Rp 42.100.000
      total_expense: 39500000,  // Rp 39.500.000
      summary:
        'November 2023 kembali mencatat surplus setelah Oktober defisit. Pemasukan Rp 42.100.000 dari donasi online (60%), transfer bank (25%), dan kotak amal (15%). Pengeluaran Rp 39.500.000 untuk program rutin gizi, pendidikan, dan operasional. Surplus Rp 2.600.000 mengembalikan saldo dana cadangan ke posisi normal.',
      document_url: null,
      is_published: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      title: 'Laporan Keuangan Desember 2023',
      report_month: 12,
      report_year: 2023,
      total_income: 67800000,   // Rp 67.800.000 (year-end donations)
      total_expense: 58400000,  // Rp 58.400.000
      summary:
        'Desember 2023 mencatat kenaikan donasi akhir tahun yang signifikan. Banyak donatur yang menyalurkan zakat mal dan sedekah akhir tahun ke Dapur Yatim. Pemasukan Rp 67.800.000 melampaui target bulanan. Pengeluaran Rp 58.400.000 termasuk persiapan program tahun baru, pembagian paket akhir tahun, dan audit keuangan tahunan. Surplus Rp 9.400.000.',
      document_url: null,
      is_published: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ])
}
