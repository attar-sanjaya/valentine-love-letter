import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
}

const TouchHearts = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  const spawnHeart = useCallback((x: number, y: number) => {
    const newHearts: Heart[] = Array.from({ length: 3 }, (_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() - 0.5) * 40,
      y: y + (Math.random() - 0.5) * 40,
      size: 12 + Math.random() * 14,
      rotation: (Math.random() - 0.5) * 60,
    }));
    setHearts((prev) => [...prev, ...newHearts]);
  }, []);

  useEffect(() => {
    const handleTouch = (e: TouchEvent) => {
      for (let i = 0; i < e.changedTouches.length; i++) {
        const touch = e.changedTouches[i];
        spawnHeart(touch.clientX, touch.clientY);
      }
    };
    const handleClick = (e: MouseEvent) => {
      spawnHeart(e.clientX, e.clientY);
    };

    window.addEventListener("touchstart", handleTouch, { passive: true });
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("touchstart", handleTouch);
      window.removeEventListener("click", handleClick);
    };
  }, [spawnHeart]);

  const removeHeart = useCallback((id: number) => {
    setHearts((prev) => prev.filter((h) => h.id !== id));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute"
            style={{ left: heart.x, top: heart.y }}
            initial={{ opacity: 1, scale: 0, y: 0, rotate: heart.rotation }}
            animate={{ opacity: 0, scale: 1, y: -80, rotate: heart.rotation + 20 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            onAnimationComplete={() => removeHeart(heart.id)}
          >
            <svg
              width={heart.size}
              height={heart.size}
              viewBox="0 0 16 16"
              fill="none"
            >
              <rect x="3" y="1" width="3" height="3" fill="hsl(5, 35%, 60%)" />
              <rect x="9" y="1" width="3" height="3" fill="hsl(5, 35%, 60%)" />
              <rect x="1" y="3" width="3" height="3" fill="hsl(5, 35%, 60%)" />
              <rect x="5" y="3" width="5" height="3" fill="hsl(0, 85%, 85%)" />
              <rect x="11" y="3" width="3" height="3" fill="hsl(5, 35%, 60%)" />
              <rect x="1" y="6" width="13" height="3" fill="hsl(5, 35%, 60%)" />
              <rect x="3" y="9" width="9" height="3" fill="hsl(5, 35%, 60%)" />
              <rect x="5" y="12" width="5" height="2" fill="hsl(5, 35%, 60%)" />
              <rect x="7" y="14" width="1" height="1" fill="hsl(5, 35%, 60%)" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TouchHearts;
