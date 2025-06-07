# WhatsApp Pairing Bot

Bot WhatsApp sederhana menggunakan [Baileys v5](https://github.com/adiwajshing/Baileys) yang menggunakan pairing code berupa nomor WhatsApp (diawali 62) untuk login, menampilkan ASCII art di terminal, dan memiliki command `.list` untuk mengirim daftar produk.

## Fitur

- Login dengan nomor WA diawali 62
- Simpan session otomatis ke folder `auth_info_<nomor>`
- Menu `.list` yang mengirim pesan daftar produk ke chat
- Tampil ASCII art dan pesan input nomor di terminal

## Cara Instalasi

1. Pastikan sudah punya Node.js minimal versi 16.
2. Clone repo atau copy file ke folder lokal.
3. Jalankan perintah install:

   ```bash
   npm install
