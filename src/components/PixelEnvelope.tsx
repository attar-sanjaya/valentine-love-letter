import { motion } from "framer-motion";

interface PixelEnvelopeProps {
  onClick: () => void;
  isOpening: boolean;
}

const PixelEnvelope = ({ onClick, isOpening }: PixelEnvelopeProps) => {
  return (
    <motion.div
      className="flex flex-col items-center gap-6 cursor-pixel-heart"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Envelope SVG - Pixel Art Style */}
      <motion.div
        onClick={!isOpening ? onClick : undefined}
        className={isOpening ? "" : "animate-breathe"}
        whileHover={!isOpening ? { scale: 1.05 } : {}}
        whileTap={!isOpening ? { scale: 0.98 } : {}}
      >
        <motion.svg
          width="180"
          height="140"
          viewBox="0 0 180 140"
          className="drop-shadow-lg"
          animate={isOpening ? {
            scale: [1, 1.1, 1.2, 0],
            rotate: [0, -5, 5, 0],
            opacity: [1, 1, 1, 0],
          } : {}}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          {/* Envelope body */}
          <rect x="10" y="30" width="160" height="100" fill="hsl(32, 50%, 88%)" />
          <rect x="10" y="30" width="160" height="100" fill="none" stroke="hsl(25, 30%, 50%)" strokeWidth="3" />

          {/* Envelope flap (closed) */}
          {!isOpening && (
            <>
              <polygon points="10,30 90,80 170,30" fill="hsl(32, 45%, 82%)" stroke="hsl(25, 30%, 50%)" strokeWidth="3" />
              {/* Heart seal */}
              <circle cx="90" cy="45" r="14" fill="hsl(5, 40%, 58%)" />
              <g transform="translate(82, 37)">
                <rect x="2" y="0" width="3" height="3" fill="hsl(5, 50%, 75%)" />
                <rect x="8" y="0" width="3" height="3" fill="hsl(5, 50%, 75%)" />
                <rect x="0" y="2" width="3" height="3" fill="hsl(5, 50%, 75%)" />
                <rect x="4" y="2" width="5" height="3" fill="hsl(5, 50%, 75%)" />
                <rect x="10" y="2" width="3" height="3" fill="hsl(5, 50%, 75%)" />
                <rect x="1" y="5" width="11" height="3" fill="hsl(5, 50%, 75%)" />
                <rect x="3" y="8" width="7" height="3" fill="hsl(5, 50%, 75%)" />
                <rect x="5" y="11" width="3" height="3" fill="hsl(5, 50%, 75%)" />
              </g>
            </>
          )}

          {/* Envelope flap (opening) */}
          {isOpening && (
            <motion.polygon
              points="10,30 90,80 170,30"
              fill="hsl(32, 45%, 82%)"
              stroke="hsl(25, 30%, 50%)"
              strokeWidth="3"
              animate={{
                points: ["10,30 90,80 170,30", "10,30 90,0 170,30"],
              }}
              transition={{ duration: 0.5 }}
            />
          )}

          {/* Envelope lines */}
          <line x1="30" y1="70" x2="80" y2="70" stroke="hsl(25, 20%, 70%)" strokeWidth="2" strokeDasharray="4" />
          <line x1="30" y1="85" x2="150" y2="85" stroke="hsl(25, 20%, 70%)" strokeWidth="2" strokeDasharray="4" />
          <line x1="30" y1="100" x2="130" y2="100" stroke="hsl(25, 20%, 70%)" strokeWidth="2" strokeDasharray="4" />
        </motion.svg>
      </motion.div>

      {/* Label text */}
      {!isOpening && (
        <motion.p
          className="font-pixel text-xs md:text-sm text-love-rose animate-gentle-pulse select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          For Rania – Click to open
        </motion.p>
      )}
    </motion.div>
  );
};

export default PixelEnvelope;
