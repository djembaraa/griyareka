# Scope of Testing (SOT)

**Proyek**: GriyaReka Web Application  
**Versi Dokumen**: 1.0  
**Tanggal**: 6 Juli 2026  
**Disusun oleh**: Djembar Arafat (Mahasiswa)  
**Untuk**: Mata Kuliah Project Mandiri - Pengujian Keamanan Website

---

## 1. Informasi Proyek

GriyaReka adalah aplikasi web profil perusahaan developer properti yang dilengkapi dengan Content Management System (CMS) untuk mengelola properti dan artikel blog. Aplikasi ini dibangun menggunakan Next.js 16, Supabase, dan berbagai library modern.

> **Catatan Penting**: Proyek ini secara sengaja dirancang sebagai **laboratorium akademik** untuk keperluan pengujian kerentanan Cross-Site Scripting (XSS) dan mitigasinya (lihat README.md).

## 2. Target Pengujian

| Item                  | Detail                                      |
|-----------------------|---------------------------------------------|
| **URL Target**        | https://griyareka-pi.vercel.app/            |
| **Tipe Aplikasi**     | Web Application (Next.js + Supabase)        |
| **Lingkungan**        | Production (Vercel)                         |
| **Akses**             | Public + Admin CMS (menggunakan kredensial yang disediakan) |
| **Fokus Pengujian**   | Web Application Security, khususnya XSS Injection |

## 3. Ruang Lingkup Pengujian (Scope)

### 3.1 In-Scope (Yang Diizinkan untuk Diuji)

- Seluruh halaman publik:
  - Homepage (`/`)
  - Blog (`/blog` dan `/blog/[id]`)
  - Properties (`/properties` dan detail)
  - Contact (`/contact`)
  - About, Services, Privacy, Terms
- Fitur Testimonial / Ulasan Pengguna (form publik)
- Chatbot Widget (AI-powered)
- Admin CMS (setelah login):
  - Manajemen Posts (Blog)
  - Manajemen Properties
  - Manajemen Testimonials
  - Dashboard dan Profile
- Semua form input dan parameter yang dapat dikontrol pengguna
- Rendering konten HTML dari database (khususnya blog posts)
- Autentikasi dan sesi (dalam batas wajar)

### 3.2 Out-of-Scope (Tidak Diizinkan)

- Serangan terhadap infrastruktur Supabase (database, storage, auth service)
- Denial of Service (DoS / DDoS)
- Social Engineering terhadap pihak pengembang atau pengguna nyata
- Testing pada domain atau subdomain lain selain `griyareka-pi.vercel.app`
- Eksploitasi yang dapat menyebabkan kerusakan permanen pada data
- Pengujian terhadap pihak ketiga (misalnya Unsplash image host, Google Fonts, dll.)
- Brute force login tanpa persetujuan eksplisit
- Pengujian fisik atau hardware

## 4. Tujuan Pengujian (Objectives)

1. Mengidentifikasi celah keamanan pada aplikasi web GriyaReka.
2. **Fokus utama**: Menemukan dan mengeksploitasi kerentanan **Stored Cross-Site Scripting (XSS)** pada fitur Blog.
3. Menganalisis input handling, output encoding, dan sanitization pada berbagai fitur.
4. Mendemonstrasikan dampak nyata dari kerentanan yang ditemukan.
5. Memberikan rekomendasi perbaikan yang dapat diterapkan.
6. Mendokumentasikan proses pengujian secara profesional untuk keperluan akademik.

## 5. Metodologi Pengujian

Pengujian dilakukan dengan pendekatan **Black-Box** dengan bantuan **Gray-Box** (analisis source code untuk mempercepat pemahaman, namun eksekusi serangan dilakukan seolah-olah hanya menggunakan URL).

Langkah-langkah:
1. **Reconnaissance & Information Gathering**
   - Pemetaan seluruh halaman dan endpoint
   - Analisis teknologi yang digunakan
   - Identifikasi semua titik input (forms, URL parameters, chatbot, dll.)

