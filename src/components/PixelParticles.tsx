import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  type: "heart" | "sparkle" | "dust";
}

const PixelParticles = ({ count = 20 }: { count?: number }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generated: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 8 + 6,
      duration: Math.random() * 15 + 15,
      delay: Math.random() * 20,
      type: (["heart", "sparkle", "dust"] as const)[Math.floor(Math.random() * 3)],
    }));
    setParticles(generated);
  }, [count]);

  const renderShape = (type: Particle["type"], size: number) => {
    if (type === "heart") {
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
          <rect x="3" y="1" width="3" height="3" fill="hsl(5, 35%, 60%)" opacity="0.5" />
          <rect x="9" y="1" width="3" height="3" fill="hsl(5, 35%, 60%)" opacity="0.5" />
          <rect x="1" y="3" width="3" height="3" fill="hsl(5, 35%, 60%)" opacity="0.5" />
          <rect x="5" y="3" width="5" height="3" fill="hsl(5, 35%, 60%)" opacity="0.5" />
          <rect x="11" y="3" width="3" height="3" fill="hsl(5, 35%, 60%)" opacity="0.5" />
          <rect x="1" y="5" width="13" height="3" fill="hsl(5, 35%, 60%)" opacity="0.4" />
          <rect x="3" y="8" width="9" height="3" fill="hsl(5, 35%, 60%)" opacity="0.3" />
          <rect x="5" y="11" width="5" height="3" fill="hsl(5, 35%, 60%)" opacity="0.2" />
          <rect x="7" y="13" width="2" height="2" fill="hsl(5, 35%, 60%)" opacity="0.15" />
        </svg>
      );
    }
    if (type === "sparkle") {
      return (
        <svg width={size} height={size} viewBox="0 0 8 8">
          <rect x="3" y="0" width="2" height="2" fill="hsl(32, 50%, 88%)" opacity="0.5" />
          <rect x="0" y="3" width="2" height="2" fill="hsl(32, 50%, 88%)" opacity="0.5" />
          <rect x="3" y="3" width="2" height="2" fill="hsl(32, 50%, 88%)" opacity="0.7" />
          <rect x="6" y="3" width="2" height="2" fill="hsl(32, 50%, 88%)" opacity="0.5" />
          <rect x="3" y="6" width="2" height="2" fill="hsl(32, 50%, 88%)" opacity="0.5" />
        </svg>
      );
    }
    return (
      <div
        className="rounded-full bg-love-beige"
        style={{ width: size * 0.4, height: size * 0.4, opacity: 0.3 }}
      />
    );
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            bottom: "-20px",
            animation: `float-particle ${p.duration}s linear ${p.delay}s infinite`,
          }}
        >
          {renderShape(p.type, p.size)}
        </div>
      ))}
    </div>
  );
};

export default PixelParticles;
