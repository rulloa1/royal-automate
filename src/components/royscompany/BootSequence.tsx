import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence = ({ onComplete }: BootSequenceProps) => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const messages = [
    "// Loading neural networks...",
    "Systems Online",
    "AI Core Active",
    "Pipeline Ready",
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    if (progress >= 25 && currentMessage < 1) setCurrentMessage(1);
    if (progress >= 50 && currentMessage < 2) setCurrentMessage(2);
    if (progress >= 75 && currentMessage < 3) setCurrentMessage(3);
    if (progress >= 100 && !isComplete) {
      setTimeout(() => {
        setIsComplete(true);
        setTimeout(onComplete, 500);
      }, 300);
    }
  }, [progress, currentMessage, isComplete, onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
        >
          <div className="text-center space-y-8">
            {/* Logo */}
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-4xl md:text-6xl tracking-wider text-foreground"
            >
              ROYSCOMPANY
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-primary font-mono text-sm tracking-widest"
            >
              Initializing Quantum Engine
            </motion.p>

            {/* Progress Bar */}
            <div className="w-64 mx-auto">
              <div className="flex justify-between text-xs text-muted-foreground mb-2 font-mono">
                <span>System Boot</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>

            {/* Status Messages */}
            <div className="h-24 flex flex-col items-center justify-center">
              {messages.slice(0, currentMessage + 1).map((msg, index) => (
                <motion.p
                  key={msg}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: index === currentMessage ? 1 : 0.5, y: 0 }}
                  className={`font-mono text-sm ${
                    index === currentMessage
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {msg}
                </motion.p>
              ))}
            </div>

            {/* Neural Automation Protocol */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: progress > 80 ? 1 : 0 }}
              className="text-xs text-muted-foreground font-mono tracking-widest"
            >
              Neural Automation Protocol
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootSequence;
