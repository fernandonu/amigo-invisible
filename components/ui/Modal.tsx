'use client';

import { ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose?: () => void;
  title?: string;
  children: ReactNode;
  maxWidth?: string;
}

function clsx(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function Modal({ open, onClose, title, children, maxWidth = 'max-w-md' }: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={clsx(
              'relative w-full bg-gradient-to-br from-gray-900 via-red-950/50 to-green-950/50',
              'border border-white/10 rounded-3xl shadow-2xl backdrop-blur-xl p-6',
              maxWidth
            )}
            onClick={e => e.stopPropagation()}
          >
            {(title || onClose) && (
              <div className="flex items-center justify-between mb-4">
                {title && <h2 className="text-xl font-bold text-white">{title}</h2>}
                {onClose && (
                  <button
                    onClick={onClose}
                    className="text-white/50 hover:text-white transition-colors ml-auto"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
