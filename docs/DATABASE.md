# 🗄️ Database Schema — LKSA Dapur Yatim

Database: **PostgreSQL 16**
Query Builder: **Knex.js**

---

## Tabel: `donations`

Menyimpan seluruh data transaksi donasi yang masuk.

| Kolom | Tipe | Keterangan |
|-------|------|-----------|
| `id` | SERIAL PK | Primary key |
| `donor_name` | VARCHAR(100) | Nama donatur |
| `donor_email` | VARCHAR(150) | Email donatur |
| `donor_phone` | VARCHAR(20) | Nomor telepon (opsional) |
| `amount` | BIGINT | Nominal donasi (Rupiah) |
| `payment_method` | ENUM | `bank_transfer`, `qris`, `e_wallet` |
| `status` | ENUM | `pending`, `confirmed`, `rejected` |
| `message` | TEXT | Pesan dari donatur |
| `proof_of_payment` | VARCHAR(255) | Path file bukti transfer |
| `confirmed_at` | TIMESTAMP | Waktu konfirmasi pembayaran |
| `created_at` | TIMESTAMP | Waktu donasi dibuat |
| `updated_at` | TIMESTAMP | Waktu terakhir diperbarui |

---

## Tabel: `activities`

Menyimpan data program dan kegiatan yang dijalankan lembaga.

| Kolom | Tipe | Keterangan |
|-------|------|-----------|
| `id` | SERIAL PK | Primary key |
| `title` | VARCHAR(200) | Judul kegiatan |
| `description` | TEXT | Deskripsi lengkap kegiatan |
| `thumbnail` | VARCHAR(255) | Path foto utama |
| `category` | ENUM | `education`, `health`, `nutrition`, `social`, `other` |
| `activity_date` | DATE | Tanggal pelaksanaan |
| `participants_count` | INTEGER | Jumlah peserta/penerima manfaat |
| `is_published` | BOOLEAN | Status publikasi |
| `created_at` | TIMESTAMP | — |
| `updated_at` | TIMESTAMP | — |

---

## Tabel: `financial_reports`

Menyimpan laporan keuangan bulanan untuk keperluan transparansi publik.

| Kolom | Tipe | Keterangan |
|-------|------|-----------|
| `id` | SERIAL PK | Primary key |
| `title` | VARCHAR(200) | Judul laporan |
| `report_month` | INTEGER | Bulan laporan (1–12) |
| `report_year` | INTEGER | Tahun laporan |
| `total_income` | BIGINT | Total pemasukan (Rupiah) |
| `total_expense` | BIGINT | Total pengeluaran (Rupiah) |
| `summary` | TEXT | Ringkasan laporan |
| `document_url` | VARCHAR(255) | Link dokumen PDF laporan |
| `is_published` | BOOLEAN | Status publikasi |
| `created_at` | TIMESTAMP | — |
| `updated_at` | TIMESTAMP | — |

---

## ERD (Entity Relationship)

```
donations           financial_reports
──────────          ─────────────────
id (PK)             id (PK)
donor_name          title
donor_email         report_month
amount              report_year
payment_method      total_income
status              total_expense
...                 document_url
                    is_published

activities
──────────
id (PK)
title
description
category
activity_date
participants_count
is_published
```

---

## Perintah Database

```bash
# Jalankan semua migrasi
npm run db:migrate

# Rollback migrasi terakhir
npm run db:rollback

# Isi data dummy
npm run db:seed

# Reset database (rollback semua, lalu migrate + seed)
npm run db:rollback && npm run db:migrate && npm run db:seed
```
