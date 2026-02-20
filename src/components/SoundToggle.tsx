import { motion } from "framer-motion";

interface SoundToggleProps {
  isMuted: boolean;
  onToggle: () => void;
}

const SoundToggle = ({ isMuted, onToggle }: SoundToggleProps) => {
  return (
    <motion.button
      onClick={onToggle}
      className="fixed top-4 right-4 z-50 p-2 rounded-lg bg-card/80 backdrop-blur-sm border border-border hover:bg-secondary transition-colors"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      aria-label={isMuted ? "Unmute" : "Mute"}
    >
      {/* Pixel speaker icon */}
      <svg width="24" height="24" viewBox="0 0 24 24" className="block">
        {/* Speaker body */}
        <rect x="2" y="8" width="4" height="8" fill="hsl(25, 30%, 30%)" />
        <rect x="6" y="6" width="2" height="12" fill="hsl(25, 30%, 30%)" />
        <rect x="8" y="4" width="2" height="16" fill="hsl(25, 30%, 30%)" />
        <rect x="10" y="2" width="2" height="20" fill="hsl(25, 30%, 30%)" />

        {!isMuted ? (
          <>
            {/* Sound waves */}
            <rect x="14" y="8" width="2" height="2" fill="hsl(5, 35%, 60%)" />
            <rect x="14" y="14" width="2" height="2" fill="hsl(5, 35%, 60%)" />
            <rect x="16" y="6" width="2" height="2" fill="hsl(5, 35%, 60%)" />
            <rect x="16" y="16" width="2" height="2" fill="hsl(5, 35%, 60%)" />
            <rect x="18" y="4" width="2" height="2" fill="hsl(100, 14%, 55%)" />
            <rect x="18" y="18" width="2" height="2" fill="hsl(100, 14%, 55%)" />
          </>
        ) : (
          <>
            {/* X mark */}
            <rect x="14" y="8" width="2" height="2" fill="hsl(5, 35%, 60%)" />
            <rect x="16" y="10" width="2" height="2" fill="hsl(5, 35%, 60%)" />
            <rect x="18" y="12" width="2" height="2" fill="hsl(5, 35%, 60%)" />
            <rect x="16" y="14" width="2" height="2" fill="hsl(5, 35%, 60%)" />
            <rect x="14" y="16" width="2" height="2" fill="hsl(5, 35%, 60%)" />
            <rect x="18" y="8" width="2" height="2" fill="hsl(5, 35%, 60%)" />
            <rect x="14" y="12" width="2" height="2" fill="hsl(5, 35%, 60%)" />
            <rect x="18" y="16" width="2" height="2" fill="hsl(5, 35%, 60%)" />
          </>
        )}
      </svg>
    </motion.button>
  );
};

export default SoundToggle;
