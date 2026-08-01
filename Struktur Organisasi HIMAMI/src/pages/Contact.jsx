import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Globe, Send, MessageSquare, ChevronDown, CheckCircle2 } from "lucide-react";
import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  const faqs = [
    {
      q: "Bagaimana cara mendaftar menjadi anggota HIMAMI?",
      a: "Pendaftaran anggota baru dibuka setiap awal semester melalui event OSJUR (Orientasi Jurusan) atau formulir online yang dipublikasikan di Instagram @himami_pasim.",
    },
    {
      q: "Siapa saja yang bisa ikutan event & workshop HIMAMI?",
      a: "Sebagian besar event (Seminar, Pelatihan Web, dll) terbuka untuk seluruh mahasiswa Manajemen Informatika maupun umum sesuai ketentuan masing-masing kegiatan.",
    },
    {
      q: "Di mana sekretariat/lokasi HIMAMI?",
      a: "Sekretariat HIMAMI berlokasi di Gedung Organisasi Mahasiswa, Kampus Universitas Nasional PASIM.",
    },
  ];

  return (
    <section
      id="contact"
      className="scroll-mt-20 min-h-screen bg-[#F8FAFC] px-4 md:px-8 py-20 relative overflow-hidden flex flex-col justify-center items-center text-slate-900 border-b border-slate-200"
    >
      {/* DECORATIVE BACKGROUND */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl w-full relative z-10">
        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-blue-50 text-[#0B25B7] border border-blue-200 px-4 py-1.5 font-black text-xs md:text-sm uppercase rounded-full shadow-sm mb-3">
            Layanan Informasi & Masukan
          </div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-slate-900">
            Hubungi HIMAMI
          </h2>
          <p className="text-slate-600 font-semibold max-w-xl mx-auto mt-3 text-base md:text-lg">
            Punya pertanyaan, usulan kerjasama, atau aspirasi? Hubungi tim pengurus HIMAMI melalui saluran resmi berikut.
          </p>
        </motion.div>

        {/* MAIN CONTACT GRID */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* LEFT INFO CARD */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="
              bg-white
              text-slate-900
              border-2
              border-slate-200
              rounded-3xl
              shadow-xl
              p-8 md:p-10
              flex flex-col justify-between
            "
          >
            <div>
              <h3 className="text-3xl font-black mb-6 uppercase text-[#0B25B7] tracking-wide">
                Kontak Resmi
              </h3>

              <div className="space-y-4 text-slate-900">
                {/* ADDRESS */}
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm hover:border-[#0B25B7] hover:translate-x-1 transition-all"
                >
                  <MapPin size={22} className="text-[#0B25B7] shrink-0" />
                  <div>
                    <span className="text-xs font-black uppercase text-slate-500 block">LOKASI KAMPUS</span>
                    <span className="font-extrabold text-sm md:text-base text-slate-900">UNIVERSITAS NASIONAL PASIM</span>
                  </div>
                </a>

                {/* PHONE / WHATSAPP */}
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm hover:border-[#0B25B7] hover:translate-x-1 transition-all"
                >
                  <Phone size={22} className="text-[#0B25B7] shrink-0" />
                  <div>
                    <span className="text-xs font-black uppercase text-slate-500 block">WHATSAPP OFFICIAL</span>
                    <span className="font-extrabold text-sm md:text-base text-slate-900">+62 812-3456-7890</span>
                  </div>
                </a>

                {/* EMAIL */}
                <a
                  href="mailto:himami@email.com"
                  className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm hover:border-[#0B25B7] hover:translate-x-1 transition-all"
                >
                  <Mail size={22} className="text-[#0B25B7] shrink-0" />
                  <div>
                    <span className="text-xs font-black uppercase text-slate-500 block">EMAIL RESMI</span>
                    <span className="font-extrabold text-sm md:text-base text-slate-900">himami@email.com</span>
                  </div>
                </a>

                {/* INSTAGRAM */}
                <a
                  href="https://instagram.com/himami_official"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm hover:border-[#0B25B7] hover:translate-x-1 transition-all"
                >
                  <Globe size={22} className="text-[#0B25B7] shrink-0" />
                  <div>
                    <span className="text-xs font-black uppercase text-slate-500 block">INSTAGRAM</span>
                    <span className="font-extrabold text-sm md:text-base text-slate-900">@himami_pasim</span>
                  </div>
                </a>
              </div>
            </div>

            {/* QUICK WHATSAPP CTA */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#0B25B7] hover:bg-blue-800 text-white border border-blue-900 p-3.5 rounded-xl font-black text-sm uppercase flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all tracking-wider"
              >
                <MessageSquare size={18} />
                <span>CHAT LANGSUNG VIA WHATSAPP</span>
              </a>
            </div>
          </motion.div>

          {/* RIGHT FORM CARD */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="
              bg-white
              text-slate-900
              border-2
              border-slate-200
              rounded-3xl
              shadow-xl
              p-8 md:p-10
            "
          >
            <h3 className="text-3xl font-black mb-6 uppercase text-[#0B25B7] tracking-wide">
              Kirim Pesan & Aspirasi
            </h3>

            {submitted ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-blue-50/50 border border-blue-200 p-8 rounded-2xl shadow-sm text-center space-y-4"
              >
                <div className="w-16 h-16 bg-[#0B25B7] text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="text-2xl font-black uppercase text-[#0B25B7]">PESAN TERKIRIM!</h4>
                <p className="text-sm font-semibold text-slate-700 leading-relaxed">
                  Terima kasih <span className="font-black text-[#0B25B7]">{formData.name}</span>. Pesan dan aspirasi kamu telah berhasil terkirim ke sistem pengurus HIMAMI.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", message: "" });
                  }}
                  className="bg-[#0B25B7] hover:bg-blue-800 text-white border border-blue-900 px-6 py-2.5 rounded-xl font-black text-xs uppercase shadow-lg shadow-blue-600/30 transition-all tracking-wider"
                >
                  KIRIM PESAN LAIN
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-black uppercase mb-1.5 text-slate-700">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    placeholder="Masukkan nama kamu..."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="
                      w-full
                      p-3.5
                      bg-slate-50
                      border
                      border-slate-300
                      rounded-xl
                      font-semibold
                      text-sm
                      text-slate-900
                      placeholder-slate-400
                      outline-none
                      focus:border-[#0B25B7]
                      transition-colors
                    "
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase mb-1.5 text-slate-700">Alamat Email</label>
                  <input
                    type="email"
                    required
                    placeholder="nama@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="
                      w-full
                      p-3.5
                      bg-slate-50
                      border
                      border-slate-300
                      rounded-xl
                      font-semibold
                      text-sm
                      text-slate-900
                      placeholder-slate-400
                      outline-none
                      focus:border-[#0B25B7]
                      transition-colors
                    "
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase mb-1.5 text-slate-700">Pesan / Aspirasi</label>
                  <textarea
                    required
                    rows="4"
                    placeholder="Tuliskan pesan, pertanyaan, atau usulan kamu..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="
                      w-full
                      p-3.5
                      bg-slate-50
                      border
                      border-slate-300
                      rounded-xl
                      font-semibold
                      text-sm
                      text-slate-900
                      placeholder-slate-400
                      outline-none
                      focus:border-[#0B25B7]
                      transition-colors
                    "
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="
                    bg-[#0B25B7]
                    hover:bg-blue-800
                    text-white
                    w-full
                    py-4
                    border
                    border-blue-900
                    rounded-xl
                    font-black
                    text-base
                    shadow-lg
                    shadow-blue-600/30
                    flex items-center justify-center gap-2
                    cursor-pointer
                    transition-all
                    uppercase
                    tracking-wider
                  "
                >
                  <Send size={18} />
                  <span>KIRIM PESAN SEKARANG</span>
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>

        {/* FAQ ACCORDION SECTION */}
        <div className="bg-white border-2 border-slate-200 p-6 md:p-10 rounded-3xl shadow-xl backdrop-blur-md">
          <h3 className="text-2xl font-black uppercase text-slate-900 text-center mb-6">
            Pertanyaan Yang Sering Diajukan (FAQ)
          </h3>

          <div className="space-y-3 max-w-3xl mx-auto">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-4 text-left font-black text-sm md:text-base flex items-center justify-between gap-4 text-slate-900 hover:text-[#0B25B7] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={20}
                    className={`transition-transform shrink-0 ${activeFaq === idx ? "rotate-180 text-[#0B25B7]" : "text-slate-400"}`}
                  />
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-slate-200 bg-white p-4 text-xs md:text-sm font-semibold text-slate-700 leading-relaxed"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
