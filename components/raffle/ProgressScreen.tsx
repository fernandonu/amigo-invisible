'use client';

import { motion } from 'framer-motion';
import type { SendProgress } from '@/types';

interface ProgressScreenProps {
  progress: SendProgress;
}

export function ProgressScreen({ progress }: ProgressScreenProps) {
  const percent = progress.total > 0 ? Math.round((progress.sent / progress.total) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
    >
      <div className="bg-gradient-to-br from-gray-900 via-red-950/30 to-green-950/30 border border-white/10 rounded-3xl p-10 max-w-sm w-full mx-4 text-center shadow-2xl">
        {/* Spinner */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 border-4 border-yellow-400/20 border-t-yellow-400 rounded-full"
          />
          <div className="absolute inset-0 flex items-center justify-center text-4xl">
            📧
          </div>
        </div>

        <h3 className="text-white font-bold text-xl mb-2">Enviando emails...</h3>

        <p className="text-white/50 text-sm mb-6">
          {progress.current && `Enviando a: ${progress.current}`}
        </p>

        {/* Progress bar */}
        <div className="bg-white/10 rounded-full h-3 overflow-hidden mb-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-green-500 to-yellow-400 rounded-full"
          />
        </div>

        <p className="text-yellow-400 font-bold text-lg">
          {progress.sent} de {progress.total}
        </p>
        <p className="text-white/40 text-sm mt-1">{percent}% completado</p>
      </div>
    </motion.div>
  );
}
