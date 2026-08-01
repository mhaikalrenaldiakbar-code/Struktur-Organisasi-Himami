import { motion } from "framer-motion";
import { ShieldCheck, Lightbulb, HeartHandshake, Award, Target, Compass } from "lucide-react";

function About() {
  const values = [
    {
      title: "INTEGRITAS",
      desc: "Menjunjung tinggi kejujuran, etika akademik, dan tanggung jawab moral dalam setiap tindakan.",
      icon: <ShieldCheck size={28} />,
      bg: "bg-white",
    },
    {
      title: "INOVASI",
      desc: "Berani berpikir kritis, kreatif, dan menciptakan solusi teknologi yang berdaya guna.",
      icon: <Lightbulb size={28} />,
      bg: "bg-yellow-300",
    },
    {
      title: "KEKELUARGAAN",
      desc: "Membangun rasa solidaritas, saling mendukung, dan keterikatan yang erat antar sesama anggota.",
      icon: <HeartHandshake size={28} />,
      bg: "bg-white",
    },
    {
      title: "PROFESIONAL",
      desc: "Berorientasi pada kualitas terbaik, disiplin tinggi, dan tata kelola himpunan yang handal.",
      icon: <Award size={28} />,
      bg: "bg-yellow-300",
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
          className="text-center mb-14"
        >
          <div className="inline-block bg-blue-50 text-[#0B25B7] border border-blue-200 px-4 py-1.5 font-black text-xs md:text-sm uppercase rounded-full shadow-sm mb-3">
            Profil & Haluan HIMAMI
          </div>
          <h2 className="text-4xl md:text-6xl font-black uppercase text-slate-900 tracking-tight">
            Tentang Kami
          </h2>
          <p className="text-slate-600 font-semibold max-w-xl mx-auto mt-3 text-base md:text-lg">
            Mengenal Visi, Misi, dan Nilai-nilai Dasar yang melandasi seluruh gerak langkah organisasi HIMAMI.
          </p>
        </motion.div>

        {/* VISI & MISI GRID */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
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

            {/* CONTENT */}
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

            {/* CONTENT */}
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
          </motion.div>
        </div>

        {/* NILAI UTAMA ORGANISASI */}
        <div className="mt-12">
          <h3 className="text-2xl md:text-3xl font-black uppercase text-center text-slate-900 mb-8">
            Nilai Utama Organisasi
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
                  transition-all
                "
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
      </div>
    </section>
  );
}

export default About;
