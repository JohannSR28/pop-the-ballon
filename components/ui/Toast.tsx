'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ToastProps {
  message: string;
  duration?: number;
}

export function Toast({ message, duration = 3000 }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(t);
  }, [duration]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={{ duration: 0.22 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-bg-surface border border-border-strong rounded-full px-4 py-2 font-display font-medium text-[13px] text-t1 whitespace-nowrap shadow-lg"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
