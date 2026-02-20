import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import photo1 from "@/assets/photos/photo1.jpg";
import photo2 from "@/assets/photos/photo2.jpg";
import photo3 from "@/assets/photos/photo3.jpg";
import photo4 from "@/assets/photos/photo4.jpg";
import photo5 from "@/assets/photos/photo5.jpg";
import photo6 from "@/assets/photos/photo6.jpg";
import photo7 from "@/assets/photos/photo7.jpg";
import photo8 from "@/assets/photos/photo8.jpg";
import photo9 from "@/assets/photos/photo9.jpg";
import photo10 from "@/assets/photos/photo10.jpg";
import photo11 from "@/assets/photos/photo11.jpg";
import photo12 from "@/assets/photos/photo12.jpg";
import photo13 from "@/assets/photos/photo13.jpg";
import photo14 from "@/assets/photos/photo14.jpg";

interface PhotoItem {
  src: string;
  alt: string;
}

const photos: PhotoItem[] = [
  { src: photo1, alt: "Memory #1" },
  { src: photo2, alt: "Memory #2" },
  { src: photo3, alt: "Memory #3" },
  { src: photo4, alt: "Memory #4" },
  { src: photo5, alt: "Memory #5" },
  { src: photo6, alt: "Memory #6" },
  { src: photo7, alt: "Memory #7" },
  { src: photo8, alt: "Memory #8" },
  { src: photo9, alt: "Memory #9" },
  { src: photo10, alt: "Memory #10" },
  { src: photo11, alt: "Memory #11" },
  { src: photo12, alt: "Memory #12" },
  { src: photo13, alt: "Memory #13" },
  { src: photo14, alt: "Memory #14" },
];

const PixelPhotoFrame = ({
  photo,
  index,
  onClick,
}: {
  photo: PhotoItem;
  index: number;
  onClick: () => void;
}) => {
  const tilts = [-2, 1, -1, 2, 0, -1.5, 1.5, -0.5, 2, -2, 1, -1, 0.5, -1.5];
  const tilt = tilts[index % tilts.length];

  return (
    <motion.div
      className="polaroid-frame cursor-pointer active:scale-95 transition-transform"
      style={{ transform: `rotate(${tilt}deg)` }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      viewport={{ once: true }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <div className="aspect-[3/4] bg-love-pink/50 rounded-sm flex items-center justify-center relative overflow-hidden">
        {photo.src ? (
          <img
            src={photo.src}
            alt={photo.alt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <svg width="48" height="48" viewBox="0 0 48 48" className="opacity-30">
            <rect x="4" y="4" width="40" height="32" fill="none" stroke="hsl(25, 30%, 50%)" strokeWidth="2" />
            <rect x="6" y="6" width="36" height="28" fill="none" stroke="hsl(25, 30%, 50%)" strokeWidth="1" />
            <polygon points="8,30 18,16 28,30" fill="hsl(100, 14%, 55%)" opacity="0.5" />
            <polygon points="20,30 30,18 40,30" fill="hsl(100, 14%, 45%)" opacity="0.5" />
            <circle cx="34" cy="14" r="4" fill="hsl(32, 50%, 70%)" opacity="0.5" />
            <rect x="20" y="38" width="3" height="3" fill="hsl(5, 35%, 60%)" opacity="0.5" />
            <rect x="25" y="38" width="3" height="3" fill="hsl(5, 35%, 60%)" opacity="0.5" />
            <rect x="18" y="40" width="12" height="3" fill="hsl(5, 35%, 60%)" opacity="0.5" />
            <rect x="20" y="43" width="8" height="2" fill="hsl(5, 35%, 60%)" opacity="0.5" />
            <rect x="22" y="45" width="4" height="2" fill="hsl(5, 35%, 60%)" opacity="0.5" />
          </svg>
        )}
      </div>
      <p className="font-pixel text-[6px] text-center text-love-cocoa/70 mt-1 truncate">
        memory #{index + 1}
      </p>
    </motion.div>
  );
};

// Lightbox component
const PhotoLightbox = ({
  photo,
  index,
  onClose,
}: {
  photo: PhotoItem;
  index: number;
  onClose: () => void;
}) => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="polaroid-lightbox bg-card p-3 pb-10 sm:p-4 sm:pb-14 rounded-sm shadow-2xl max-w-[90vw] max-h-[85vh] relative"
        initial={{ scale: 0.5, rotate: -5 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-hidden rounded-sm">
          {photo.src ? (
            <img
              src={photo.src}
              alt={photo.alt}
              className="max-w-full max-h-[70vh] object-contain"
            />
          ) : (
            <div className="w-64 h-80 sm:w-80 sm:h-96 bg-love-pink/50 flex items-center justify-center">
              <span className="font-pixel text-[8px] text-love-cocoa/50">
                photo coming soon
              </span>
            </div>
          )}
        </div>
        <p className="font-pixel text-[7px] sm:text-[8px] text-center text-love-cocoa/80 mt-2 absolute bottom-3 left-0 right-0">
          memory #{index + 1} 💕
        </p>

        {/* Close button */}
        <button
          className="absolute -top-3 -right-3 w-8 h-8 bg-love-rose text-white rounded-full flex items-center justify-center font-pixel text-[8px] shadow-lg active:scale-90 transition-transform"
          onClick={onClose}
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  );
};

const PhotoGallery = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openPhoto = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const closePhoto = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  return (
    <>
      <motion.section
        className="w-full max-w-4xl mx-auto px-3 sm:px-4 mt-8 sm:mt-12 mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Section title */}
        <motion.div
          className="text-center mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-pixel text-xs sm:text-sm md:text-base text-love-rose mb-2">
            ✿ Our Memories ✿
          </h2>
          <div className="flex justify-center gap-1">
            {[...Array(7)].map((_, i) => (
              <svg key={i} width="8" height="8" viewBox="0 0 8 8">
                <rect x="2" y="0" width="2" height="2" fill="hsl(5, 35%, 60%)" opacity="0.4" />
                <rect x="0" y="2" width="2" height="2" fill="hsl(5, 35%, 60%)" opacity="0.4" />
                <rect x="4" y="2" width="2" height="2" fill="hsl(5, 35%, 60%)" opacity="0.4" />
                <rect x="2" y="4" width="2" height="2" fill="hsl(5, 35%, 60%)" opacity="0.4" />
              </svg>
            ))}
          </div>
        </motion.div>

        {/* Photo grid - optimized for mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {photos.map((photo, i) => (
            <div
              key={i}
              className={
                i === 0 || i === 5 || i === 10
                  ? "sm:row-span-2"
                  : ""
              }
            >
              <PixelPhotoFrame
                photo={photo}
                index={i}
                onClick={() => openPhoto(i)}
              />
            </div>
          ))}
        </div>
      </motion.section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <PhotoLightbox
            photo={photos[selectedIndex]}
            index={selectedIndex}
            onClose={closePhoto}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default PhotoGallery;
