'use client';

import { motion } from 'framer-motion';
import { Gift, AlertCircle } from 'lucide-react';

interface RaffleButtonProps {
  onClick: () => void;
  disabled: boolean;
  participantCount: number;
}

export function RaffleButton({ onClick, disabled, participantCount }: RaffleButtonProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <motion.button
        onClick={onClick}
        disabled={disabled}
        whileHover={!disabled ? { scale: 1.03, y: -2 } : {}}
        whileTap={!disabled ? { scale: 0.97 } : {}}
        className={`
          relative group w-full max-w-sm px-8 py-5 rounded-2xl font-bold text-xl
          transition-all duration-300 overflow-hidden
          ${disabled
            ? 'bg-white/5 border border-white/10 text-white/30 cursor-not-allowed'
            : 'bg-gradient-to-r from-red-700 via-red-600 to-red-700 border border-red-500/50 text-white shadow-2xl shadow-red-600/30 cursor-pointer'
          }
        `}
      >
        {!disabled && (
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          />
        )}
        <span className="relative flex items-center justify-center gap-3">
          <motion.span
            animate={!disabled ? { rotate: [0, -10, 10, -10, 0] } : {}}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            className="text-2xl"
          >
            🎁
          </motion.span>
          Realizar Sorteo
          <Gift size={20} />
        </span>
      </motion.button>

      {disabled && participantCount < 3 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-1.5 text-yellow-400/70 text-sm"
        >
          <AlertCircle size={14} />
          Necesitás {3 - participantCount} participante{3 - participantCount !== 1 ? 's' : ''} más
        </motion.p>
      )}
    </div>
  );
}
