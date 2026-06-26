'use server';

import { Resend } from 'resend';
import { SecretSantaEmailHTML } from '@/emails/SecretSantaEmail';
import type { Assignment } from '@/types';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendResult {
  success: boolean;
  sent: number;
  errors: string[];
}

export async function sendSecretSantaEmails(
  assignments: Assignment[]
): Promise<SendResult> {
  const errors: string[] = [];
  let sent = 0;

  for (const assignment of assignments) {
    try {
      const html = SecretSantaEmailHTML({
        giverName: assignment.giver.name,
        receiverName: assignment.receiver.name,
        receiverAlias: assignment.receiver.alias,
      });

      await resend.emails.send({
        from: process.env.EMAIL_FROM ?? 'Amigo Invisible <onboarding@resend.dev>',
        to: assignment.giver.email,
        subject: '🎅 ¡Tu Amigo Invisible te espera! 🎁',
        html,
      });

      sent++;
      await new Promise(resolve => setTimeout(resolve, 200));
    } catch (error) {
      errors.push(
        `Error enviando a ${assignment.giver.name} (${assignment.giver.email}): ${
          error instanceof Error ? error.message : 'Error desconocido'
        }`
      );
    }
  }

  return { success: errors.length === 0, sent, errors };
}

export async function sendEmailsBatch(
  assignments: Assignment[],
  onProgress?: (sent: number, total: number, current: string) => void
): Promise<SendResult> {
  return sendSecretSantaEmails(assignments);
}
