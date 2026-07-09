// ================================
// 1. Object Mahasiswa (const)
// ================================
const mahasiswa = {
  nama: "Budi Santoso",
  nim: "23110001",
  prodi: "Teknik Informatika",
  semester: 4,
  nilai: [85, 90, 78, 88],
};

// ================================
// 2. Destructuring Assignment
// ================================
const { nama, nim, prodi, nilai } = mahasiswa;
let { semester } = mahasiswa;

// ================================
// 3. Arrow Function
// Menghitung Total Nilai
// Menggunakan Rest Operator
// ================================
const hitungTotal = (...angka) => angka.reduce((total, nilai) => total + nilai, 0);

// ================================
// 4. Arrow Function
// Menghitung Rata-rata
// ================================
const hitungRataRata = (dataNilai) => hitungTotal(...dataNilai) / dataNilai.length;

// ================================
// 5. Menentukan Grade
// ================================
const tentukanGrade = (rata) => {
  if (rata >= 85) return "A";
  if (rata >= 75) return "B";
  if (rata >= 65) return "C";
  if (rata >= 50) return "D";
  return "E";
};

// ================================
// Perhitungan
// ================================
const totalNilai = hitungTotal(...nilai);
const rataRata = hitungRataRata(nilai);
const grade = tentukanGrade(rataRata);

// ================================
// 6. Spread Operator
// Membuat object baru
// ================================
const mahasiswaAktif = { ...mahasiswa, status: "Aktif", rataRata: rataRata.toFixed(2), grade, };

// ================================
// 7. Template Literals
// ================================
console.log(`
====================================================
            DATA MAHASISWA
====================================================
Nama       : ${nama}
NIM        : ${nim}
Program    : ${prodi}
Semester   : ${semester}

Daftar Nilai
----------------------------------------------------
Matkul 1   : ${nilai[0]}
Matkul 2   : ${nilai[1]}
Matkul 3   : ${nilai[2]}
Matkul 4   : ${nilai[3]}
----------------------------------------------------
Total Nilai : ${totalNilai}
Rata-rata   : ${rataRata.toFixed(2)}
Grade       : ${grade}
Status      : ${mahasiswaAktif.status}
====================================================
`);

// ================================
// Object Asli
// ================================
console.log("Object Mahasiswa Asli");
console.table(mahasiswa);

// ================================
// Object Baru
// ================================
console.log("Object Mahasiswa Baru");
console.table(mahasiswaAktif);

// ================================
// Kesimpulan
// ================================
console.log(`
${nama} dengan NIM ${nim}
merupakan mahasiswa Program Studi ${prodi}
semester ${semester}.

Mahasiswa tersebut memperoleh rata-rata nilai
${rataRata.toFixed(2)} dengan Grade ${grade}
dan berstatus "${mahasiswaAktif.status}".
`);