import type { Participant, Assignment } from '@/types';

function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function isValidDerangement(original: Participant[], shuffled: Participant[]): boolean {
  return shuffled.every((p, i) => p.id !== original[i].id);
}

export function generateAssignments(participants: Participant[]): Assignment[] {
  if (participants.length < 3) {
    throw new Error('Se necesitan al menos 3 participantes para realizar el sorteo.');
  }

  const maxAttempts = 1000;
  let attempts = 0;
  let receivers: Participant[];

  do {
    receivers = shuffleArray(participants);
    attempts++;
    if (attempts >= maxAttempts) {
      throw new Error('No se pudo generar un sorteo válido. Por favor, intente nuevamente.');
    }
  } while (!isValidDerangement(participants, receivers));

  return participants.map((giver, i) => ({
    giver,
    receiver: receivers[i],
  }));
}
