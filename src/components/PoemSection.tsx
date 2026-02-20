import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const STANZAS = [
  `Cintaku padamu bukan sekadar kata,
ia arus yang tak pernah lelah mencari muara.
Aku mencintaimu seperti bumi mencintai porosnya...
diam, tapi menentukan arah.`,

  `Aku menyayangimu seperti malam menjaga bintang..
tanpa gaduh, tapi tak pernah pergi.
Sayangku padamu bukan sekadar rasa,
ia napas yang diam-diam menetap di dada.`,

  `Wajahmu adalah fajar yang selalu ingin kupeluk pandang,
senyummu cahaya yang mengajari hariku tentang hangat.
yang mampu mengalahkan mendung dalam dada.`,

  `Suaranya melengkung manis di udara,
seperti doa kecil yang tak sengaja terdengar Tuhan.
Bagaikan, nada kecil yang sengaja Tuhan titipkan
agar dunia tak terlalu sunyi.`,

  `Ada keindahan yang tak perlu disebutkan,
tak perlu pula dijelaskan.
Ia cukup terlihat dalam caramu berjalan,
cukup terasa saat kau berdiri diam.
Dalam bayang yang jatuh lembut di tanah,
dalam siluet yang membuat waktu lupa berdetak,
dalam langkahmu yang seperti garis halus
yang digambar takdir dengan penuh kesabaran.
Keindahan itu tidak bersuara,
namun selalu berhasil membuat dunia
terdiam sejenak.`,

  `Kecerdasanmu adalah samudra yang tak bertepi,
juga langit tanpa batas yang enggan redup.
Dan imutmu...
adalah ombak kecil sekaligus rahasia sederhana
yang selalu menyeret hatiku kembali,
membuatku jatuh cinta berkali-kali
pada orang yang sama.`,

  `Jika cinta adalah perjalanan panjang,
aku ingin tersesat hanya di matamu.
Dan jika semesta punya alasan untuk indah,
mungkin, namamulah salah satunya.`,
];

// Floating petal particle
const Petal = ({ delay, left }: { delay: number; left: number }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: `${left}%`, top: "-20px" }}
    animate={{
      y: ["0vh", "110vh"],
      x: [0, Math.random() > 0.5 ? 30 : -30, Math.random() > 0.5 ? -20 : 20],
      rotate: [0, 360],
      opacity: [0, 0.6, 0.6, 0],
    }}
    transition={{
      duration: 12 + Math.random() * 8,
      delay,
      repeat: Infinity,
      ease: "linear",
    }}
  >
    <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
      <ellipse cx="6" cy="7" rx="5" ry="7" fill="hsl(5, 40%, 58%)" opacity="0.35" />
      <ellipse cx="5" cy="6" rx="3" ry="4" fill="hsl(0, 85%, 95%)" opacity="0.5" />
    </svg>
  </motion.div>
);

// Scroll-triggered stanza
const Stanza = ({ text, index }: { text: string; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <motion.p
        className="font-serif text-lg md:text-xl lg:text-2xl leading-relaxed md:leading-loose text-foreground/90 whitespace-pre-line max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
      >
        {text}
      </motion.p>
      {index < STANZAS.length - 1 && (
        <motion.div
          className="flex justify-center my-6 md:my-8"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 0.4 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {/* Pixel heart divider */}
          <svg width="16" height="14" viewBox="0 0 16 14">
            <rect x="2" y="0" width="4" height="2" fill="hsl(5, 40%, 58%)" />
            <rect x="10" y="0" width="4" height="2" fill="hsl(5, 40%, 58%)" />
            <rect x="0" y="2" width="8" height="2" fill="hsl(5, 40%, 58%)" />
            <rect x="8" y="2" width="8" height="2" fill="hsl(5, 40%, 58%)" />
            <rect x="0" y="4" width="16" height="2" fill="hsl(5, 40%, 58%)" />
            <rect x="2" y="6" width="12" height="2" fill="hsl(5, 40%, 58%)" />
            <rect x="4" y="8" width="8" height="2" fill="hsl(5, 40%, 58%)" />
            <rect x="6" y="10" width="4" height="2" fill="hsl(5, 40%, 58%)" />
          </svg>
        </motion.div>
      )}
    </div>
  );
};

const PoemSection = () => {
  return (
    <section className="relative py-16 md:py-24 px-6 overflow-hidden">
      {/* Floating petals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <Petal key={i} delay={i * 1.8} left={Math.random() * 100} />
        ))}
      </div>

      {/* Glassmorphism container */}
      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="backdrop-blur-lg bg-card/60 border border-border/40 rounded-2xl p-8 md:p-14 shadow-xl">
          {/* Title */}
          <motion.h2
            className="font-pixel text-xs md:text-sm text-primary text-center mb-10 md:mb-14 tracking-widest uppercase"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            ✦ Puisi Untukmu ✦
          </motion.h2>

          {/* Stanzas */}
          <div className="space-y-8 md:space-y-12 text-center">
            {STANZAS.map((stanza, i) => (
              <Stanza key={i} text={stanza} index={i} />
            ))}
          </div>

          {/* Closing ornament */}
          <motion.div
            className="text-center mt-12 md:mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className="font-pixel text-[8px] text-primary/50 tracking-[0.3em]">
              ♡ ♡ ♡
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PoemSection;
