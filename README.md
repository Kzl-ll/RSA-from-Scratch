Tugas Kriptografi: Implementasi RSA (From Scratch)

Repositori ini berisi implementasi algoritma **RSA (Rivest-Shamir-Adleman)** asimetris yang dibangun murni dari awal (*from scratch*) menggunakan JavaScript. Program ini tidak menggunakan *library* kriptografi instan bawaan apa pun dan mendemonstrasikan logika matematika di balik pembuatan kunci (*Key Generation*), enkripsi, dan dekripsi.

Implementasi ini dibuat untuk memenuhi Tugas Mata Kuliah **Keamanan Data dan Informasi**.

Fitur Utama
- **Tanpa Library Eksternal:** Seluruh kalkulasi matematika (`gcd`, `modInverse`, `modExp`) ditulis secara manual.
- **Dukungan BigInt:** Menggunakan tipe data `BigInt` asli bawaan JavaScript untuk mencegah eror presisi atau limitasi memori saat menghitung eksponensial modular yang sangat besar.
- **Prime Generator:** Dilengkapi dengan algoritma pendeteksi bilangan prima yang dioptimasi (menggunakan pola $6k \pm 1$) untuk menghasilkan nilai $p$ dan $q$ secara acak dan dinamis.
- **Enkripsi per Karakter ASCII:** Mengubah teks biasa (Plaintext) menjadi representasi angka, dienkripsi, dan dikembalikan kembali menjadi teks secara akurat.

---

Cara Menjalankan Program

Program ini dieksekusi melalui *Command Line Interface (CLI)* menggunakan Node.js. Berikut adalah langkah-langkah untuk menjalankannya:

1. Prasyarat (Prerequisites)
Pastikan komputer Anda sudah terinstal **Node.js**. Anda bisa mengunduh dan menginstalnya melalui [situs resmi Node.js](https://nodejs.org/).
Untuk mengecek apakah Node.js sudah terinstal, buka terminal/Command Prompt dan ketik:
node -v
2. Persiapan File
Unduh file rsa.js dari repositori ini, atau salin seluruh source code dan simpan ke dalam file baru bernama rsa.js di komputer Anda.

Buka Terminal (macOS/Linux) atau Command Prompt / PowerShell (Windows).

Arahkan direktori terminal ke folder tempat Anda menyimpan file RSA.js. Contoh:

Bash

cd letak/folder/penyimpanan/anda/

3. Eksekusi Program
Jalankan perintah berikut di terminal:

Bash

node RSA.js
4. Kustomisasi Pesan (Opsional)
Jika Anda ingin mencoba mengenkripsi kata atau kalimat lain, Anda dapat mengedit file RSA.js menggunakan text editor (seperti VS Code, Notepad, dll).
Cari baris kode berikut (di bagian bawah file):

JavaScript

// Pesan yang akan dienkripsi
const pesanAsli = "HELLO";
Ganti kata "HELLO" dengan pesan apa pun yang Anda inginkan, lalu simpan file dan jalankan ulang perintah node RSA.js.

📝 Contoh Output ProgramSaat dijalankan, program akan menghasilkan output dinamis di terminal (karena nilai $p$ dan $q$ dibangkitkan secara acak). Berikut adalah contoh log yang akan muncul:Plaintext=== SIMULASI ALGORITMA RSA ===
1. Membangkitkan Kunci (Key Generation) dengan p=839 dan q=443...
-> Kunci Publik (e, n): 3 , 371677
-> Kunci Privat (d, n): 247155 , 371677

2. Pesan Asli (Plaintext): "HELLO"
3. Proses Enkripsi (Ciphertext Array): [ '364539', '196884', '20199', '20199', '292271' ]
4. Proses Dekripsi (Plaintext hasil dekripsi): "HELLO"

Simulasi Selesai! Pesan berhasil dikembalikan dengan utuh.
📂 Struktur Fungsi Kodegcd(a, b): Mencari Faktor Persekutuan Terbesar (FPB).modInverse(e, phi): Extended Euclidean Algorithm untuk mencari kunci privat ($d$).modExp(base, exp, mod): Modular Exponentiation efisien untuk menghitung $C = M^e \pmod n$ dan $M = C^d \pmod n$.isPrime(num): Mengecek keprimaan suatu angka (menggunakan optimasi $6k \pm 1$).generateRandomPrime(min, max): Mencari angka prima secara acak dalam batas tertentu.class RSA: Mengelola logika penggabungan kunci, proses enkripsi, dan dekripsi.