2. **Vulnerability Assessment**
   - Pengujian manual terhadap setiap input point
   - Pengujian XSS (Reflected, Stored, DOM-based)
   - Pengujian sanitization pada testimonial dan blog content

3. **Exploitation**
   - Pembuatan Proof-of-Concept (PoC) untuk Stored XSS melalui fitur pembuatan artikel blog
   - Demonstrasi eksekusi script pada halaman publik

4. **Post-Exploitation & Impact Analysis**
   - Analisis dampak (session hijacking, defacement, data theft, dll.)

5. **Documentation**
   - Pengumpulan bukti menggunakan Burp Suite dan screenshot/video
   - Penulisan laporan

## 6. Tools dan Environment yang Digunakan

- **Burp Suite** (Community / Professional) — Proxy, Repeater, Intruder, Site Map
- **Web Browser** (Chrome/Edge dengan proxy configuration)
- **WSL Kali Linux** — untuk command line tools (curl, manual request)
- **Browser Developer Tools** (Console, Network, Elements)
- **Supabase Dashboard** (hanya untuk persiapan kredensial admin, bukan untuk serangan)
- Dokumentasi manual dan catatan

## 7. Rules of Engagement (Aturan Main)

1. Semua pengujian **hanya** dilakukan terhadap URL `https://griyareka-pi.vercel.app/`.
2. Penggunaan kredensial admin hanya untuk keperluan demonstrasi kerentanan yang telah diizinkan.
3. Setiap post atau data test yang mengandung payload berbahaya **harus dihapus** segera setelah pengumpulan bukti.
4. Tidak melakukan tindakan yang dapat mengganggu ketersediaan layanan bagi pengguna lain.
5. Tidak mencoba mengakses data pengguna lain tanpa otorisasi.
6. Semua aktivitas didokumentasikan dengan jelas.
7. Pengujian dilakukan untuk tujuan **akademik** dan pembelajaran semata.

## 8. Pernyataan Otorisasi (Authorization)

Pengujian ini dilakukan dalam rangka **mata kuliah Project Mandiri** dengan persetujuan dosen pengampu. Tujuan utamanya adalah untuk menganalisis dan mendemonstrasikan kerentanan keamanan pada aplikasi web yang dikembangkan sendiri oleh mahasiswa.

Pengembang (Djembar Arafat) memberikan izin penuh untuk melakukan pengujian penetrasi pada aplikasi yang di-deploy di Vercel ini, **hanya untuk keperluan pelaporan akademik**.

## 9. Timeline Pengujian (Estimasi)

- **Tanggal Mulai**: 6 Juli 2026
- **Durasi Pengujian**: 1–3 hari (tergantung kedalaman eksplorasi)
- **Pelaporan**: Segera setelah eksploitasi dan dokumentasi selesai

## 10. Deliverables

Dokumen yang akan dihasilkan:
- Scope of Testing (SOT.md) — dokumen ini
- Laporan Pengujian Keamanan lengkap (dengan PoC, screenshot, dan rekomendasi)
- Video demonstrasi (jika diperlukan)
- Daftar temuan kerentanan beserta tingkat keparahan

## 11. Catatan Tambahan

- Proyek ini secara eksplisit menyebutkan di README.md bahwa Blog feature dibuat sebagai laboratorium untuk pengujian XSS.
- Kerentanan Stored XSS pada `/blog/[id]` ditemukan karena konten disimpan dan dirender secara mentah menggunakan `dangerouslySetInnerHTML` tanpa sanitasi server-side.
- Sanitasi hanya diterapkan secara parsial (client-side preview dan testimonial).

---

**Disetujui oleh:**

Mahasiswa: ___________________________  
Tanggal: ___________________________

Dosen Pengampu: ___________________________  
Tanggal: ___________________________

---

*Dokumen ini dibuat sebagai bagian dari proses dokumentasi pengujian keamanan untuk keperluan akademik.*