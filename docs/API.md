# 📡 API Documentation — LKSA Dapur Yatim

Base URL: `http://localhost:3001/api/v1`

Semua response menggunakan format JSON dengan struktur:

```json
{
  "success": true | false,
  "message": "Pesan deskriptif",
  "data": { ... }
}
```

---

## 🏥 Health Check

### `GET /health`

Cek status API server.

**Response 200:**
```json
{
  "success": true,
  "message": "LKSA Dapur Yatim API is running",
  "environment": "development",
  "timestamp": "2024-01-15T08:00:00.000Z"
}
```

---

## 💳 Donasi

### `GET /donations/stats`

Mengambil statistik donasi yang dapat diakses publik.

**Response 200:**
```json
{
  "success": true,
  "data": {
    "total_amount": 12500000,
    "total_donors": 148,
    "total_children": 250
  }
}
```

---

### `POST /donations`

Submit donasi baru dari calon donatur.

**Request Body:**
```json
{
  "donor_name": "Budi Santoso",
  "donor_email": "budi@email.com",
  "donor_phone": "081234567890",
  "amount": 100000,
  "payment_method": "bank_transfer",
  "message": "Semoga bermanfaat."
}
```

| Field | Type | Required | Keterangan |
|-------|------|----------|-----------|
| `donor_name` | string | ✅ | Min 2 karakter |
| `donor_email` | string | ✅ | Format email valid |
| `donor_phone` | string | ❌ | Format nomor telepon |
| `amount` | integer | ✅ | Minimal Rp 10.000 |
| `payment_method` | enum | ✅ | `bank_transfer`, `qris`, `e_wallet` |
| `message` | string | ❌ | Maks 500 karakter |

**Response 201:**
```json
{
  "success": true,
  "message": "Donasi berhasil disubmit.",
  "data": {
    "id": 42,
    "donor_name": "Budi Santoso",
    "amount": 100000,
    "payment_method": "bank_transfer",
    "status": "pending",
    "created_at": "2024-01-15T08:00:00.000Z"
  }
}
```

**Response 422 (Validasi gagal):**
```json
{
  "success": false,
  "message": "Validasi gagal. Periksa kembali data yang Anda masukkan.",
  "errors": ["Nominal donasi minimal Rp 10.000."]
}
```

---

## 📅 Kegiatan

### `GET /activities`

Mengambil daftar kegiatan yang telah dipublikasikan.

**Query Parameters:**
| Parameter | Type | Default | Keterangan |
|-----------|------|---------|-----------|
| `page` | integer | 1 | Halaman pagination |
| `limit` | integer | 9 | Jumlah item per halaman |
| `category` | string | — | Filter berdasarkan kategori |

**Response 200:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Pembagian Makanan Bergizi",
      "description": "...",
      "thumbnail": "/uploads/activities/foto.jpg",
      "category": "nutrition",
      "activity_date": "2024-01-10",
      "participants_count": 85
    }
  ],
  "meta": {
    "total": 24,
    "page": 1,
    "limit": 9,
    "total_pages": 3
  }
}
```

---

## 📊 Laporan Keuangan

### `GET /reports`

Mengambil laporan keuangan yang telah dipublikasikan.

**Query Parameters:**
| Parameter | Type | Keterangan |
|-----------|------|-----------|
| `year` | integer | Filter berdasarkan tahun |

**Response 200:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Laporan Keuangan Januari 2024",
      "report_month": 1,
      "report_year": 2024,
      "total_income": 15000000,
      "total_expense": 12300000,
      "summary": "...",
      "document_url": "/uploads/reports/laporan-jan-2024.pdf"
    }
  ]
}
```

---

## 📞 Kontak

### `POST /contact`

Mengirimkan pesan dari formulir kontak.

**Request Body:**
```json
{
  "name": "Siti Rahma",
  "email": "siti@email.com",
  "subject": "Pertanyaan tentang donasi",
  "message": "Bagaimana cara berdonasi secara rutin?"
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Pesan Anda berhasil dikirim. Kami akan merespons dalam 1x24 jam."
}
```
