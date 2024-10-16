# 🚗 Backend CRUD Rental Mobil - Aplikasi Dashboard

Proyek ini adalah **Backend** untuk aplikasi **dashboard CRUD rental mobil**, yang dibangun dengan **Express.js** dan menggunakan **PostgreSQL**. Aplikasi ini menyediakan fitur manajemen pengguna, mobil, rental, serta review, termasuk registrasi pengguna dan unggah file gambar mobil dan foto profile user menggunakan **ImageKit**

## 📄 DataBase ERD
![Deskripsi gambar](./public/images/CarsRentals.png).

## 📋 Fitur Utama

- **Registrasi Pengguna**: Pengguna dapat mendaftar.
- **Manajemen Pengguna (CRUD User)**: Admin dapat menambah, mengedit, melihat, dan menghapus data pengguna.
- **Manajemen Mobil (CRUD Cars)**: Admin dapat mengelola daftar mobil (CRUD mobil), termasuk fitur upload gambar.
- **Manajemen Rental Mobil (CRUD Rentals)**: Pengguna dapat menyewa mobil, melihat riwayat rental, dan admin dapat mengelola rental.
- **Review Mobil (CRUD Reviews)**: Pengguna dapat memberikan ulasan terhadap mobil yang mereka sewa.
- **Upload File**: Pengunggahan gambar mobil dan foto profile user dengan penyimpanan berbasis cloud menggunakan **ImageKit**.

## 🛠️ Teknologi yang Digunakan

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL, Sequelize ORM
- **Upload File**: Multer, ImageKit
- **Dokumentasi API**: Postman

## 🚀 Memulai

### Prasyarat

- [Node.js](https://nodejs.org/) (v14+)
- [PostgreSQL](https://www.postgresql.org/)
- [ImageKit](https://imagekit.io/) (untuk penyimpanan gambar di cloud)

### Instalasi

1. Clone repository ini:

   ```bash
   git clone https://github.com/username/rental-mobil-backend.git
   ```

2. Instal semua dependensi:

   ```bash
   cd rental-mobil-backend
   npm install
   ```

3. Buat file `.env` dengan variabel lingkungan berikut:

   ```bash
   DB_USERNAME=your_db_username
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name

   PUBLIC_KEY=your_imagekit_public_key
   PRIVATE_KEY=your_imagekit_private_key
   URL_ENDPOINT=your_imagekit_url_endpoint
   ```

4. Siapkan database PostgreSQL dan jalankan migrasi:

   ```bash
   npx sequelize db:create
   npx sequelize db:migrate
   ```

### Menjalankan Aplikasi

Untuk memulai server dalam mode pengembangan:

```bash
npm run dev
```

API akan tersedia di `http://localhost:3000`.

## 📂 Endpoint API

### Autentikasi

| Method | Endpoint               | Deskripsi                          |
|--------|------------------------|------------------------------------|
| POST   | `/dashboard/auth/register` | Registrasi pengguna baru           |

### Manajemen Pengguna (CRUD User)

| Method | Endpoint               | Deskripsi                          |
|--------|------------------------|------------------------------------|
| GET    | `/dashboard/users`         | Mengambil semua pengguna           |
| GET    | `/dashboard/users/:id`     | Mengambil detail pengguna          |
| POST   | `/dashboard/users`         | Menambahkan pengguna baru          |
| PUT    | `/dashboard/users/:id`     | Memperbarui data pengguna          |

### Manajemen Mobil (CRUD Cars)

| Method | Endpoint               | Deskripsi                          |
|--------|------------------------|------------------------------------|
| GET    | `/dashboard/cars`          | Mengambil semua data mobil         |
| GET    | `/dashboard/cars/:id`      | Mengambil detail mobil tertentu    |
| POST   | `/dashboard/cars`          | Menambahkan mobil baru beserta gambar (multiple files) |
| PUT    | `/dashboard/cars/:id`      | Memperbarui data mobil             |

### Manajemen Rental Mobil (CRUD Rentals)

| Method | Endpoint               | Deskripsi                          |
|--------|------------------------|------------------------------------|
| GET    | `/dashboard/rentals`       | Mengambil semua data rental        |
| GET    | `/dashboard/rentals/:id`   | Mengambil detail rental tertentu   |
| POST   | `/dashboard/rentals`       | Menambahkan data rental baru       |
| PUT    | `/dashboard/rentals/:id`   | Memperbarui data rental            |

### Review Mobil (CRUD Reviews)

| Method | Endpoint               | Deskripsi                          |
|--------|------------------------|------------------------------------|
| GET    | `/dashboard/reviews`       | Mengambil semua review             |
| GET    | `/dashboard/reviews/:id`   | Mengambil detail review tertentu   |
| POST   | `/dashboard/reviews`       | Menambahkan review baru            |
| PUT    | `/dashboard/reviews/:id`   | Memperbarui review                 |
| DELETE | `/dashboard/reviews/:id`   | Menghapus review                   |

## 🤝 Kontribusi

Daftar Anggota Dalam Repository Ini

1. **[Wahyu Anang Zulfikri](https://github.com/wahyuanang)** Read cars (admin, customer) & Detail cars (admin, customer)
2. **[Rafly Aziz Abdillah](https://github.com/raflytch)** Register/create user (customer) & Update user (customer)
3. **[Ahmad Alif Ramadhan](https://github.com/neobitose)** Create cars (admin) & Update cars (admin)
4. **[Gede Brandon Abelio Ogaden](https://github.com/OddDuckkk)** Read peminjaman (admin,customer) & Retail peminjaman (admin, customer)
5. **[Nita Fitrotul Mar'ah](https://github.com/Nitaa1904)** Read user (admin) & Detail user (admin, customer)
6. **[Jetro Sulthan Fatih Nurrafi](https://github.com/JetroSulthan)** Create peminjaman (customer) & Update peminjaman (customer)
7. **[Tegar Alfa Rizzi](https://github.com/TegarAlfaR)** Read review (admin, customer) & Delete review (customer)
8. **[Muhammad Rifqi Tri Afandi](https://github.com/RifqiAfandi)** Create review (customer) & Update review (customer)
## Teknologi yang Digunakan

- **Node.js**: Runtime untuk backend.
- **Express.js**: Framework web untuk Node.js.
- **ImageKit**: Penyimpanan cloud untuk gambar.
- **Sequelize**: ORM untuk PostgreSQL.
- **Multer**: Middleware untuk menangani `multipart/form-data` untuk upload file.