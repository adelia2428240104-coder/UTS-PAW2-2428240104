
# UTS PAW II - Penerbitan Jurnal

## Deskripsi
RESTful API untuk pengelolaan data jurnal dan artikel menggunakan Express.js dan MongoDB.

## Desain Data Model

- **Embedding (`penulisUtama`):** Nama dan afiliasi penulis disimpan langsung di dalam artikel karena kedua data tersebut selalu digunakan bersama artikel.
- **Referencing (`jurnalId`):** Data jurnal disimpan terpisah agar dapat dihubungkan dengan beberapa artikel tanpa mengulang informasi jurnal.

## Daftar Endpoint

### Jurnal
- POST `/jurnal` - Menambahkan jurnal
- GET `/jurnal` - Menampilkan daftar jurnal
- GET `/jurnal/:id` - Menampilkan detail jurnal

### Artikel
- POST `/artikel` - Menambahkan artikel
- GET `/artikel` - Menampilkan daftar artikel
- GET `/artikel/:id` - Menampilkan detail artikel
- PUT `/artikel/:id` - Mengubah artikel
- DELETE `/artikel/:id` - Menghapus artikel

## Menjalankan Project

1. Install dependency:
   `npm install`

2. Buat file `.env` berdasarkan `.env.example`.

3. Pastikan MongoDB aktif.

4. Jalankan server:
   `npm start`

Server berjalan di `http://localhost:3000`.
