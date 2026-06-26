'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ConfettiEffect } from '@/components/christmas/ConfettiEffect';

interface SuccessScreenProps {
  sentCount: number;
  onReset: () => void;
}

export function SuccessScreen({ sentCount, onReset }: SuccessScreenProps) {
  return (
    <>
      <ConfettiEffect active={true} duration={8000} />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
      >
        <div className="bg-gradient-to-br from-gray-900 via-green-950/40 to-red-950/40 border border-white/10 rounded-3xl p-10 max-w-md w-full text-center shadow-2xl">
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-7xl mb-4"
          >
            🎉
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-bold text-white mb-3"
          >
            ¡Sorteo completado!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-white/60 mb-2"
          >
            Todos los participantes fueron notificados.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-green-500/20 border border-green-500/30 rounded-2xl p-4 mb-6"
          >
            <p className="text-green-400 font-bold text-2xl">{sentCount}</p>
            <p className="text-green-300/70 text-sm">emails enviados exitosamente 🎄</p>
          </motion.div>

          <div className="text-3xl mb-6 space-x-2">
            {['🎄', '🎅', '⭐', '🎁', '🎄'].map((emoji, i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity }}
                className="inline-block"
              >
                {emoji}
              </motion.span>
            ))}
          </div>

          <Button
            variant="christmas"
            size="lg"
            onClick={onReset}
            className="w-full"
          >
            🎊 Organizar otro sorteo
          </Button>
        </div>
      </motion.div>
    </>
  );
}
