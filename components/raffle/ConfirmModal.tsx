'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Gift } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

interface ConfirmModalProps {
  open: boolean;
  participantCount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({ open, participantCount, onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <Modal open={open} onClose={onCancel}>
      <div className="text-center">
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
          className="text-6xl mb-4"
        >
          🎁
        </motion.div>

        <h2 className="text-2xl font-bold text-white mb-2">
          ¿Realizar el sorteo?
        </h2>
        <p className="text-white/60 mb-6 text-sm leading-relaxed">
          Se enviará un email individual a cada uno de los{' '}
          <strong className="text-yellow-400">{participantCount} participantes</strong>{' '}
          con su Amigo Invisible asignado.
          <br />
          <span className="text-red-400/80 mt-2 block">Esta acción no se puede deshacer.</span>
        </p>

        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-6 flex items-start gap-3 text-left">
          <AlertTriangle size={16} className="text-yellow-400 mt-0.5 shrink-0" />
          <p className="text-yellow-200/80 text-xs leading-relaxed">
            Verificá que todos los emails sean correctos antes de continuar.
            Una vez enviados, no podrás recuperar los resultados del sorteo.
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="ghost" onClick={onCancel} className="flex-1">
            Cancelar
          </Button>
          <Button
            variant="christmas"
            onClick={onConfirm}
            icon={<Gift size={18} />}
            className="flex-1"
          >
            ¡Realizar sorteo!
          </Button>
        </div>
      </div>
    </Modal>
  );
}
