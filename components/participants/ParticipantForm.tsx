'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { UserPlus, User, AtSign, Mail, X } from 'lucide-react';
import { participantSchema, type ParticipantFormData } from '@/utils/validation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import type { Participant } from '@/types';

interface ParticipantFormProps {
  onSubmit: (data: ParticipantFormData, editingId?: string) => { success: boolean; error?: string };
  editingParticipant?: Participant | null;
  onCancelEdit?: () => void;
}

export function ParticipantForm({ onSubmit, editingParticipant, onCancelEdit }: ParticipantFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ParticipantFormData>({
    resolver: zodResolver(participantSchema),
  });

  useEffect(() => {
    if (editingParticipant) {
      reset({
        name: editingParticipant.name,
        alias: editingParticipant.alias,
        email: editingParticipant.email,
      });
    } else {
      reset({ name: '', alias: '', email: '' });
    }
  }, [editingParticipant, reset]);

  const handleFormSubmit = (data: ParticipantFormData) => {
    const result = onSubmit(data, editingParticipant?.id);
    if (result.success) {
      reset({ name: '', alias: '', email: '' });
      if (onCancelEdit) onCancelEdit();
    } else if (result.error) {
      if (result.error.toLowerCase().includes('email')) {
        setError('email', { message: result.error });
      } else if (result.error.toLowerCase().includes('alias')) {
        setError('alias', { message: result.error });
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl"
    >
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          {editingParticipant ? (
            <>✏️ Editar participante</>
          ) : (
            <>🎄 Agregar participante</>
          )}
        </h2>
        {editingParticipant && onCancelEdit && (
          <button onClick={onCancelEdit} className="text-white/50 hover:text-white">
            <X size={18} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Nombre completo"
            placeholder="Juan Pérez"
            icon={<User size={16} />}
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            label="Alias"
            placeholder="juancho"
            icon={<AtSign size={16} />}
            error={errors.alias?.message}
            {...register('alias')}
          />
          <Input
            label="Email"
            type="email"
            placeholder="juan@ejemplo.com"
            icon={<Mail size={16} />}
            error={errors.email?.message}
            {...register('email')}
          />
        </div>

        <div className="flex gap-3">
          <Button
            type="submit"
            variant="christmas"
            loading={isSubmitting}
            icon={<UserPlus size={18} />}
            className="flex-1 md:flex-none"
          >
            {editingParticipant ? 'Guardar cambios' : 'Agregar participante'}
          </Button>
          {editingParticipant && onCancelEdit && (
            <Button type="button" variant="ghost" onClick={onCancelEdit}>
              Cancelar
            </Button>
          )}
        </div>
      </form>
    </motion.div>
  );
}
