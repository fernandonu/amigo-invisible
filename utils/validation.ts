import { z } from 'zod';

export const participantSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(100),
  alias: z.string().min(2, 'El alias debe tener al menos 2 caracteres').max(50),
  email: z.string().email('Email inválido').max(200),
});

export type ParticipantFormData = z.infer<typeof participantSchema>;
