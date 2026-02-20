import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
  shape: "heart" | "sparkle";
}

const PixelConfetti = ({ active }: { active: boolean }) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (!active) return;
    const colors = [
      "hsl(5, 35%, 60%)",
      "hsl(32, 50%, 88%)",
      "hsl(100, 14%, 55%)",
      "hsl(0, 85%, 95%)",
      "hsl(15, 45%, 70%)",
    ];
    const generated: ConfettiPiece[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: 50 + (Math.random() - 0.5) * 80,
      y: 50 + (Math.random() - 0.5) * 60,
      rotation: Math.random() * 720 - 360,
      scale: Math.random() * 0.8 + 0.4,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: Math.random() > 0.5 ? "heart" : "sparkle",
    }));
    setPieces(generated);
  }, [active]);

  if (!active || pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{ left: "50%", top: "40%" }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
          animate={{
            x: `${(p.x - 50) * 3}vw`,
            y: `${(p.y - 50) * 3}vh`,
            opacity: [1, 1, 0],
            scale: p.scale,
            rotate: p.rotation,
          }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          {p.shape === "heart" ? (
            <svg width="16" height="16" viewBox="0 0 16 16">
              <rect x="3" y="1" width="3" height="3" fill={p.color} />
              <rect x="9" y="1" width="3" height="3" fill={p.color} />
              <rect x="1" y="3" width="13" height="3" fill={p.color} />
              <rect x="1" y="5" width="13" height="3" fill={p.color} />
              <rect x="3" y="8" width="9" height="3" fill={p.color} />
              <rect x="5" y="11" width="5" height="3" fill={p.color} />
              <rect x="7" y="13" width="2" height="2" fill={p.color} />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 8 8">
              <rect x="3" y="0" width="2" height="8" fill={p.color} />
              <rect x="0" y="3" width="8" height="2" fill={p.color} />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default PixelConfetti;
