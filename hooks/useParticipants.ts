'use client';

import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { Participant } from '@/types';
import type { ParticipantFormData } from '@/utils/validation';

function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function useParticipants() {
  const [participants, setParticipants, isLoaded] = useLocalStorage<Participant[]>(
    'amigo-invisible-participants',
    []
  );

  const addParticipant = useCallback(
    (data: ParticipantFormData, editingId?: string): { success: boolean; error?: string } => {
      const emailLower = data.email.toLowerCase();
      const aliasLower = data.alias.toLowerCase();

      const duplicateEmail = participants.find(
        p => p.email.toLowerCase() === emailLower && p.id !== editingId
      );
      if (duplicateEmail) return { success: false, error: 'Ya existe un participante con ese email.' };

      const duplicateAlias = participants.find(
        p => p.alias.toLowerCase() === aliasLower && p.id !== editingId
      );
      if (duplicateAlias) return { success: false, error: 'Ya existe un participante con ese alias.' };

      if (editingId) {
        setParticipants(prev =>
          prev.map(p => p.id === editingId ? { ...p, ...data } : p)
        );
      } else {
        const newParticipant: Participant = { id: generateId(), ...data };
        setParticipants(prev => [...prev, newParticipant]);
      }

      return { success: true };
    },
    [participants, setParticipants]
  );

  const removeParticipant = useCallback(
    (id: string) => {
      setParticipants(prev => prev.filter(p => p.id !== id));
    },
    [setParticipants]
  );

  const clearAll = useCallback(() => {
    setParticipants([]);
  }, [setParticipants]);

  const importParticipants = useCallback(
    (newParticipants: Omit<Participant, 'id'>[]): number => {
      let imported = 0;
      const toAdd: Participant[] = [];

      for (const p of newParticipants) {
        const emailLower = p.email.toLowerCase();
        const aliasLower = p.alias.toLowerCase();
        const exists = participants.some(
          ep => ep.email.toLowerCase() === emailLower || ep.alias.toLowerCase() === aliasLower
        );
        if (!exists) {
          toAdd.push({ id: generateId(), ...p });
          imported++;
        }
      }

      if (toAdd.length > 0) {
        setParticipants(prev => [...prev, ...toAdd]);
      }
      return imported;
    },
    [participants, setParticipants]
  );

  const reorderParticipants = useCallback(
    (from: number, to: number) => {
      setParticipants(prev => {
        const result = [...prev];
        const [removed] = result.splice(from, 1);
        result.splice(to, 0, removed);
        return result;
      });
    },
    [setParticipants]
  );

  return {
    participants,
    isLoaded,
    addParticipant,
    removeParticipant,
    clearAll,
    importParticipants,
    reorderParticipants,
  };
}
