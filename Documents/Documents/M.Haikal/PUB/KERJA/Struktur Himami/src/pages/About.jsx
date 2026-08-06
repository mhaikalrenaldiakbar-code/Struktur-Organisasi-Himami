import { motion } from "framer-motion";
import { ShieldCheck, Lightbulb, HeartHandshake, Award, Target, Compass, Flag, Shield, Flame, Laptop, Hexagon } from "lucide-react";
import logo from "../assets/logo-himami.png";

function About() {
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

  const flagPhilosophy = [
    {
      title: "Biru Tua & Biru Muda (Deep Royal Blue)",
      subtitle: "Warna Utama Bendera HIMAMI",
      desc: "Melambangkan wibawa kedalaman ilmu pengetahuan Informatika, ketenangan berpikir, serta sikap profesionalisme mahasiswa Manajemen Informatika.",
      icon: <Flag className="text-[#0B25B7]" size={24} />,
      badge: "WARNA BENDERA",
    },
    {
      title: "Bentuk Segienam (Hexagon)",
      subtitle: "Struktur & Fondasi Teknologi",
      desc: "Menggambarkan ketahanan struktur organisasi, solidaritas antar divisi/angkatan, dan jaringan komputer yang saling terhubung kokoh.",
      icon: <Hexagon className="text-blue-600" size={24} />,
      badge: "BENTUK LOGO",
    },
    {
      title: "Laptop & Figur Manusia",
      subtitle: "Manajemen & Teknologi",
      desc: "Simbol penguasaan perangkat teknologi modern yang digerakkan oleh sumber daya manusia unggul yang saling bergandengan tangan.",
      icon: <Laptop className="text-[#0B1957]" size={24} />,
      badge: "SIMBOL UTAMA",
    },
    {
      title: "Kobaran Api Emas & Merah",
      subtitle: "Semangat & Cita-cita Luhur",
      desc: "Melambangkan obor semangat belajar yang tak kunjung padam, keberanian berkarya, serta dorongan mencapai prestasi tertinggi.",
      icon: <Flame className="text-amber-500 fill-amber-500" size={24} />,
      badge: "ELEMEN OBOR",
    },
  ];

  return (
    <section
      id="about"
      className="scroll-mt-20 min-h-screen bg-hex-pattern px-4 md:px-8 py-20 overflow-hidden relative border-b border-slate-200 text-slate-900"
    >
      {/* BACKGROUND DECORATIONS */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* HEADER TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-1.5 bg-blue-50 text-[#0B1957] border border-blue-200 px-4 py-1.5 font-black text-xs md:text-sm uppercase rounded-full shadow-sm mb-3">
            <Shield size={14} className="text-amber-500" /> Profil & Haluan Resmi HIMAMI
          </div>
          <h2 className="text-4xl md:text-6xl font-black uppercase text-[#0B1957] tracking-tight">
            Tentang Organisasi
          </h2>
          <p className="text-slate-600 font-semibold max-w-2xl mx-auto mt-3 text-base md:text-lg">
            Mengenal Visi, Misi, Nilai-nilai Dasar, serta Makna Warna Bendera dan Logo Resmi HIMAMI.
          </p>
        </motion.div>

        {/* VISI & MISI GRID */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {/* VISI CARD */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="
              bg-white
              text-slate-900
              border-2 border-slate-200
              hover:border-[#0B25B7]
              rounded-3xl
              shadow-xl
              relative
              overflow-hidden
              flex flex-col
              justify-between
              transition-all
            "
          >
            {/* CARD WINDOW TOP BAR */}
            <div className="bg-gradient-to-r from-[#0B1957] to-[#0B25B7] px-6 py-4 flex items-center justify-between border-b-2 border-amber-400">
              <div className="flex items-center gap-2">
                <Target size={20} className="text-amber-400" />
                <span className="font-black text-base uppercase tracking-wider text-white">Visi Utama Himpunan</span>
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-400 rounded-full" />
                <div className="w-3 h-3 bg-amber-400 rounded-full" />
                <div className="w-3 h-3 bg-emerald-400 rounded-full" />
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-8 md:p-10">
              <span className="text-xs font-black text-[#0B1957] uppercase tracking-widest bg-amber-100 border border-amber-300 text-amber-900 px-3 py-1 rounded-md inline-block mb-4">
                LANDASAN PERJUANGAN
              </span>
              <p className="text-lg md:text-2xl leading-relaxed font-bold text-slate-800">
                &quot;Terwujudnya HIMAMI sebagai organisasi yang berintegritas, berkualitas, dan progresif dalam membentuk mahasiswa Manajemen Informatika yang solid, partisipatif, serta berlandaskan pada nilai-nilai kekeluargaan dan keislaman.&quot;
              </p>
            </div>

            <div className="px-8 pb-6 text-right">
              <span className="text-5xl md:text-6xl font-black text-slate-100 uppercase select-none">VISI</span>
            </div>
          </motion.div>

          {/* MISI CARD */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="
              bg-white
              text-slate-900
              border-2 border-slate-200
              hover:border-[#0B25B7]
              rounded-3xl
              shadow-xl
              relative
              overflow-hidden
              flex flex-col
              justify-between
              transition-all
            "
          >
            {/* CARD WINDOW TOP BAR */}
            <div className="bg-gradient-to-r from-[#0B1957] to-[#0B25B7] px-6 py-4 flex items-center justify-between border-b-2 border-amber-400">
              <div className="flex items-center gap-2">
                <Compass size={20} className="text-amber-400" />
                <span className="font-black text-base uppercase tracking-wider text-white">Misi Strategis Organisasi</span>
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-400 rounded-full" />
                <div className="w-3 h-3 bg-amber-400 rounded-full" />
                <div className="w-3 h-3 bg-emerald-400 rounded-full" />
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-8 md:p-10 space-y-4">
              {[
                "Meningkatkan kualitas akademik, skill IT, dan solidaritas mahasiswa Manajemen Informatika.",
                "Menjadi sarana dan wadah kreatif pengembangan potensi, minat, serta karya inovasi mahasiswa.",
                "Menjalin sinergi kekeluargaan, jejaring alumni, dan kerja sama harmonis dengan ekosistem luar.",
              ].map((misiText, idx) => (
                <div key={idx} className="flex gap-4 items-start bg-slate-50 p-4 border border-slate-200 rounded-2xl shadow-sm hover:border-blue-300 transition-all">
                  <span className="bg-[#0B1957] text-amber-400 text-sm font-black px-3 py-1 rounded-lg shrink-0 shadow-md">
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
          </motion.div>
        </div>

        {/* ================= SPECIAL FEATURE: FILOSOFI LOGO & BENDERA HIMAMI ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20 bg-gradient-to-br from-[#0B1957] via-[#0B25B7] to-[#0A1128] border-4 border-yellow-500/80 rounded-3xl p-8 md:p-12 shadow-2xl text-white relative overflow-hidden"
        >
          {/* DECORATIVE LIGHT GLOW */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center max-w-3xl mx-auto mb-12 relative z-10">
            <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 px-4 py-1 font-black text-xs uppercase rounded-full shadow-md mb-3">
              <Flag size={14} className="fill-slate-950" /> INDENTITAS RESMI & ARTI LAMBANG
            </div>
            <h3 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight">
              Filosofi Warna Bendera & Logo HIMAMI
            </h3>
            <p className="text-blue-100 text-sm md:text-base font-semibold mt-3">
              Setiap elemen visual pada logo dan bendera HIMAMI memiliki makna mendalam yang mencerminkan jati diri mahasiswa Manajemen Informatika.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* LEFT LOGO & FLAG PREVIEW BADGE */}
            <div className="lg:col-span-5 flex flex-col items-center text-center bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl shadow-xl">
              <div className="relative p-6 bg-white rounded-3xl shadow-2xl border-4 border-yellow-400 mb-6 group hover:scale-105 transition-transform">
                <img src={logo} alt="Bendera dan Logo HIMAMI" className="w-48 sm:w-56 h-auto object-contain filter drop-shadow-xl" />
              </div>
              <h4 className="text-2xl font-black uppercase text-white">Bendera Resmi HIMAMI</h4>
              <p className="text-xs font-bold text-amber-300 mt-1 uppercase tracking-widest">
                Warna Dasar: Royal Blue & Hexagon IT
              </p>
              <p className="text-xs text-blue-200 mt-3 font-semibold leading-relaxed">
                Dipakai sebagai atribut kebanggaan dalam upacara resmi, pelantikan, event nasional, dan panji kebesaran organisasi HIMAMI.
              </p>
            </div>

            {/* RIGHT PHILOSOPHY BREAKDOWN GRID */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
              {flagPhilosophy.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white/95 text-slate-900 p-5 rounded-2xl border border-white/40 shadow-lg hover:border-yellow-400 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-xl shadow-sm">
                      {item.icon}
                    </div>
                    <span className="text-[10px] font-black uppercase bg-[#0B1957] text-white px-2.5 py-0.5 rounded-md">
                      {item.badge}
                    </span>
                  </div>
                  <h5 className="font-black text-base text-[#0B1957] leading-tight mb-1">
                    {item.title}
                  </h5>
                  <span className="text-xs font-extrabold text-[#0B25B7] block mb-2">
                    {item.subtitle}
                  </span>
                  <p className="text-xs font-semibold text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* NILAI UTAMA ORGANISASI */}
        <div>
          <h3 className="text-2xl md:text-4xl font-black uppercase text-center text-[#0B1957] mb-10 tracking-tight">
            Nilai Utama Pengurus HIMAMI
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, y: -4 }}
                className="
                  bg-white
                  text-slate-900
                  border-2 border-slate-200
                  hover:border-[#0B25B7]
                  p-6
                  rounded-2xl
                  shadow-xl
                  flex flex-col justify-between
                  transition-all group
                "
              >
                <div>
                  <div className="w-12 h-12 bg-[#0B1957] text-amber-400 border border-blue-900 rounded-2xl flex items-center justify-center mb-4 font-black shadow-md group-hover:bg-[#0B25B7] transition-colors">
                    {val.icon}
                  </div>
                  <h4 className="text-lg font-black uppercase text-[#0B1957] mb-2">{val.title}</h4>
                  <p className="text-sm font-semibold text-slate-600 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;

