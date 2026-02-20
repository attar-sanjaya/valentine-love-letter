import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PixelParticles from "@/components/PixelParticles";
import PixelEnvelope from "@/components/PixelEnvelope";
import PixelConfetti from "@/components/PixelConfetti";
import LetterModal from "@/components/LetterModal";
import PhotoGallery from "@/components/PhotoGallery";
import PoemSection from "@/components/PoemSection";
import SoundToggle from "@/components/SoundToggle";
import AudioPlayer from "@/components/AudioPlayer";
import TouchHearts from "@/components/TouchHearts";

type Phase = "start" | "transition" | "letter";

const Index = () => {
  const [phase, setPhase] = useState<Phase>("start");
  const [showConfetti, setShowConfetti] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  const handleEnvelopeClick = useCallback(() => {
    setPhase("transition");
    setShowConfetti(true);

    // Start audio
    setIsPlaying(true);

    // Transition to letter after envelope animation
    setTimeout(() => {
      setPhase("letter");
    }, 1300);

    // Clear confetti
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  }, []);

  const handleTypewriterComplete = useCallback(() => {
    setShowGallery(true);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Touch love hearts */}
      <TouchHearts />
      
      {/* Pixel particles always visible */}
      <PixelParticles count={phase === "start" ? 15 : 25} />

      {/* Audio player */}
      <AudioPlayer isPlaying={isPlaying} isMuted={isMuted} />

      {/* Confetti explosion */}
      <PixelConfetti active={showConfetti} />

      {/* Sound toggle - only show after opening */}
      <AnimatePresence>
        {phase === "letter" && (
          <SoundToggle isMuted={isMuted} onToggle={() => setIsMuted((m) => !m)} />
        )}
      </AnimatePresence>

      {/* Phase 1: Start Screen */}
      <AnimatePresence>
        {(phase === "start" || phase === "transition") && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-10"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Slow-moving pixel clouds */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{ top: `${15 + i * 25}%` }}
                  animate={{
                    x: ["-100px", "calc(100vw + 100px)"],
                  }}
                  transition={{
                    duration: 40 + i * 15,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 8,
                  }}
                >
                  <svg width="80" height="40" viewBox="0 0 80 40" opacity="0.15">
                    <rect x="16" y="8" width="48" height="8" fill="hsl(25, 30%, 60%)" />
                    <rect x="8" y="16" width="64" height="8" fill="hsl(25, 30%, 60%)" />
                    <rect x="0" y="24" width="80" height="8" fill="hsl(25, 30%, 60%)" />
                    <rect x="8" y="32" width="64" height="8" fill="hsl(25, 30%, 60%)" />
                  </svg>
                </motion.div>
              ))}
            </div>

            <PixelEnvelope onClick={handleEnvelopeClick} isOpening={phase === "transition"} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 3: Letter + Gallery */}
      <AnimatePresence>
        {phase === "letter" && (
          <motion.div
            className="relative z-20 min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Dreamy blurred background layer */}
            <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-0" />

            <div className="relative z-10 flex flex-col items-center pt-8 md:pt-16 pb-8">
              <LetterModal onTypewriterComplete={handleTypewriterComplete} />

              {/* Photo Gallery */}
              <AnimatePresence>
                {showGallery && (
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                     <PhotoGallery />
                   </motion.div>
                 )}
               </AnimatePresence>

               {/* Poem Section */}
               <AnimatePresence>
                 {showGallery && (
                   <motion.div
                     initial={{ opacity: 0, y: 40 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.8, delay: 0.3 }}
                     className="w-full"
                   >
                     <PoemSection />
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
