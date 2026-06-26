'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Pencil, Users, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { Participant } from '@/types';

interface ParticipantTableProps {
  participants: Participant[];
  onRemove: (id: string) => void;
  onEdit: (participant: Participant) => void;
  onReorder: (from: number, to: number) => void;
  onClearAll: () => void;
}

export function ParticipantTable({
  participants,
  onRemove,
  onEdit,
  onReorder,
  onClearAll,
}: ParticipantTableProps) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => setDragIndex(index);
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };
  const handleDrop = (index: number) => {
    if (dragIndex !== null && dragIndex !== index) {
      onReorder(dragIndex, index);
    }
    setDragIndex(null);
    setDragOverIndex(null);
  };
  const handleDragEnd = () => {
    setDragIndex(null);
    setDragOverIndex(null);
  };

  if (participants.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-12 text-center"
      >
        <div className="text-6xl mb-4">🎁</div>
        <p className="text-white/50 text-lg">No hay participantes aún.</p>
        <p className="text-white/30 text-sm mt-1">¡Agrega al menos 3 para realizar el sorteo!</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-2 text-white font-semibold">
          <Users size={18} className="text-yellow-400" />
          <span>Participantes</span>
          <span className="bg-yellow-400/20 text-yellow-400 text-xs px-2 py-0.5 rounded-full font-bold">
            {participants.length}
          </span>
        </div>
        {participants.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            icon={<Trash2 size={14} />}
            className="text-red-400/70 hover:text-red-400"
          >
            Limpiar todo
          </Button>
        )}
      </div>

      {/* Table header */}
      <div className="hidden md:grid grid-cols-12 gap-2 px-6 py-3 text-xs text-white/40 uppercase tracking-wider border-b border-white/5">
        <div className="col-span-1"></div>
        <div className="col-span-1">#</div>
        <div className="col-span-3">Nombre</div>
        <div className="col-span-3">Alias</div>
        <div className="col-span-3">Email</div>
        <div className="col-span-1 text-right">Acciones</div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-white/5">
        <AnimatePresence mode="popLayout">
          {participants.map((participant, index) => (
            <motion.div
              key={participant.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: 1,
                x: 0,
                backgroundColor: dragOverIndex === index ? 'rgba(255,215,0,0.1)' : 'transparent',
              }}
              exit={{ opacity: 0, x: 20, height: 0 }}
              transition={{ duration: 0.2 }}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={e => handleDragOver(e, index)}
              onDrop={() => handleDrop(index)}
              onDragEnd={handleDragEnd}
              className="grid grid-cols-12 gap-2 px-6 py-4 items-center hover:bg-white/5 transition-colors cursor-default"
            >
              <div className="col-span-1 cursor-grab active:cursor-grabbing text-white/20 hover:text-white/50">
                <GripVertical size={16} />
              </div>
              <div className="col-span-1 text-white/30 text-sm font-mono">{index + 1}</div>
              <div className="col-span-3">
                <span className="text-white font-medium text-sm">{participant.name}</span>
              </div>
              <div className="col-span-3">
                <span className="text-yellow-400/80 text-sm">@{participant.alias}</span>
              </div>
              <div className="col-span-3">
                <span className="text-white/50 text-sm truncate block">{participant.email}</span>
              </div>
              <div className="col-span-1 flex justify-end gap-1">
                <button
                  onClick={() => onEdit(participant)}
                  className="p-1.5 rounded-lg text-blue-400/60 hover:text-blue-400 hover:bg-blue-400/10 transition-all"
                  title="Editar"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => onRemove(participant.id)}
                  className="p-1.5 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-400/10 transition-all"
                  title="Eliminar"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer */}
      {participants.length < 3 && (
        <div className="px-6 py-3 border-t border-white/5 bg-yellow-500/5">
          <p className="text-yellow-400/70 text-xs text-center">
            ⚠️ Necesitás al menos 3 participantes para realizar el sorteo
            {' '}({3 - participants.length} más {3 - participants.length === 1 ? 'restante' : 'restantes'})
          </p>
        </div>
      )}
    </motion.div>
  );
}
