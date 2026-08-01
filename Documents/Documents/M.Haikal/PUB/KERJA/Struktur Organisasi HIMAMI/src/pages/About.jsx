import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Lightbulb,
  HeartHandshake,
  Award,
  Target,
  Compass,
  History,
  Clock,
  MapPin,
  Scale,
  Flag,
  Hexagon,
  Triangle,
  Users,
  Monitor,
  Building2,
  Shirt,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  Sparkles,
  Zap,
  Eye,
  Layers,
} from "lucide-react";
import logo from "../assets/logo-himami.png";
import pdhImg from "../assets/pdh-himami.png";
import benderaImg from "../assets/bendera-himami.png";

function About() {
  const [activeTab, setActiveTab] = useState("sejarah");
  const [selectedImage, setSelectedImage] = useState(null);

  // NILAI UTAMA ORGANISASI
  const values = [
    {
      title: "INTEGRITAS",
      desc: "Menjunjung tinggi kejujuran, etika akademik, dan tanggung jawab moral dalam setiap tindakan.",
      icon: <ShieldCheck size={28} />,
      color: "from-blue-500 to-indigo-600",
      accentBg: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      title: "INOVASI",
      desc: "Berani berpikir kritis, kreatif, dan menciptakan solusi teknologi yang berdaya guna.",
      icon: <Lightbulb size={28} />,
      color: "from-amber-400 to-orange-500",
      accentBg: "bg-amber-50 text-amber-600 border-amber-200",
    },
    {
      title: "KEKELUARGAAN",
      desc: "Membangun rasa solidaritas, saling mendukung, dan keterikatan yang erat antar sesama anggota.",
      icon: <HeartHandshake size={28} />,
      color: "from-rose-500 to-pink-600",
      accentBg: "bg-rose-50 text-rose-600 border-rose-200",
    },
    {
      title: "PROFESIONAL",
      desc: "Berorientasi pada kualitas terbaik, disiplin tinggi, dan tata kelola himpunan yang handal.",
      icon: <Award size={28} />,
      color: "from-emerald-500 to-teal-600",
      accentBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
    },
  ];

  // AD/ART CHAPTER DATA
  const adartData = [
    {
      bab: "BAB I",
      title: "KETENTUAN UMUM",
      pasalList: [
        {
          pasal: "Pasal 1",
          subtitle: "Ketentuan Umum",
          content:
            "Himpunan Mahasiswa Manajemen Informatika Universitas Nasional PASIM yang selanjutnya disebut HIMAMI UNAS PASIM adalah lembaga eksekutif mahasiswa yang berada di tingkat Jurusan.",
        },
      ],
    },
    {
      bab: "BAB II",
      title: "NAMA, WAKTU, DAN TEMPAT KEDUDUKAN",
      pasalList: [
        {
          pasal: "Pasal 2",
          subtitle: "NAMA",
          content:
            "Organisasi ini bernama Himpunan Mahasiswa Manajemen Informatika Universitas Nasional PASIM disingkat menjadi HIMAMI UNAS PASIM.",
        },
        {
          pasal: "Pasal 3",
          subtitle: "WAKTU",
          content:
            "HIMAMI UNAS PASIM didirikan pada 30 Oktober 2021 dengan waktu 10:42 WIB yang telah ditentukan.",
        },
        {
          pasal: "Pasal 4",
          subtitle: "TEMPAT KEDUDUKAN",
          content:
            "HIMAMI UNAS PASIM berkedudukan di Prodi D-3 Manajemen Informatika Fakultas Ilmu Komputer Universitas Nasional PASIM Bandung.",
        },
      ],
    },
    {
      bab: "BAB III",
      title: "STATUS, ASAS, DAN LANDASAN",
      pasalList: [
        {
          pasal: "Pasal 5",
          subtitle: "STATUS",
          content:
            "HIMAMI UNAS PASIM merupakan lembaga eksekutif tertinggi di Prodi D-3 Manajemen Informatika Fakultas Ilmu Komputer UNAS PASIM.",
        },
        {
          pasal: "Pasal 6",
          subtitle: "ASAS",
          content: "HIMAMI UNAS PASIM berasaskan Pancasila.",
        },
        {
          pasal: "Pasal 7",
          subtitle: "LANDASAN",
          content: "HIMAMI UNAS PASIM berlandaskan :",
          items: [
            { label: "1. Idiil", val: "Tri Dharma Perguruan Tinggi" },
            { label: "2. Konstitusional", val: "AD Ormawa" },
            { label: "3. Operasional", val: "1. AD/ART HIMAMI UNAS PASIM" },
          ],
        },
      ],
    },
    {
      bab: "BAB IV",
      title: "TUJUAN, SIFAT, DAN FUNGSI",
      pasalList: [
        {
          pasal: "Pasal 8",
          subtitle: "TUJUAN",
          content:
            "HIMAMI UNAS PASIM bertujuan: mencetak generasi unggul yang berperan aktif dalam kegiatan Akademis maupun Non Akademis dan menjadi wadah untuk meningkatkan skill, mutu serta profesionalitas.",
        },
        {
          pasal: "Pasal 9",
          subtitle: "SIFAT",
          content:
            "HIMAMI UNAS PASIM bersifat Aspiratif, Komunikatif, Independen, Transparansi.",
        },
        {
          pasal: "Pasal 10",
          subtitle: "FUNGSI",
          content:
            "HIMAMI UNAS PASIM menerima serta mengadvokasi aspirasi mahasiswa Jurusan D-3 Manajemen Informatika UNAS PASIM.",
        },
      ],
    },
  ];

  // LOGO BREAKDOWN DATA
  const logoElements = [
    {
      icon: <Hexagon className="text-blue-600" size={24} />,
      title: "Segi Enam",
      badge: "Keluarga & Aspirasi",
      desc: "Melambangkan keluarga besar HIMAMI merupakan satu Kesatuan yang sulit dipisahkan serta memiliki arti menampung aspirasi anggota HIMAMI.",
    },
    {
      icon: <Triangle className="text-indigo-600 rotate-180" size={24} />,
      title: "2 Segitiga",
      badge: "Inklusivitas & Arah",
      desc: "Melambangkan bahwa HIMAMI terdiri atas mahasiswa beasiswa dan non beasiswa. Bentuk segitiga tersendiri memiliki makna menunjukkan pergerakan berdasarkan kemana HIMAMI menunjuk atau sebagai arah/puncak keberhasilan.",
    },
    {
      icon: <Users className="text-[#0B25B7]" size={24} />,
      title: "Kumpulan Orang",
      badge: "Sinergi Kebersamaan",
      desc: "Melambangkan HIMAMI yang terdiri dari berbagai individu untuk mencapai tujuan bersama.",
    },
    {
      icon: <Monitor className="text-sky-500" size={24} />,
      title: "Komputer",
      badge: "Wawasan Teknologi",
      desc: "Melambangkan pengetahuan yang luas.",
    },
    {
      icon: <Building2 className="text-rose-600" size={24} />,
      title: "Logo Universitas",
      badge: "Naungan Institusi",
      desc: "Melambangkan bahwa HIMAMI berkedudukan di Universitas Nasional PASIM.",
    },
  ];

  // COLOR MEANING DATA
  const colorMeanings = [
    {
      name: "Biru Muda",
      hex: "#38BDF8",
      bgClass: "bg-sky-400 shadow-sky-400/40",
      desc: "Melambangkan suatu hubungan profesionalitas, kecerdasan, kepercayaan diri.",
    },
    {
      name: "Biru Tua",
      hex: "#0B25B7",
      bgClass: "bg-[#0B25B7] shadow-blue-600/40",
      desc: "Melambangkan kebijaksanaan, teliti, tegas.",
    },
    {
      name: "Merah",
      hex: "#EF4444",
      bgClass: "bg-red-500 shadow-red-500/40",
      desc: "Melambangkan semangat dalam berorganisasi.",
    },
    {
      name: "Hitam",
      hex: "#0F172A",
      bgClass: "bg-slate-900 shadow-slate-900/40",
      desc: "Melambangkan integritas anggota.",
    },
    {
      name: "Putih",
      hex: "#FFFFFF",
      bgClass: "bg-white border-2 border-slate-300 shadow-slate-200",
      desc: "Melambangkan anggota yang suci dalam pikiran, perkataan, serta tindakan.",
    },
  ];

  return (
    <section
      id="about"
      className="scroll-mt-20 min-h-screen bg-[#0B0F19] text-slate-100 px-4 md:px-8 py-20 overflow-hidden relative border-b border-slate-800/80"
    >
      {/* GLOWING GRADIENT BACKGROUND HALOS */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* HEADER TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-[#0B25B7] text-white border border-blue-400/30 px-5 py-2 font-black text-xs md:text-sm uppercase rounded-full shadow-lg shadow-blue-600/20 mb-4"
          >
            <Zap size={15} className="text-amber-300 animate-pulse" />
            <span>PROFIL, SEJARAH & LANDASAN ORMAWA</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white">
            TENTANG <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-300">HIMAMI</span>
          </h2>
          <p className="text-slate-400 font-medium max-w-2xl mx-auto mt-4 text-base md:text-lg leading-relaxed">
            Mengenal Sejarah Pendirian, Visi & Misi, Konstitusi AD/ART, serta Atribut PDH dan Bendera Kebanggaan HIMAMI UNAS PASIM.
          </p>
        </motion.div>

        {/* NAVIGATION SUB-TABS */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-14">
          {[
            { id: "sejarah", label: "Sejarah Pendirian", icon: <History size={18} /> },
            { id: "visimisi", label: "Visi, Misi & Nilai", icon: <Target size={18} /> },
            { id: "adart", label: "AD / ART Organisasi", icon: <Scale size={18} /> },
            { id: "lambang", label: "Lambang, Atribut & Bendera", icon: <Flag size={18} /> },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-black text-xs md:text-sm uppercase tracking-wider transition-all cursor-pointer shadow-lg
                ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-[#0B25B7] to-indigo-600 text-white shadow-xl shadow-blue-600/30 border border-blue-400/40 scale-105"
                    : "bg-slate-900/90 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800"
                }
              `}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>

        {/* TAB CONTENTS */}
        <AnimatePresence mode="wait">
          {/* ================= TAB 1: SEJARAH HIMAMI ================= */}
          {activeTab === "sejarah" && (
            <motion.div
              key="sejarah"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.4 }}
              className="space-y-12"
            >
              {/* HERO SEJARAH BANNER */}
              <div className="bg-gradient-to-br from-[#0B25B7] via-blue-900 to-indigo-950 text-white rounded-[32px] p-8 md:p-14 shadow-2xl relative overflow-hidden border-4 border-blue-950">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="grid lg:grid-cols-12 gap-10 items-center relative z-10">
                  <div className="lg:col-span-8 space-y-6">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-300 to-yellow-400 text-slate-950 px-4 py-2 rounded-full font-black text-xs uppercase shadow-lg">
                      <Clock size={16} />
                      <span>DIBAWAH NAUNGAN AD/ART • 30 OKTOBER 2021 (10:42 WIB)</span>
                    </div>

                    <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-[1.05] tracking-tight text-white">
                      Sejarah Pendirian HIMAMI UNAS PASIM
                    </h3>

                    <p className="text-blue-100 font-medium text-base md:text-lg leading-relaxed">
                      Himpunan Mahasiswa Manajemen Informatika Universitas Nasional PASIM (HIMAMI UNAS PASIM) resmi berdiri pada hari <strong className="text-yellow-300 font-black">Sabtu, 30 Oktober 2021 pukul 10:42 WIB</strong> melalui Musyawarah Mahasiswa.
                    </p>

                    <p className="text-blue-100 font-medium text-base md:text-lg leading-relaxed">
                      Didesain sebagai lembaga eksekutif tertinggi di tingkat Program Studi D-3 Manajemen Informatika, Fakultas Ilmu Komputer, Universitas Nasional PASIM Bandung. HIMAMI menjadi rumah aspirasi, wadah penguat keilmuan teknologi, dan pengembang potensi kepemimpinan mahasiswa.
                    </p>

                    <div className="pt-2 flex flex-wrap gap-3 text-xs font-bold text-blue-200">
                      <span className="bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/20">
                        📍 Kampus UNAS PASIM Bandung
                      </span>
                      <span className="bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/20">
                        ⚡ Lembaga Eksekutif Jurusan
                      </span>
                      <span className="bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/20">
                        🤝 Beasiswa & Non-Beasiswa
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-4 flex justify-center">
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      className="bg-white/10 backdrop-blur-xl p-8 rounded-[28px] border-2 border-white/20 text-center shadow-2xl relative group cursor-pointer"
                      onClick={() => setSelectedImage(logo)}
                    >
                      <div className="absolute top-3 right-3 bg-yellow-400 text-slate-900 p-1.5 rounded-full shadow-md">
                        <Eye size={14} />
                      </div>
                      <img
                        src={logo}
                        alt="Logo HIMAMI"
                        className="w-44 md:w-52 h-auto mx-auto drop-shadow-2xl group-hover:scale-105 transition-transform"
                      />
                      <span className="block mt-4 text-xs font-black uppercase text-yellow-300 tracking-widest">
                        LAMBANG RESMI
                      </span>
                      <span className="block text-sm font-bold text-white">
                        HIMAMI UNAS PASIM
                      </span>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* TIMELINE HIGHLIGHT CARDS */}
              <div className="grid md:grid-cols-3 gap-6">
                <motion.div
                  whileHover={{ y: -6 }}
                  className="bg-white p-7 rounded-3xl border-2 border-slate-200 hover:border-[#0B25B7] shadow-xl space-y-4 transition-all"
                >
                  <div className="w-14 h-14 bg-blue-50 border border-blue-200 text-[#0B25B7] rounded-2xl flex items-center justify-center font-black shadow-sm">
                    <Clock size={28} />
                  </div>
                  <h4 className="text-xl font-black text-slate-900 uppercase">Waktu Pendirian</h4>
                  <p className="text-sm font-semibold text-slate-600 leading-relaxed">
                    Resmi didirikan pada <strong className="text-[#0B25B7]">30 Oktober 2021</strong> pukul <strong className="text-[#0B25B7]">10:42 WIB</strong> sesuai kesepakatan Musyawarah Besar Mahasiswa.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -6 }}
                  className="bg-white p-7 rounded-3xl border-2 border-slate-200 hover:border-[#0B25B7] shadow-xl space-y-4 transition-all"
                >
                  <div className="w-14 h-14 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-2xl flex items-center justify-center font-black shadow-sm">
                    <MapPin size={28} />
                  </div>
                  <h4 className="text-xl font-black text-slate-900 uppercase">Kedudukan Organisasi</h4>
                  <p className="text-sm font-semibold text-slate-600 leading-relaxed">
                    Berkedudukan di <strong className="text-indigo-700">Prodi D-3 Manajemen Informatika</strong>, Fakultas Ilmu Komputer, Universitas Nasional PASIM Bandung.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -6 }}
                  className="bg-white p-7 rounded-3xl border-2 border-slate-200 hover:border-[#0B25B7] shadow-xl space-y-4 transition-all"
                >
                  <div className="w-14 h-14 bg-sky-50 border border-sky-200 text-sky-600 rounded-2xl flex items-center justify-center font-black shadow-sm">
                    <Users size={28} />
                  </div>
                  <h4 className="text-xl font-black text-slate-900 uppercase">Wadah Pemersatu</h4>
                  <p className="text-sm font-semibold text-slate-600 leading-relaxed">
                    Menampung aspirasi dan potensi seluruh mahasiswa Manajemen Informatika, baik jalur <strong className="text-sky-600">beasiswa maupun reguler</strong>.
                  </p>
                </motion.div>
              </div>

              {/* DEDICATED VISUAL SHOWCASE: PDH & BENDERA HIMAMI */}
              <div className="bg-white border-2 border-slate-200 rounded-[32px] p-6 md:p-10 shadow-2xl space-y-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-50 text-[#0B25B7] rounded-2xl border border-blue-200">
                      <Sparkles size={26} />
                    </div>
                    <div>
                      <h4 className="text-2xl md:text-3xl font-black uppercase text-slate-900">
                        Atribut PDH & Bendera Kebanggaan
                      </h4>
                      <p className="text-sm font-semibold text-slate-600 mt-0.5">
                        Identitas Visual Resmi HIMAMI UNAS PASIM Berdasarkan AD/ART BAB V
                      </p>
                    </div>
                  </div>

                  <div className="inline-block bg-blue-50 text-[#0B25B7] border border-blue-200 px-4 py-1.5 rounded-full text-xs font-black uppercase">
                    Lampiran Dokumen Resmi
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* PDH VISUAL CARD */}
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-6 shadow-lg flex flex-col justify-between space-y-6 hover:border-[#0B25B7] transition-all group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 bg-amber-100 text-amber-800 rounded-xl">
                            <Shirt size={22} />
                          </div>
                          <h5 className="font-black text-xl text-slate-900 uppercase">
                            Gambar PDH HIMAMI
                          </h5>
                        </div>
                        <span className="text-[10px] font-black uppercase bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-300">
                          Pakaian Dinas Harian
                        </span>
                      </div>

                      <p className="text-xs font-semibold text-slate-600 leading-relaxed">
                        Kemeja PDH resmi pengurus berwarna Krem Khaki dengan aksen lis Abu-abu, bordir nama, jabatan, badge Bendera Indonesia & Logo HIMAMI.
                      </p>
                    </div>

                    {/* IMAGE CONTAINER */}
                    <div
                      onClick={() => setSelectedImage(pdhImg)}
                      className="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-inner text-center relative cursor-pointer overflow-hidden group/img"
                    >
                      <img
                        src={pdhImg}
                        alt="Gambar PDH HIMAMI"
                        className="w-full h-auto max-h-80 object-contain mx-auto rounded-xl group-hover/img:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-blue-900/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                        <span className="bg-white text-slate-900 font-black text-xs px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
                          <Eye size={16} /> Perbesar Gambar
                        </span>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2 text-xs font-semibold text-slate-700">
                      <span className="font-black text-[#0B25B7] uppercase block border-b border-slate-100 pb-1">
                        Atribut Spesifikasi PDH:
                      </span>
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                          <strong>Warna Utama:</strong> Krem Khaki & Abu
                        </div>
                        <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                          <strong>Dada Kanan:</strong> Bordir Nama Pengurus
                        </div>
                        <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                          <strong>Dada Kiri:</strong> Jabatan Pengurus
                        </div>
                        <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                          <strong>Sisi Lengan:</strong> Indonesia & Logo
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* BENDERA VISUAL CARD */}
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-6 shadow-lg flex flex-col justify-between space-y-6 hover:border-[#0B25B7] transition-all group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 bg-gray-200 text-gray-800 rounded-xl">
                            <Flag size={22} />
                          </div>
                          <h5 className="font-black text-xl text-slate-900 uppercase">
                            Gambar Bendera HIMAMI
                          </h5>
                        </div>
                        <span className="text-[10px] font-black uppercase bg-gray-200 text-gray-900 px-3 py-1 rounded-full border border-gray-400">
                          Panji Organisasi
                        </span>
                      </div>

                      <p className="text-xs font-semibold text-slate-600 leading-relaxed">
                        Bendera resmi HIMAMI UNAS PASIM berlatar warna dasar abu-abu dengan logo kebanggaan dan nama universitas.
                      </p>
                    </div>

                    {/* IMAGE CONTAINER */}
                    <div
                      onClick={() => setSelectedImage(benderaImg)}
                      className="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-inner text-center relative cursor-pointer overflow-hidden group/img"
                    >
                      <img
                        src={benderaImg}
                        alt="Gambar Bendera HIMAMI"
                        className="w-full h-auto max-h-80 object-contain mx-auto rounded-xl group-hover/img:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-blue-900/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                        <span className="bg-white text-slate-900 font-black text-xs px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
                          <Eye size={16} /> Perbesar Gambar
                        </span>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2 text-xs font-semibold text-slate-700">
                      <span className="font-black text-[#0B25B7] uppercase block border-b border-slate-100 pb-1">
                        Makna Warna Bendera:
                      </span>
                      <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 flex items-start gap-3">
                        <span className="w-5 h-5 bg-gray-500 rounded-md shrink-0 mt-0.5 shadow-xs" />
                        <p className="text-xs font-bold text-slate-800 leading-relaxed">
                          <strong className="text-slate-900">1. Warna Dasar Abu-abu:</strong> Memiliki arti Keseriusan, Kestabilan, Kemandirian, dan Tanggung Jawab.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= TAB 2: VISI, MISI & NILAI ================= */}
          {activeTab === "visimisi" && (
            <motion.div
              key="visimisi"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.4 }}
              className="space-y-12"
            >
              {/* VISI & MISI GRID */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* VISI CARD */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white text-slate-900 border-2 border-slate-200 hover:border-[#0B25B7] rounded-[32px] shadow-2xl overflow-hidden flex flex-col justify-between transition-all"
                >
                  <div className="bg-gradient-to-r from-[#0B25B7] to-indigo-800 px-7 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Target size={22} className="text-yellow-300" />
                      <span className="font-black text-lg uppercase tracking-wider text-white">Visi Utama</span>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full" />
                      <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                      <div className="w-3 h-3 bg-green-400 rounded-full" />
                    </div>
                  </div>

                  <div className="p-8 md:p-10 space-y-4">
                    <span className="text-xs font-black text-[#0B25B7] uppercase tracking-widest bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-lg inline-block">
                      LANDASAN IMPIAN ORGANISASI
                    </span>
                    <p className="text-xl md:text-2xl leading-relaxed font-bold text-slate-800">
                      &quot;Terwujudnya HIMAMI sebagai organisasi yang berintegritas, berkualitas, dan progresif dalam membentuk mahasiswa Manajemen Informatika yang solid, partisipatif, serta berlandaskan pada nilai-nilai kekeluargaan dan keislaman.&quot;
                    </p>
                  </div>

                  <div className="px-8 pb-6 text-right">
                    <span className="text-6xl font-black text-slate-100 uppercase select-none">VISI</span>
                  </div>
                </motion.div>

                {/* MISI CARD */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white text-slate-900 border-2 border-slate-200 hover:border-[#0B25B7] rounded-[32px] shadow-2xl overflow-hidden flex flex-col justify-between transition-all"
                >
                  <div className="bg-gradient-to-r from-[#0B25B7] to-indigo-800 px-7 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Compass size={22} className="text-yellow-300" />
                      <span className="font-black text-lg uppercase tracking-wider text-white">Misi Organisasi</span>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full" />
                      <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                      <div className="w-3 h-3 bg-green-400 rounded-full" />
                    </div>
                  </div>

                  <div className="p-8 md:p-10 space-y-4">
                    {[
                      "Meningkatkan kualitas akademik, skill IT, dan solidaritas mahasiswa Manajemen Informatika.",
                      "Menjadi sarana dan wadah kreatif pengembangan potensi, minat, serta karya inovasi mahasiswa.",
                      "Menjalin sinergi kekeluargaan, jejaring alumni, dan kerja sama harmonis dengan ekosistem luar.",
                    ].map((misiText, idx) => (
                      <div key={idx} className="flex gap-4 items-start bg-slate-50 p-4 border border-slate-200 rounded-2xl shadow-sm hover:border-blue-300 transition-all">
                        <span className="bg-[#0B25B7] text-white text-sm font-black px-3.5 py-1 rounded-xl shrink-0 shadow-md">
                          0{idx + 1}
                        </span>
                        <p className="text-base font-bold text-slate-800 leading-snug">
                          {misiText}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="px-8 pb-4 text-right">
                    <span className="text-6xl font-black text-slate-100 uppercase select-none">MISI</span>
                  </div>
                </motion.div>
              </div>

              {/* NILAI UTAMA ORGANISASI */}
              <div>
                <h3 className="text-2xl md:text-3xl font-black uppercase text-center text-slate-900 mb-8">
                  Nilai Utama Organisasi
                </h3>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {values.map((val, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.03, y: -5 }}
                      className="bg-white text-slate-900 border-2 border-slate-200 hover:border-[#0B25B7] p-7 rounded-3xl shadow-xl flex flex-col justify-between transition-all"
                    >
                      <div>
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 font-black border ${val.accentBg} shadow-md`}>
                          {val.icon}
                        </div>
                        <h4 className="text-lg font-black uppercase text-slate-900 mb-2">{val.title}</h4>
                        <p className="text-sm font-semibold text-slate-600 leading-relaxed">
                          {val.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= TAB 3: AD / ART ORGANISASI ================= */}
          {activeTab === "adart" && (
            <motion.div
              key="adart"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <div className="bg-white border-2 border-slate-200 rounded-[32px] p-6 md:p-10 shadow-2xl">
                <div className="flex items-center gap-4 mb-8 border-b border-slate-200 pb-5">
                  <div className="p-3.5 bg-blue-50 text-[#0B25B7] rounded-2xl border border-blue-200 shadow-sm">
                    <BookOpen size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black uppercase text-slate-900">
                      Anggaran Dasar & Anggaran Rumah Tangga (AD/ART)
                    </h3>
                    <p className="text-sm font-semibold text-slate-600 mt-0.5">
                      Pedoman Resmi Konstitusi & Governance HIMAMI UNAS PASIM Bandung
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {adartData.map((bab, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -4 }}
                      className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-6 hover:border-[#0B25B7] transition-all space-y-5 shadow-md"
                    >
                      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                        <span className="bg-[#0B25B7] text-white font-black text-xs px-3.5 py-1.5 rounded-lg uppercase tracking-wider shadow-sm">
                          {bab.bab}
                        </span>
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                          PASAL RESMI
                        </span>
                      </div>

                      <h4 className="text-xl font-black text-slate-900 uppercase leading-snug">
                        {bab.title}
                      </h4>

                      <div className="space-y-4">
                        {bab.pasalList.map((pasal, pIdx) => (
                          <div
                            key={pIdx}
                            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2.5"
                          >
                            <div className="flex items-center gap-2">
                              <CheckCircle2 size={18} className="text-[#0B25B7]" />
                              <span className="font-extrabold text-sm text-[#0B25B7] uppercase">
                                {pasal.pasal} - {pasal.subtitle}
                              </span>
                            </div>

                            <p className="text-sm font-semibold text-slate-700 leading-relaxed pl-6">
                              {pasal.content}
                            </p>

                            {pasal.items && (
                              <div className="pl-6 space-y-2 pt-1">
                                {pasal.items.map((it, iIdx) => (
                                  <div
                                    key={iIdx}
                                    className="flex items-center gap-2 text-xs font-extrabold text-slate-800 bg-blue-50/70 p-2.5 rounded-xl border border-blue-100"
                                  >
                                    <ChevronRight size={14} className="text-[#0B25B7]" />
                                    <span>
                                      {it.label} : <strong className="text-slate-900">{it.val}</strong>
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= TAB 4: LAMBANG, ATRIBUT & BENDERA ================= */}
          {activeTab === "lambang" && (
            <motion.div
              key="lambang"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.4 }}
              className="space-y-12"
            >
              {/* BAB V PASAL 11: LAMBANG & MAKNA */}
              <div className="bg-white border-2 border-slate-200 rounded-[32px] p-6 md:p-10 shadow-2xl space-y-10">
                <div className="text-center max-w-2xl mx-auto space-y-3 border-b border-slate-200 pb-6">
                  <span className="bg-[#0B25B7] text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-sm">
                    BAB V • PASAL 11
                  </span>
                  <h3 className="text-3xl md:text-4xl font-black uppercase text-slate-900">
                    LAMBANG & MAKNA SIMBOL HIMAMI
                  </h3>
                  <p className="text-sm font-semibold text-slate-600">
                    Filosofi mendalam dibalik setiap bentuk, kontur, dan skema warna lambang HIMAMI UNAS PASIM
                  </p>
                </div>

                {/* LOGO SHOWCASE + MAKNA BENTUK */}
                <div className="grid lg:grid-cols-12 gap-10 items-center">
                  {/* LOGO DISPLAY */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="lg:col-span-5 bg-gradient-to-b from-blue-50 to-slate-100 p-8 rounded-[28px] border-2 border-blue-200 text-center shadow-lg flex flex-col items-center justify-center relative cursor-pointer"
                    onClick={() => setSelectedImage(logo)}
                  >
                    <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2 rounded-full shadow-md text-slate-700">
                      <Eye size={16} />
                    </div>

                    <img
                      src={logo}
                      alt="Lambang Resmi HIMAMI"
                      className="w-60 h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                    />

                    <div className="mt-6 bg-white border border-blue-200 px-5 py-2.5 rounded-2xl text-center shadow-sm">
                      <span className="font-black text-sm text-[#0B25B7] uppercase block">
                        LAMBANG RESMI HIMAMI
                      </span>
                      <span className="text-[11px] font-bold text-slate-500">
                        Disahkan dalam AD/ART HIMAMI UNAS PASIM
                      </span>
                    </div>
                  </motion.div>

                  {/* MAKNA ELEMENT LIST */}
                  <div className="lg:col-span-7 space-y-4">
                    <h4 className="text-xl font-black uppercase text-slate-900 border-l-4 border-[#0B25B7] pl-3">
                      Makna Formasi / Elemen Lambang
                    </h4>

                    <div className="space-y-3">
                      {logoElements.map((el, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ x: 6 }}
                          className="bg-slate-50 hover:bg-blue-50/50 p-4 rounded-2xl border border-slate-200 hover:border-blue-300 transition-all flex gap-4 items-start shadow-xs"
                        >
                          <div className="p-3 bg-white border border-slate-200 rounded-xl shrink-0 shadow-xs">
                            {el.icon}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="font-black text-base text-slate-900 uppercase">
                                {el.title}
                              </h5>
                              <span className="text-[10px] font-black text-[#0B25B7] bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200 uppercase">
                                {el.badge}
                              </span>
                            </div>
                            <p className="text-sm font-semibold text-slate-600 leading-relaxed mt-1">
                              {el.desc}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* MAKNA WARNA */}
                <div className="pt-8 border-t border-slate-200">
                  <h4 className="text-2xl font-black uppercase text-slate-900 mb-6 text-center">
                    Makna Warna Lambang HIMAMI
                  </h4>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {colorMeanings.map((color, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05, y: -4 }}
                        className="bg-slate-50 p-5 rounded-2xl border-2 border-slate-200 shadow-md flex flex-col justify-between space-y-3"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-7 h-7 rounded-full shadow-md ${color.bgClass}`}
                          />
                          <div>
                            <span className="font-black text-sm uppercase text-slate-900 block">
                              {color.name}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">
                              {color.hex}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs font-semibold text-slate-600 leading-relaxed">
                          {color.desc}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* BAB V PASAL 12: ATRIBUT & BENDERA */}
              <div className="bg-white border-2 border-slate-200 rounded-[32px] p-6 md:p-10 shadow-2xl space-y-10">
                <div className="text-center max-w-2xl mx-auto space-y-3 border-b border-slate-200 pb-6">
                  <span className="bg-[#0B25B7] text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-sm">
                    BAB V • PASAL 12
                  </span>
                  <h3 className="text-3xl md:text-4xl font-black uppercase text-slate-900">
                    ATRIBUT & BENDERA HIMAMI
                  </h3>
                  <p className="text-sm font-semibold text-slate-600">
                    Identitas Fisik, Pakaian Dinas Harian (PDH), dan Bendera Kebanggaan HIMAMI
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* ATRIBUT / PDH CARD */}
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-7 shadow-lg flex flex-col justify-between space-y-6 hover:border-[#0B25B7] transition-all"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 bg-[#0B25B7] text-white rounded-xl shadow-md">
                            <Shirt size={22} />
                          </div>
                          <h4 className="text-xl font-black text-slate-900 uppercase">
                            ATRIBUT (PDH HIMAMI)
                          </h4>
                        </div>
                        <span className="text-[10px] font-black uppercase bg-blue-100 text-[#0B25B7] px-3 py-1 rounded-full border border-blue-300">
                          Identitas Pengurus
                        </span>
                      </div>

                      <p className="text-sm font-semibold text-slate-600 leading-relaxed">
                        Atribut resmi organisasi HIMAMI berupa Kemeja Pakaian Dinas Harian (PDH) berwarna dominan Khaki/Krem dengan kombinasi aksen Abu-abu, dilengkapi Badge Merah Putih di lengan kanan, Logo HIMAMI di lengan kiri, serta Identitas Nama & Jabatan Pengurus.
                      </p>
                    </div>

                    {/* PDH IMAGE */}
                    <div
                      onClick={() => setSelectedImage(pdhImg)}
                      className="bg-white p-5 rounded-2xl border-2 border-slate-200 shadow-inner text-center relative cursor-pointer overflow-hidden group/img"
                    >
                      <img
                        src={pdhImg}
                        alt="Gambar PDH HIMAMI"
                        className="w-full h-auto max-h-80 object-contain mx-auto rounded-xl group-hover/img:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-blue-900/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                        <span className="bg-white text-slate-900 font-black text-xs px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
                          <Eye size={16} /> Perbesar Gambar
                        </span>
                      </div>
                    </div>

                    <div className="text-left text-xs font-semibold text-slate-700 bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
                      <span className="font-black text-[#0B25B7] uppercase block border-b border-slate-100 pb-1">
                        Spesifikasi Lengkap PDH:
                      </span>
                      <p>• <strong>Warna Utama:</strong> Krem Khaki dengan aksen Lis Abu-abu</p>
                      <p>• <strong>Sisi Depan:</strong> Bordir Nama Pengurus & Jabatan</p>
                      <p>• <strong>Sisi Belakang:</strong> Bordir Teks HIMAMI UNAS PASIM</p>
                      <p>• <strong>Sisi Lengan:</strong> Bendera Indonesia (Kanan) & Logo HIMAMI (Kiri)</p>
                    </div>
                  </motion.div>

                  {/* BENDERA CARD */}
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-7 shadow-lg flex flex-col justify-between space-y-6 hover:border-[#0B25B7] transition-all"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 bg-[#0B25B7] text-white rounded-xl shadow-md">
                            <Flag size={22} />
                          </div>
                          <h4 className="text-xl font-black text-slate-900 uppercase">
                            BENDERA HIMAMI
                          </h4>
                        </div>
                        <span className="text-[10px] font-black uppercase bg-gray-200 text-gray-900 px-3 py-1 rounded-full border border-gray-400">
                          Panji Kebanggaan
                        </span>
                      </div>

                      <p className="text-sm font-semibold text-slate-600 leading-relaxed">
                        Bendera resmi HIMAMI UNAS PASIM berkibar sebagai simbol kehormatan, kedaulatan, dan pemersatu seluruh mahasiswa Manajemen Informatika.
                      </p>
                    </div>

                    {/* BENDERA IMAGE */}
                    <div
                      onClick={() => setSelectedImage(benderaImg)}
                      className="bg-white p-5 rounded-2xl border-2 border-slate-200 shadow-inner text-center relative cursor-pointer overflow-hidden group/img"
                    >
                      <img
                        src={benderaImg}
                        alt="Gambar Bendera HIMAMI"
                        className="w-full h-auto max-h-80 object-contain mx-auto rounded-xl group-hover/img:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-blue-900/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                        <span className="bg-white text-slate-900 font-black text-xs px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
                          <Eye size={16} /> Perbesar Gambar
                        </span>
                      </div>
                    </div>

                    {/* MAKNA BENDERA */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                      <span className="font-black text-sm text-[#0B25B7] uppercase block border-b border-slate-100 pb-1">
                        Makna Warna Dasar Bendera:
                      </span>
                      <div className="flex items-start gap-3 pt-1">
                        <span className="w-5 h-5 bg-gray-500 rounded-md shrink-0 mt-0.5 shadow-xs" />
                        <p className="text-sm font-bold text-slate-800 leading-snug">
                          <strong className="text-slate-900">1. Warna Dasar Abu-abu:</strong> Memiliki arti Keseriusan, Kestabilan, Kemandirian, dan Tanggung Jawab.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* LIGHTBOX MODAL FOR IMAGE PREVIEW */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md p-4 flex items-center justify-center cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] bg-white p-4 rounded-3xl border-4 border-[#0B25B7] shadow-2xl overflow-hidden"
            >
              <img
                src={selectedImage}
                alt="Preview Detail"
                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
              />
              <div className="mt-3 text-center">
                <span className="text-xs font-black uppercase text-[#0B25B7]">
                  Klik di mana saja untuk menutup preview
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default About;
