// ==========================================
// TUGAS KRIPTOGRAFI: IMPLEMENTASI RSA (FROM SCRATCH)
// ==========================================

// 1. Fungsi Bantuan Matematika (Mathematical Helpers)

// Fungsi untuk mencari Faktor Persekutuan Terbesar (Greatest Common Divisor)
function gcd(a, b) {
    while (b !== 0n) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Fungsi Extended Euclidean Algorithm untuk mencari Invers Modular (nilai 'd')
// Mencari d sehingga (d * e) % phi == 1
function modInverse(e, phi) {
    let m0 = phi;
    let y = 0n, x = 1n;

    if (phi === 1n) return 0n;

    while (e > 1n) {
        let q = e / phi;
        let t = phi;

        phi = e % phi;
        e = t;
        t = y;

        y = x - q * y;
        x = t;
    }

    if (x < 0n) x += m0;

    return x;
}

// Fungsi Eksponensial Modular (Modular Exponentiation)
// Menghitung (base^exp) % mod secara efisien tanpa membuat angka menjadi terlalu raksasa
function modExp(base, exp, mod) {
    let result = 1n;
    base = base % mod;
    while (exp > 0n) {
        // Jika pangkat ganjil, kalikan base dengan result
        if (exp % 2n === 1n) {
            result = (result * base) % mod;
        }
        // Geser bit pangkat ke kanan (dibagi 2) dan kuadratkan base
        exp = exp / 2n;
        base = (base * base) % mod;
    }
    return result;
}

// ==========================================
// 2. Inti Algoritma RSA
// ==========================================

class RSA {
    constructor(p, q) {
        // Konversi input ke BigInt
        this.p = BigInt(p);
        this.q = BigInt(q);
        
        // Tahap 2: Hitung n (modulus)
        this.n = this.p * this.q;
        
        // Tahap 3: Hitung Totient phi(n)
        this.phi = (this.p - 1n) * (this.q - 1n);
        
        // Tahap 4: Pilih e (Kunci Publik)
        this.e = 3n; // Mulai coba dari angka kecil
        while (this.e < this.phi) {
            if (gcd(this.e, this.phi) === 1n) {
                break; // Ketemu e yang koprima dengan phi
            }
            this.e += 2n;
        }
        
        // Tahap 5: Hitung d (Kunci Privat)
        this.d = modInverse(this.e, this.phi);
    }

    getPublicKey() {
        return { e: this.e, n: this.n };
    }

    getPrivateKey() {
        return { d: this.d, n: this.n };
    }

    // Fungsi Enkripsi: C = M^e mod n
    encrypt(plaintext, publicKey) {
        // Karena ini from scratch, kita enkripsi per karakter ASCII
        let ciphertext = [];
        for (let i = 0; i < plaintext.length; i++) {
            let m = BigInt(plaintext.charCodeAt(i));
            let c = modExp(m, publicKey.e, publicKey.n);
            ciphertext.push(c);
        }
        return ciphertext; // Array angka ciphertext
    }

    // Fungsi Dekripsi: M = C^d mod n
    decrypt(ciphertextArray, privateKey) {
        let plaintext = "";
        for (let i = 0; i < ciphertextArray.length; i++) {
            let c = ciphertextArray[i];
            let m = modExp(c, privateKey.d, privateKey.n);
            plaintext += String.fromCharCode(Number(m)); // Kembalikan ke karakter ASCII
        }
        return plaintext;
    }
}

// Fungsi untuk mengecek apakah sebuah angka (BigInt) adalah bilangan prima
function isPrime(num) {
    if (num <= 1n) return false;
    if (num <= 3n) return true;
    
    // Singkirkan bilangan genap dan kelipatan 3 untuk optimasi
    if (num % 2n === 0n || num % 3n === 0n) return false;

    // Cek faktor pembagi mulai dari 5 hingga akar kuadrat dari angka tersebut
    for (let i = 5n; i * i <= num; i += 6n) {
        if (num % i === 0n || num % (i + 2n) === 0n) {
            return false;
        }
    }
    return true;
}

// Fungsi untuk mencari bilangan prima acak di antara nilai minimum dan maksimum
function generateRandomPrime(min, max) {
    let prime = 0n;
    while (!isPrime(prime)) {
        // Hasilkan angka acak biasa, lalu konversi ke BigInt
        let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        prime = BigInt(randomNum);
    }
    return prime;
}


// ==========================================
// 3. Demonstrasi (Step-by-Step Run)
// ==========================================

console.log("=== SIMULASI ALGORITMA RSA ===");

// Menentukan rentang angka untuk bilangan prima acak (misal: 100 sampai 1000)
const minRange = 100;
const maxRange = 1000;

// Mengambil bilangan prima acak untuk p dan q
const p = generateRandomPrime(minRange, maxRange);
let q = generateRandomPrime(minRange, maxRange);

// Mencegah p dan q memiliki nilai yang sama (syarat RSA: p != q)
while (p === q) {
    q = generateRandomPrime(minRange, maxRange);
}

console.log(`1. Membangkitkan Kunci (Key Generation) dengan p=${p} dan q=${q}...`);
const rsa = new RSA(p, q);

const publicKey = rsa.getPublicKey();
const privateKey = rsa.getPrivateKey();

console.log("-> Kunci Publik (e, n):", publicKey.e.toString(), ",", publicKey.n.toString());
console.log("-> Kunci Privat (d, n):", privateKey.d.toString(), ",", privateKey.n.toString());

// Pesan yang akan dienkripsi
const pesanAsli = "HELLO";
console.log(`\n2. Pesan Asli (Plaintext): "${pesanAsli}"`);

// Proses Enkripsi
const ciphertext = rsa.encrypt(pesanAsli, publicKey);
console.log("3. Proses Enkripsi (Ciphertext Array):", ciphertext.map(c => c.toString()));

// Proses Dekripsi
const pesanDekripsi = rsa.decrypt(ciphertext, privateKey);
console.log(`4. Proses Dekripsi (Plaintext hasil dekripsi): "${pesanDekripsi}"`);

console.log("\nSimulasi Selesai! Pesan berhasil dikembalikan dengan utuh.");