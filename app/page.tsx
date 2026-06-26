'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { toast } from 'sonner';

import { SnowEffect } from '@/components/christmas/SnowEffect';
import { ChristmasLights } from '@/components/christmas/ChristmasLights';
import { ParticipantForm } from '@/components/participants/ParticipantForm';
import { ParticipantTable } from '@/components/participants/ParticipantTable';
import { CSVControls } from '@/components/participants/CSVControls';
import { RaffleButton } from '@/components/raffle/RaffleButton';
import { ConfirmModal } from '@/components/raffle/ConfirmModal';
import { ProgressScreen } from '@/components/raffle/ProgressScreen';
import { SuccessScreen } from '@/components/raffle/SuccessScreen';
import { Button } from '@/components/ui/Button';

import { useParticipants } from '@/hooks/useParticipants';
import { useSound } from '@/hooks/useSound';
import { generateAssignments } from '@/lib/raffle';
import { sendSecretSantaEmails } from '@/app/actions/sendEmails';
import type { Participant, RaffleStatus, SendProgress } from '@/types';
import type { ParticipantFormData } from '@/utils/validation';

export default function HomePage() {
  const {
    participants,
    isLoaded,
    addParticipant,
    removeParticipant,
    clearAll,
    importParticipants,
    reorderParticipants,
  } = useParticipants();

  const { soundEnabled, toggleSound, playJingle, playSuccess } = useSound();
  const [editingParticipant, setEditingParticipant] = useState<Participant | null>(null);
  const [raffleStatus, setRaffleStatus] = useState<RaffleStatus>('idle');
  const [progress, setProgress] = useState<SendProgress>({ sent: 0, total: 0, current: '' });
  const [sentCount, setSentCount] = useState(0);

  const handleAddParticipant = useCallback(
    (data: ParticipantFormData, editingId?: string) => {
      const result = addParticipant(data, editingId);
      if (result.success) {
        toast.success(editingId ? '✏️ Participante actualizado' : '🎄 Participante agregado');
      } else if (result.error) {
        toast.error(result.error);
      }
      return result;
    },
    [addParticipant]
  );

  const handleRemove = useCallback(
    (id: string) => {
      removeParticipant(id);
      toast.info('🗑️ Participante eliminado');
    },
    [removeParticipant]
  );

  const handleClearAll = useCallback(() => {
    if (participants.length === 0) return;
    if (confirm(`¿Eliminar los ${participants.length} participantes?`)) {
      clearAll();
      toast.info('🗑️ Lista limpiada');
    }
  }, [participants.length, clearAll]);

  const handleImport = useCallback(
    (data: Omit<Participant, 'id'>[]) => {
      const count = importParticipants(data);
      if (count > 0) {
        toast.success(`📂 ${count} participantes importados`);
      } else {
        toast.info('No se importaron nuevos participantes (posibles duplicados)');
      }
      return count;
    },
    [importParticipants]
  );

  const handleRaffleConfirm = useCallback(async () => {
    setRaffleStatus('sending');
    playJingle();

    try {
      const assignments = generateAssignments(participants);

      setProgress({ sent: 0, total: assignments.length, current: '' });

      // Show progress while sending
      for (let i = 0; i < assignments.length; i++) {
        setProgress({
          sent: i,
          total: assignments.length,
          current: assignments[i].giver.name,
        });
      }

      const result = await sendSecretSantaEmails(assignments);

      setSentCount(result.sent);
      clearAll();
      setRaffleStatus('success');
      playSuccess();

      if (result.errors.length > 0) {
        toast.error(`${result.errors.length} emails fallaron. Revisá la consola.`);
        console.error('Email errors:', result.errors);
      }
    } catch (error) {
      setRaffleStatus('idle');
      toast.error(
        error instanceof Error ? error.message : 'Error al realizar el sorteo'
      );
    }
  }, [participants, clearAll, playJingle, playSuccess]);

  const handleReset = useCallback(() => {
    setRaffleStatus('idle');
    setSentCount(0);
    setProgress({ sent: 0, total: 0, current: '' });
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white/50 text-lg">🎄 Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background:
            'linear-gradient(135deg, #0d1b2a 0%, #1a0505 20%, #051a05 40%, #1a0505 60%, #0a0a2a 80%, #0d1b2a 100%)',
        }}
      />

      {/* Fixed decorative stars */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-200"
            style={{
              left: `${(i * 37 + 11) % 100}%`,
              top: `${(i * 53 + 7) % 100}%`,
              fontSize: `${(i % 5) * 2 + 8}px`,
            }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.1, 0.8] }}
            transition={{
              duration: 2 + (i % 3),
              delay: (i % 4) * 0.75,
              repeat: Infinity,
            }}
          >
            ★
          </motion.div>
        ))}
      </div>

      <SnowEffect />
      <ChristmasLights />

      {/* Main content */}
      <div className="relative z-10 min-h-screen">
        {/* Top bar */}
        <div className="fixed top-16 right-4 z-20 flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSound}
            icon={soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            className="text-white/50 hover:text-white"
          />
        </div>

        {/* Hero section */}
        <section className="pt-24 pb-12 px-4 text-center">
          {/* GIFs + título: fila en desktop, columna en mobile */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8">

            {/* GIF izquierdo — espejado */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="shrink-0 order-2 sm:order-1 hidden sm:block"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-red-900/60 to-transparent z-10 pointer-events-none" />
                <img
                  src="/bailando.gif"
                  alt=""
                  className="w-24 sm:w-28 md:w-36 rounded-2xl shadow-2xl shadow-red-900/50 border border-white/10"
                  style={{ transform: 'scaleX(-1)' }}
                />
              </div>
            </motion.div>

            {/* Título central */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="flex-1 max-w-xl order-1 sm:order-2"
            >
              <motion.div
                animate={{ rotate: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="text-6xl md:text-7xl mb-4 inline-block"
              >
                🎅
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-black text-white mb-3 tracking-tight">
                <span
                  style={{
                    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 30px rgba(255,215,0,0.5))',
                  }}
                >
                  Amigo Invisible
                </span>
              </h1>

              <p className="text-white/60 text-xl md:text-2xl font-light">
                Sorteo sin fraude 🎯
              </p>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mx-auto mt-6 h-px max-w-xs"
                style={{ background: 'linear-gradient(90deg, transparent, #FFD700, transparent)' }}
              />
            </motion.div>

            {/* GIF derecho */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="shrink-0 order-3"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-green-900/60 to-transparent z-10 pointer-events-none" />
                <img
                  src="/bailando.gif"
                  alt=""
                  className="w-24 sm:w-28 md:w-36 rounded-2xl shadow-2xl shadow-green-900/50 border border-white/10"
                />
              </div>
            </motion.div>
          </div>

          {/* Floating emojis */}
          <div className="flex justify-center gap-4 mt-6">
            {['🎄', '⭐', '🎁', '🔔', '❄️'].map((emoji, i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 2, delay: i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                className="text-2xl md:text-3xl cursor-default select-none"
              >
                {emoji}
              </motion.span>
            ))}
          </div>
        </section>

        {/* Main content area */}
        <main className="max-w-5xl mx-auto px-4 pb-20 space-y-8">
          {/* Participant form */}
          <ParticipantForm
            onSubmit={handleAddParticipant}
            editingParticipant={editingParticipant}
            onCancelEdit={() => setEditingParticipant(null)}
          />

          {/* CSV controls */}
          <div className="flex justify-end">
            <CSVControls participants={participants} onImport={handleImport} />
          </div>

          {/* Participant table */}
          <ParticipantTable
            participants={participants}
            onRemove={handleRemove}
            onEdit={setEditingParticipant}
            onReorder={reorderParticipants}
            onClearAll={handleClearAll}
          />

          {/* Raffle button */}
          <AnimatePresence>
            {participants.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="flex justify-center pt-4"
              >
                <RaffleButton
                  onClick={() => setRaffleStatus('confirm')}
                  disabled={participants.length < 3}
                  participantCount={participants.length}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Modals */}
      <ConfirmModal
        open={raffleStatus === 'confirm'}
        participantCount={participants.length}
        onConfirm={handleRaffleConfirm}
        onCancel={() => setRaffleStatus('idle')}
      />

      {raffleStatus === 'sending' && <ProgressScreen progress={progress} />}
      {raffleStatus === 'success' && (
        <SuccessScreen sentCount={sentCount} onReset={handleReset} />
      )}
    </div>
  );
}
