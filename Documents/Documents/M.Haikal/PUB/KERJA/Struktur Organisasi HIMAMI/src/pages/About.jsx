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
} from "lucide-react";
import logo from "../assets/logo-himami.png";
import pdhImg from "../assets/pdh-himami.png";
import benderaImg from "../assets/bendera-himami.png";

function About() {
  const [activeTab, setActiveTab] = useState("sejarah");

  // NILAI UTAMA ORGANISASI
  const values = [
    {
      title: "INTEGRITAS",
      desc: "Menjunjung tinggi kejujuran, etika akademik, dan tanggung jawab moral dalam setiap tindakan.",
      icon: <ShieldCheck size={28} />,
    },
    {
      title: "INOVASI",
      desc: "Berani berpikir kritis, kreatif, dan menciptakan solusi teknologi yang berdaya guna.",
      icon: <Lightbulb size={28} />,
    },
    {
      title: "KEKELUARGAAN",
      desc: "Membangun rasa solidaritas, saling mendukung, dan keterikatan yang erat antar sesama anggota.",
      icon: <HeartHandshake size={28} />,
    },
    {
      title: "PROFESIONAL",
      desc: "Berorientasi pada kualitas terbaik, disiplin tinggi, dan tata kelola himpunan yang handal.",
      icon: <Award size={28} />,
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
      desc: "Melambangkan keluarga besar HIMAMI merupakan satu Kesatuan yang sulit dipisahkan serta memiliki arti menampung aspirasi anggota HIMAMI.",
    },
    {
      icon: <Triangle className="text-blue-800 rotate-180" size={24} />,
      title: "2 Segitiga",
      desc: "Melambangkan bahwa HIMAMI terdiri atas mahasiswa beasiswa dan non beasiswa. Bentuk segitiga tersendiri memiliki makna menunjukkan pergerakan berdasarkan kemana HIMAMI menunjuk atau sebagai arah/puncak keberhasilan.",
    },
    {
      icon: <Users className="text-[#0B25B7]" size={24} />,
      title: "Kumpulan Orang",
      desc: "Melambangkan HIMAMI yang terdiri dari berbagai individu untuk mencapai tujuan bersama.",
    },
    {
      icon: <Monitor className="text-sky-500" size={24} />,
      title: "Komputer",
      desc: "Melambangkan pengetahuan yang luas.",
    },
    {
      icon: <Building2 className="text-red-600" size={24} />,
      title: "Logo Universitas",
      desc: "Melambangkan bahwa HIMAMI berkedudukan di Universitas Nasional PASIM.",
    },
  ];

  // COLOR MEANING DATA
  const colorMeanings = [
    {
      name: "Biru Muda",
      hex: "#38BDF8",
      bgClass: "bg-sky-400",
      desc: "Melambangkan suatu hubungan profesionalitas, kecerdasan, kepercayaan diri.",
    },
    {
      name: "Biru Tua",
      hex: "#0B25B7",
      bgClass: "bg-[#0B25B7]",
      desc: "Melambangkan kebijaksanaan, teliti, tegas.",
    },
    {
      name: "Merah",
      hex: "#EF4444",
      bgClass: "bg-red-500",
      desc: "Melambangkan semangat dalam berorganisasi.",
    },
    {
      name: "Hitam",
      hex: "#0F172A",
      bgClass: "bg-slate-900",
      desc: "Melambangkan integritas anggota.",
    },
    {
      name: "Putih",
      hex: "#FFFFFF",
      bgClass: "bg-white border border-slate-300",
      desc: "Melambangkan anggota yang suci dalam pikiran, perkataan, serta tindakan.",
    },
  ];

  return (
    <section
      id="about"
      className="scroll-mt-20 min-h-screen bg-[#F8FAFC] px-4 md:px-8 py-20 overflow-hidden relative border-b border-slate-200 text-slate-900"
    >
      {/* BACKGROUND DECORATIONS */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-sky-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* HEADER TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-block bg-blue-50 text-[#0B25B7] border border-blue-200 px-4 py-1.5 font-black text-xs md:text-sm uppercase rounded-full shadow-sm mb-3">
            Profil, Sejarah & Landasan Konstitusi
          </div>
          <h2 className="text-4xl md:text-6xl font-black uppercase text-slate-900 tracking-tight">
            Tentang HIMAMI
          </h2>
          <p className="text-slate-600 font-semibold max-w-2xl mx-auto mt-3 text-base md:text-lg">
            Mengenal Sejarah Pendirian, Visi & Misi, Anggaran Dasar/Anggaran Rumah Tangga (AD/ART), serta Atribut PDH & Bendera HIMAMI UNAS PASIM.
          </p>
        </motion.div>

        {/* NAVIGATION SUB-TABS */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-12">
          {[
            { id: "sejarah", label: "Sejarah Pendirian", icon: <History size={18} /> },
            { id: "visimisi", label: "Visi, Misi & Nilai", icon: <Target size={18} /> },
            { id: "adart", label: "AD / ART Organisasi", icon: <Scale size={18} /> },
            { id: "lambang", label: "Lambang, Atribut & Bendera", icon: <Flag size={18} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-xs md:text-sm uppercase tracking-wider transition-all cursor-pointer shadow-sm
                ${
                  activeTab === tab.id
                    ? "bg-[#0B25B7] text-white shadow-lg shadow-blue-600/30 scale-105 border-2 border-blue-900"
                    : "bg-white text-slate-700 hover:bg-slate-100 border-2 border-slate-200"
                }
              `}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB CONTENTS */}
        <AnimatePresence mode="wait">
          {/* ================= TAB 1: SEJARAH HIMAMI ================= */}
          {activeTab === "sejarah" && (
            <motion.div
              key="sejarah"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* HERO SEJARAH CARD */}
              <div className="bg-gradient-to-br from-[#0B25B7] to-blue-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden border-4 border-blue-950">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

                <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
                  <div className="lg:col-span-8 space-y-5">
                    <div className="inline-flex items-center gap-2 bg-yellow-300 text-slate-900 px-4 py-1.5 rounded-full font-black text-xs uppercase shadow-md">
                      <Clock size={16} />
                      <span>30 OKTOBER 2021 • 10:42 WIB</span>
                    </div>

                    <h3 className="text-3xl md:text-5xl font-black uppercase leading-tight tracking-tight text-white">
                      Sejarah Berdirinya HIMAMI UNAS PASIM
                    </h3>

                    <p className="text-blue-100 font-medium text-base md:text-lg leading-relaxed">
                      Himpunan Mahasiswa Manajemen Informatika Universitas Nasional PASIM (HIMAMI UNAS PASIM) resmi didirikan pada hari <strong className="text-yellow-300">Sabtu, 30 Oktober 2021 tepat pada pukul 10:42 WIB</strong>.
                    </p>

                    <p className="text-blue-100 font-medium text-base md:text-lg leading-relaxed">
                      Lembaga ini dibentuk sebagai lembaga eksekutif tertinggi di tingkat Program Studi D-3 Manajemen Informatika, Fakultas Ilmu Komputer, Universitas Nasional PASIM Bandung. HIMAMI lahir dari aspirasi dan semangat kebersamaan mahasiswa untuk menciptakan wadah resmi pengembangan intelektual, keterampilan teknologi informasi, serta karakter kepemimpinan yang berlandaskan asas kekeluargaan dan profesionalitas.
                    </p>
                  </div>

                  <div className="lg:col-span-4 flex justify-center">
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border-2 border-white/20 text-center shadow-xl">
                      <img
                        src={logo}
                        alt="Logo HIMAMI"
                        className="w-40 md:w-48 h-auto mx-auto drop-shadow-2xl hover:scale-105 transition-transform"
                      />
                      <span className="block mt-4 text-xs font-black uppercase text-yellow-300 tracking-widest">
                        LAMBANG KEBANGGAAN
                      </span>
                      <span className="block text-sm font-bold text-white">
                        HIMAMI UNAS PASIM
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* TIMELINE & FAKTA SEJARAH */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-xl space-y-3">
                  <div className="w-12 h-12 bg-blue-50 text-[#0B25B7] rounded-2xl flex items-center justify-center font-black">
                    <Clock size={24} />
                  </div>
                  <h4 className="text-xl font-black text-slate-900 uppercase">Waktu Pendirian</h4>
                  <p className="text-sm font-semibold text-slate-600 leading-relaxed">
                    Didirikan secara resmi pada tanggal <strong className="text-[#0B25B7]">30 Oktober 2021</strong> pada jam presisi <strong className="text-[#0B25B7]">10:42 WIB</strong> sesuai penetapan Musyawarah Besar (MUBES).
                  </p>
                </div>

                <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-xl space-y-3">
                  <div className="w-12 h-12 bg-blue-50 text-[#0B25B7] rounded-2xl flex items-center justify-center font-black">
                    <MapPin size={24} />
                  </div>
                  <h4 className="text-xl font-black text-slate-900 uppercase">Kedudukan</h4>
                  <p className="text-sm font-semibold text-slate-600 leading-relaxed">
                    Berlokasi di Kampus Utama <strong className="text-[#0B25B7]">Universitas Nasional PASIM Bandung</strong>, bernaung di bawah Prodi D-3 Manajemen Informatika, Fakultas Ilmu Komputer.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-xl space-y-3">
                  <div className="w-12 h-12 bg-blue-50 text-[#0B25B7] rounded-2xl flex items-center justify-center font-black">
                    <Users size={24} />
                  </div>
                  <h4 className="text-xl font-black text-slate-900 uppercase">Pemersatu Mahasiswa</h4>
                  <p className="text-sm font-semibold text-slate-600 leading-relaxed">
                    Menghimpun seluruh mahasiswa Manajemen Informatika, baik mahasiswa penerima <strong className="text-[#0B25B7]">beasiswa maupun non-beasiswa</strong>, dalam satu pergerakan yang solid.
                  </p>
                </div>
              </div>

              {/* IDENTITAS ATRIBUT PDH & BENDERA DI BAWAH SEJARAH */}
              <div className="mt-12 bg-white border-2 border-slate-200 rounded-3xl p-6 md:p-10 shadow-xl space-y-8">
                <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
                  <div className="p-3 bg-blue-50 text-[#0B25B7] rounded-2xl border border-blue-200">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black uppercase text-slate-900">
                      Identitas Resmi: PDH & Bendera HIMAMI
                    </h4>
                    <p className="text-sm font-semibold text-slate-600">
                      Atribut Pakaian Dinas Harian (PDH) dan Bendera Kebanggaan HIMAMI UNAS PASIM
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* VISUAL PDH */}
                  <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-6 shadow-md flex flex-col justify-between space-y-4 hover:border-[#0B25B7] transition-all">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Shirt className="text-[#0B25B7]" size={22} />
                        <h5 className="font-black text-lg text-slate-900 uppercase">
                          ATRIBUT (PDH HIMAMI)
                        </h5>
                      </div>
                      <p className="text-xs font-semibold text-slate-600">
                        Kemeja Pakaian Dinas Harian (PDH) krem khaki aksen abu-abu dengan atribut lengkap pengurus.
                      </p>
                    </div>

                    <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 text-center shadow-inner overflow-hidden">
                      <img
                        src={pdhImg}
                        alt="Gambar PDH HIMAMI"
                        className="w-full h-auto max-h-72 object-contain mx-auto rounded-xl hover:scale-105 transition-transform duration-300"
                      />
                      <span className="block mt-3 text-xs font-black text-[#0B25B7] uppercase">
                        Gambar PDH Resmi HIMAMI
                      </span>
                    </div>
                  </div>

                  {/* VISUAL BENDERA */}
                  <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-6 shadow-md flex flex-col justify-between space-y-4 hover:border-[#0B25B7] transition-all">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Flag className="text-[#0B25B7]" size={22} />
                        <h5 className="font-black text-lg text-slate-900 uppercase">
                          BENDERA HIMAMI
                        </h5>
                      </div>
                      <p className="text-xs font-semibold text-slate-600">
                        Bendera berlatar warna dasar abu-abu dengan logo HIMAMI dan identitas universitas.
                      </p>
                    </div>

                    <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 text-center shadow-inner overflow-hidden">
                      <img
                        src={benderaImg}
                        alt="Gambar Bendera HIMAMI"
                        className="w-full h-auto max-h-72 object-contain mx-auto rounded-xl hover:scale-105 transition-transform duration-300"
                      />
                      <div className="mt-3 text-left bg-slate-100 p-3 rounded-xl border border-slate-200">
                        <span className="block text-xs font-black text-slate-900 uppercase">
                          Makna Warna Dasar Abu-abu:
                        </span>
                        <p className="text-xs font-bold text-slate-700 mt-0.5">
                          Melambangkan Keseriusan, Kestabilan, Kemandirian, dan Tanggung Jawab.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= TAB 2: VISI, MISI & NILAI ================= */}
          {activeTab === "visimisi" && (
            <motion.div
              key="visimisi"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-12"
            >
              {/* VISI & MISI GRID */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* VISI CARD */}
                <div className="bg-white text-slate-900 border-2 border-slate-200 hover:border-[#0B25B7] rounded-3xl shadow-xl overflow-hidden flex flex-col justify-between transition-all">
                  <div className="bg-[#0B25B7] px-6 py-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target size={20} className="text-yellow-300" />
                      <span className="font-black text-base uppercase tracking-wider text-white">Visi Utama</span>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full" />
                      <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                      <div className="w-3 h-3 bg-green-400 rounded-full" />
                    </div>
                  </div>

                  <div className="p-8 md:p-10">
                    <span className="text-xs font-black text-[#0B25B7] uppercase tracking-widest bg-blue-50 border border-blue-200 px-3 py-1 rounded-md inline-block mb-4">
                      LANDASAN IMPIAN
                    </span>
                    <p className="text-lg md:text-2xl leading-relaxed font-bold text-slate-800">
                      &quot;Terwujudnya HIMAMI sebagai organisasi yang berintegritas, berkualitas, dan progresif dalam membentuk mahasiswa Manajemen Informatika yang solid, partisipatif, serta berlandaskan pada nilai-nilai kekeluargaan dan keislaman.&quot;
                    </p>
                  </div>

                  <div className="px-8 pb-6 text-right">
                    <span className="text-5xl md:text-6xl font-black text-slate-100 uppercase select-none">VISI</span>
                  </div>
                </div>

                {/* MISI CARD */}
                <div className="bg-white text-slate-900 border-2 border-slate-200 hover:border-[#0B25B7] rounded-3xl shadow-xl overflow-hidden flex flex-col justify-between transition-all">
                  <div className="bg-[#0B25B7] px-6 py-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Compass size={20} className="text-yellow-300" />
                      <span className="font-black text-base uppercase tracking-wider text-white">Misi Organisasi</span>
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
                        <span className="bg-[#0B25B7] text-white text-sm font-black px-3 py-1 rounded-lg shrink-0 shadow-md">
                          0{idx + 1}
                        </span>
                        <p className="text-base font-bold text-slate-800 leading-snug">
                          {misiText}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="px-8 pb-4 text-right">
                    <span className="text-5xl md:text-6xl font-black text-slate-100 uppercase select-none">MISI</span>
                  </div>
                </div>
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
                      whileHover={{ scale: 1.03, y: -4 }}
                      className="bg-white text-slate-900 border-2 border-slate-200 hover:border-[#0B25B7] p-6 rounded-2xl shadow-xl flex flex-col justify-between transition-all"
                    >
                      <div>
                        <div className="w-12 h-12 bg-blue-50 border border-blue-200 text-[#0B25B7] rounded-xl flex items-center justify-center mb-4 font-black">
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 md:p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-4">
                  <div className="p-3 bg-blue-50 text-[#0B25B7] rounded-xl border border-blue-200">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black uppercase text-slate-900">
                      Anggaran Dasar & Anggaran Rumah Tangga (AD/ART)
                    </h3>
                    <p className="text-sm font-semibold text-slate-600">
                      Pedoman Resmi Konstitusi & Tata Kelola Organisasi HIMAMI UNAS PASIM
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {adartData.map((bab, index) => (
                    <div
                      key={index}
                      className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-6 hover:border-[#0B25B7] transition-all space-y-4 shadow-sm"
                    >
                      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                        <span className="bg-[#0B25B7] text-white font-black text-xs px-3 py-1 rounded-md uppercase tracking-wider">
                          {bab.bab}
                        </span>
                        <span className="text-xs font-black text-slate-400 uppercase">
                          DOKUMEN RESMI
                        </span>
                      </div>

                      <h4 className="text-lg font-black text-slate-900 uppercase leading-snug">
                        {bab.title}
                      </h4>

                      <div className="space-y-4">
                        {bab.pasalList.map((pasal, pIdx) => (
                          <div
                            key={pIdx}
                            className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2"
                          >
                            <div className="flex items-center gap-2">
                              <CheckCircle2 size={16} className="text-[#0B25B7]" />
                              <span className="font-extrabold text-sm text-[#0B25B7] uppercase">
                                {pasal.pasal} - {pasal.subtitle}
                              </span>
                            </div>

                            <p className="text-sm font-semibold text-slate-700 leading-relaxed pl-6">
                              {pasal.content}
                            </p>

                            {pasal.items && (
                              <div className="pl-6 space-y-1.5 pt-1">
                                {pasal.items.map((it, iIdx) => (
                                  <div
                                    key={iIdx}
                                    className="flex items-center gap-2 text-xs font-extrabold text-slate-800 bg-blue-50/60 p-2 rounded-lg border border-blue-100"
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
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= TAB 4: LAMBANG, ATRIBUT & BENDERA ================= */}
          {activeTab === "lambang" && (
            <motion.div
              key="lambang"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-12"
            >
              {/* BAB V PASAL 11: LAMBANG & MAKNA */}
              <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 md:p-10 shadow-xl space-y-8">
                <div className="text-center max-w-xl mx-auto space-y-2 border-b border-slate-200 pb-6">
                  <span className="bg-[#0B25B7] text-white px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider">
                    BAB V • PASAL 11
                  </span>
                  <h3 className="text-3xl font-black uppercase text-slate-900">
                    LAMBANG & MAKNA SIMBOL HIMAMI
                  </h3>
                  <p className="text-sm font-semibold text-slate-600">
                    Filosofi mendalam dibalik setiap kontur dan garis lambang HIMAMI UNAS PASIM
                  </p>
                </div>

                {/* LOGO SHOWCASE + MAKNA BENTUK */}
                <div className="grid lg:grid-cols-12 gap-8 items-center">
                  {/* LOGO DISPLAY */}
                  <div className="lg:col-span-5 bg-gradient-to-b from-blue-50 to-slate-100 p-8 rounded-3xl border-2 border-blue-200 text-center shadow-md flex flex-col items-center justify-center">
                    <img
                      src={logo}
                      alt="Lambang Resmi HIMAMI"
                      className="w-56 h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                    />
                    <div className="mt-6 bg-white border border-blue-200 px-4 py-2 rounded-xl text-center shadow-sm">
                      <span className="font-black text-sm text-[#0B25B7] uppercase block">
                        LAMBANG RESMI HIMAMI
                      </span>
                      <span className="text-[11px] font-bold text-slate-500">
                        Ditentukan & Disahkan dalam AD/ART
                      </span>
                    </div>
                  </div>

                  {/* MAKNA ELEMENT LIST */}
                  <div className="lg:col-span-7 space-y-4">
                    <h4 className="text-lg font-black uppercase text-slate-900 border-l-4 border-[#0B25B7] pl-3">
                      Makna Formasi / Elemen Lambang
                    </h4>

                    <div className="space-y-3">
                      {logoElements.map((el, idx) => (
                        <div
                          key={idx}
                          className="bg-slate-50 hover:bg-blue-50/50 p-4 rounded-2xl border border-slate-200 hover:border-blue-300 transition-all flex gap-4 items-start shadow-sm"
                        >
                          <div className="p-2.5 bg-white border border-slate-200 rounded-xl shrink-0 shadow-xs">
                            {el.icon}
                          </div>
                          <div>
                            <h5 className="font-black text-base text-slate-900 uppercase">
                              {el.title}
                            </h5>
                            <p className="text-sm font-semibold text-slate-600 leading-relaxed mt-0.5">
                              {el.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* MAKNA WARNA */}
                <div className="pt-6 border-t border-slate-200">
                  <h4 className="text-xl font-black uppercase text-slate-900 mb-6 text-center">
                    Makna Warna Lambang HIMAMI
                  </h4>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {colorMeanings.map((color, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-50 p-5 rounded-2xl border-2 border-slate-200 shadow-md flex flex-col justify-between hover:scale-105 transition-transform"
                      >
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <span
                              className={`w-6 h-6 rounded-full shadow-inner ${color.bgClass}`}
                            />
                            <span className="font-black text-sm uppercase text-slate-900">
                              {color.name}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-slate-600 leading-relaxed">
                            {color.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* BAB V PASAL 12: ATRIBUT & BENDERA */}
              <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 md:p-10 shadow-xl space-y-8">
                <div className="text-center max-w-xl mx-auto space-y-2 border-b border-slate-200 pb-6">
                  <span className="bg-[#0B25B7] text-white px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider">
                    BAB V • PASAL 12
                  </span>
                  <h3 className="text-3xl font-black uppercase text-slate-900">
                    ATRIBUT & BENDERA HIMAMI
                  </h3>
                  <p className="text-sm font-semibold text-slate-600">
                    Identitas Fisik, Pakaian Dinas Harian (PDH), dan Bendera Kebanggaan HIMAMI
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* ATRIBUT / PDH CARD */}
                  <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-6 shadow-md flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Shirt className="text-[#0B25B7]" size={24} />
                        <h4 className="text-xl font-black text-slate-900 uppercase">
                          ATRIBUT - PAKAIAN DINAS HARIAN (PDH)
                        </h4>
                      </div>

                      <p className="text-sm font-semibold text-slate-600 leading-relaxed">
                        Atribut resmi organisasi HIMAMI berupa Kemeja Pakaian Dinas Harian (PDH) berwarna dominan Khaki/Krem dengan kombinasi aksen Abu-abu, dilengkapi Badge Merah Putih di lengan kanan, Logo HIMAMI di lengan kiri, serta Identitas Nama & Jabatan Pengurus.
                      </p>
                    </div>

                    {/* PDH IMAGE */}
                    <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-sm text-center">
                      <img
                        src={pdhImg}
                        alt="Gambar PDH HIMAMI"
                        className="w-full h-auto max-h-80 object-contain mx-auto rounded-xl hover:scale-105 transition-transform duration-300"
                      />
                      <span className="block mt-3 text-xs font-black text-[#0B25B7] uppercase">
                        Gambar PDF / Desain PDH HIMAMI
                      </span>
                    </div>

                    <div className="text-left text-xs font-semibold text-slate-700 bg-white p-4 rounded-2xl border border-slate-200 space-y-1.5">
                      <span className="font-black text-[#0B25B7] uppercase block mb-1">
                        Spesifikasi Lengkap PDH:
                      </span>
                      <p>• <strong>Warna Utama:</strong> Krem Khaki dengan aksen Lis Abu-abu</p>
                      <p>• <strong>Sisi Depan:</strong> Bordir Nama Pengurus & Jabatan</p>
                      <p>• <strong>Sisi Belakang:</strong> Bordir Teks HIMAMI UNAS PASIM</p>
                      <p>• <strong>Sisi Lengan:</strong> Bendera Indonesia (Kanan) & Logo HIMAMI (Kiri)</p>
                    </div>
                  </div>

                  {/* BENDERA CARD */}
                  <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-6 shadow-md flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Flag className="text-[#0B25B7]" size={24} />
                        <h4 className="text-xl font-black text-slate-900 uppercase">
                          BENDERA HIMAMI & MAKNANYA
                        </h4>
                      </div>

                      <p className="text-sm font-semibold text-slate-600 leading-relaxed">
                        Bendera resmi HIMAMI UNAS PASIM berkibar sebagai simbol kehormatan, kedaulatan, dan pemersatu seluruh mahasiswa Manajemen Informatika.
                      </p>
                    </div>

                    {/* BENDERA IMAGE */}
                    <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-sm text-center">
                      <img
                        src={benderaImg}
                        alt="Gambar Bendera HIMAMI"
                        className="w-full h-auto max-h-80 object-contain mx-auto rounded-xl hover:scale-105 transition-transform duration-300"
                      />
                      <span className="block mt-3 text-xs font-black text-[#0B25B7] uppercase">
                        BENDERA HIMAMI
                      </span>
                    </div>

                    {/* MAKNA BENDERA */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                      <span className="font-black text-sm text-[#0B25B7] uppercase block border-b border-slate-100 pb-1">
                        Makna Warna Dasar Bendera:
                      </span>
                      <div className="flex items-start gap-3">
                        <span className="w-5 h-5 bg-gray-500 rounded-md shrink-0 mt-0.5 shadow-xs" />
                        <p className="text-sm font-bold text-slate-800 leading-snug">
                          <strong className="text-slate-900">1. Warna Dasar Abu-abu:</strong> Memiliki arti Keseriusan, Kestabilan, Kemandirian, dan Tanggung Jawab.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default About;
