# Dokumentasi API Sistem Manajemen Produk

## URL Dasar

```
http://localhost:3000
```

## Autentikasi

API ini menggunakan autentikasi dasar dengan username dan password yang dibuat secara dinamis berdasarkan tanggal saat ini.

Format Username: `tesprogrammer{DD}{MM}{YY}C12`  
Format Password: `bisacoding-{DD}-{MM}-{YY}` (dienkripsi dengan MD5)

## Endpoint API

### 1. Mengambil dan Menyimpan Data Produk dari API Eksternal

Mengambil data produk dari API eksternal dan menyimpannya ke database lokal.

**Endpoint:** `POST /fetch`

**Respons Sukses:**

```json
{
  "message": "Data berhasil diambil dan disimpan"
}
```

**Respons Error:**

```json
{
  "error": "Gagal mengambil dan menyimpan data",
  "details": "Detail pesan error"
}
```

### 2. Daftar Semua Produk

Menampilkan semua produk yang berstatus "bisa dijual".

**Endpoint:** `GET /`

**Respons:** Halaman HTML yang menampilkan daftar produk

### 3. Tambah Produk Baru

Membuat produk baru di database.

**Endpoint:** `POST /produk/add`

**Body Request:**

```json
{
  "nama_produk": "string",
  "harga": "number",
  "kategori_id": "number",
  "status_id": "number"
}
```

**Respons:** Redirect ke halaman utama jika berhasil

**Validasi:**

- Semua field wajib diisi
- harga, kategori_id, dan status_id harus berupa angka

### 4. Edit Produk

Memperbarui produk yang sudah ada.

**Endpoint:** `POST /produk/edit/:id`

**Parameter URL:**

- id: ID Produk (angka)

**Body Request:**

```json
{
  "nama_produk": "string",
  "harga": "number",
  "kategori_id": "number",
  "status_id": "number"
}
```

**Respons:** Redirect ke halaman utama jika berhasil

### 5. Hapus Produk

Menghapus produk dari database.

**Endpoint:** `POST /produk/delete/:id`

**Parameter URL:**

- id: ID Produk (angka)

**Respons:** Redirect ke halaman utama jika berhasil

## Endpoint Form

### 1. Form Tambah Produk

Menampilkan form untuk menambah produk baru.

**Endpoint:** `GET /produk/add`

**Respons:** Halaman HTML dengan form tambah produk

### 2. Form Edit Produk

Menampilkan form untuk mengedit produk yang ada.

**Endpoint:** `GET /produk/edit/:id`

**Parameter URL:**

- id: ID Produk (angka)

**Respons:** Halaman HTML dengan form edit produk

## Model Data

### Produk

```javascript
{
  nama_produk: string,
  harga: integer,
  kategori_id: integer,
  status_id: integer
}
```

### Kategori

```javascript
{
  nama_kategori: string;
}
```

### Status

```javascript
{
  nama_status: string;
}
```

## Penanganan Error

API mengembalikan kode status berikut:

- `200`: Berhasil
- `400`: Bad Request (input tidak valid)
- `404`: Tidak Ditemukan
- `500`: Error Server Internal

Respons error meliputi:

- Error validasi form
- Error operasi database
- Error koneksi API eksternal

## Pemetaan Status

Nilai status dipetakan sebagai berikut:

```javascript
{
  "bisa dijual": 1,
  "tidak bisa dijual": 2
}
```

## Catatan Pengembangan

1. Menggunakan Sequelize untuk operasi database
2. Semua form menggunakan metode POST
3. Frontend menggunakan template EJS
4. Integrasi API eksternal menggunakan axios
5. Validasi data form sebelum diproses

## Dependensi

- express: Framework web
- sequelize: ORM database
- axios: HTTP client
- crypto: Enkripsi
- ejs: Template engine
- body-parser: Parser request body

## Pengaturan Lingkungan

Pastikan variabel lingkungan berikut telah diatur:

- `PORT`: Port server (default: 3000)
- `DB_NAME`: Nama database
- `DB_USER`: Username database
- `DB_PASSWORD`: Password database
- `DB_HOST`: Host database

## Contoh Penggunaan API

### 1. Mengambil Data dari API Eksternal

```bash
curl -X POST http://localhost:3000/api/fetch-data
```

### 2. Menambah Produk Baru

```bash
curl -X POST http://localhost:3000/produk/add \
  -H "Content-Type: application/json" \
  -d '{
    "nama_produk": "Printer XYZ",
    "harga": 1500000,
    "kategori_id": 1,
    "status_id": 1
  }'
```

### 3. Mengupdate Produk

```bash
curl -X POST http://localhost:3000/produk/edit/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nama_produk": "Printer XYZ Updated",
    "harga": 1600000,
    "kategori_id": 1,
    "status_id": 1
  }'
```
