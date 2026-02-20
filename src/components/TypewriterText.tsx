import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
  renderText?: (displayed: string) => React.ReactNode;
}

const TypewriterText = ({ text, speed = 35, onComplete, className = "", renderText: customRender }: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, text, speed, onComplete, isComplete]);

  const renderText = (content: string) => {
    return content.split("\n").map((line, i) => (
      <span key={i}>
        {line}
        {i < content.split("\n").length - 1 && <br />}
      </span>
    ));
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <span>{customRender ? customRender(displayedText) : renderText(displayedText)}</span>
      {!isComplete && (
        <span
          className="inline-block w-[2px] h-[1.1em] ml-1 align-text-bottom"
          style={{
            backgroundColor: "hsl(25, 30%, 30%)",
            animation: "blink-caret 0.8s step-end infinite",
          }}
        />
      )}
    </motion.div>
  );
};

export default TypewriterText;
