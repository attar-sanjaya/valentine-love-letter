import { motion, AnimatePresence } from "framer-motion";
import TypewriterText from "./TypewriterText";
import { useState } from "react";

interface LetterModalProps {
  onTypewriterComplete: () => void;
}

const LETTER_TEXT = `For Rania,
 
I'm so happy I found you.
Out of all the days in high school,
you are the best thing that ever happened to me.

In the middle of exams, noise, and ordinary mornings,
you became my favorite part of everything.

You're cute in ways you don't even realize,
smart without trying too hard,
funny without meaning to be,
and beautiful in a way that makes my heart pause.

I'm so lucky to have you.
Truly.

I know I can be a little annoying sometimes,
so… I'm sorry for that.

But please don't ever get tired of me.
Let's stay like this.
Let's stay us.

Please be my soulmate,
today and for all the days after.

I love you so much, Rania~<3

— your one and only, Fox`;

// Component to render letter with bold Rania and clickable Fox→Attar
const LetterContent = ({ text }: { text: string }) => {
  const [revealed, setRevealed] = useState(false);

  // Split text and apply formatting
  const parts = text.split(/(Rania|Fox)/g);

  return (
    <>
      {parts.map((part, i) => {
        if (part === "Rania") {
          return <strong key={i} className="font-bold text-primary">{part}</strong>;
        }
        if (part === "Fox") {
          return (
            <span
              key={i}
              className="cursor-pointer underline decoration-dotted decoration-primary/40 hover:decoration-primary transition-colors"
              onClick={() => setRevealed(true)}
            >
              <AnimatePresence mode="wait">
                {revealed ? (
                  <motion.span
                    key="attar"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-bold text-primary"
                  >
                    Attar
                  </motion.span>
                ) : (
                  <motion.span key="fox" exit={{ opacity: 0, y: 4 }}>
                    Fox
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
};

const LetterModal = ({ onTypewriterComplete }: LetterModalProps) => {
  const [showSkip, setShowSkip] = useState(true);
  const [skipTyping, setSkipTyping] = useState(false);

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto px-4"
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
    >
      {/* Decorative top flowers */}
      <div className="flex justify-center gap-2 mb-2">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.8 + i * 0.1 }}
          >
            <svg width="20" height="20" viewBox="0 0 16 16">
              <rect x="6" y="0" width="4" height="4" fill="hsl(5, 35%, 60%)" />
              <rect x="0" y="6" width="4" height="4" fill="hsl(5, 35%, 60%)" />
              <rect x="12" y="6" width="4" height="4" fill="hsl(5, 35%, 60%)" />
              <rect x="6" y="12" width="4" height="4" fill="hsl(5, 35%, 60%)" />
              <rect x="4" y="4" width="8" height="8" fill="hsl(32, 50%, 88%)" />
              <rect x="6" y="6" width="4" height="4" fill="hsl(15, 45%, 70%)" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Letter paper */}
      <div className="pixel-paper pixel-border rounded-lg p-6 md:p-10 relative overflow-hidden">
        {/* Corner decorations */}
        <div className="absolute top-2 left-2 opacity-30">
          <svg width="24" height="24" viewBox="0 0 16 16">
            <rect x="0" y="4" width="4" height="4" fill="hsl(100, 14%, 55%)" />
            <rect x="4" y="0" width="4" height="4" fill="hsl(100, 14%, 55%)" />
            <rect x="4" y="4" width="4" height="4" fill="hsl(100, 14%, 45%)" />
            <rect x="4" y="8" width="4" height="8" fill="hsl(100, 14%, 55%)" />
          </svg>
        </div>
        <div className="absolute top-2 right-2 opacity-30 transform scale-x-[-1]">
          <svg width="24" height="24" viewBox="0 0 16 16">
            <rect x="0" y="4" width="4" height="4" fill="hsl(100, 14%, 55%)" />
            <rect x="4" y="0" width="4" height="4" fill="hsl(100, 14%, 55%)" />
            <rect x="4" y="4" width="4" height="4" fill="hsl(100, 14%, 45%)" />
            <rect x="4" y="8" width="4" height="8" fill="hsl(100, 14%, 55%)" />
          </svg>
        </div>

        {/* Letter content */}
        <div className="font-body text-foreground text-sm md:text-base leading-relaxed md:leading-loose whitespace-pre-line">
          {skipTyping ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <LetterContent text={LETTER_TEXT} />
            </motion.div>
          ) : (
            <TypewriterText
              text={LETTER_TEXT}
              speed={30}
              onComplete={() => {
                setShowSkip(false);
                onTypewriterComplete();
              }}
              renderText={(displayed) => <LetterContent text={displayed} />}
            />
          )}
        </div>

        {/* Skip button */}
        {showSkip && !skipTyping && (
          <motion.button
            className="absolute bottom-3 right-4 font-pixel text-[8px] text-muted-foreground hover:text-primary transition-colors"
            onClick={() => {
              setSkipTyping(true);
              setShowSkip(false);
              onTypewriterComplete();
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
          >
            skip ▸▸
          </motion.button>
        )}
      </div>

      {/* Bottom decoration */}
      <div className="flex justify-center gap-2 mt-2">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1 + i * 0.1 }}
          >
            <svg width="20" height="20" viewBox="0 0 16 16">
              <rect x="6" y="0" width="4" height="4" fill="hsl(5, 35%, 60%)" />
              <rect x="0" y="6" width="4" height="4" fill="hsl(5, 35%, 60%)" />
              <rect x="12" y="6" width="4" height="4" fill="hsl(5, 35%, 60%)" />
              <rect x="6" y="12" width="4" height="4" fill="hsl(5, 35%, 60%)" />
              <rect x="4" y="4" width="8" height="8" fill="hsl(32, 50%, 88%)" />
              <rect x="6" y="6" width="4" height="4" fill="hsl(15, 45%, 70%)" />
            </svg>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default LetterModal;
