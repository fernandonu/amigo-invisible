import type { Participant } from '@/types';

export function exportToCSV(participants: Participant[]): void {
  const headers = ['Nombre', 'Alias', 'Email'];
  const rows = participants.map(p => [
    `"${p.name.replace(/"/g, '""')}"`,
    `"${p.alias.replace(/"/g, '""')}"`,
    `"${p.email.replace(/"/g, '""')}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob(['﻿' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'participantes-amigo-invisible.csv';
  link.click();
  URL.revokeObjectURL(url);
}

export function parseCSV(content: string): Omit<Participant, 'id'>[] {
  const lines = content.split('\n').filter(l => l.trim());
  const startIndex = lines[0].toLowerCase().includes('nombre') ? 1 : 0;

  return lines.slice(startIndex).map(line => {
    const cols = line.split(',').map(c => c.trim().replace(/^"|"$/g, ''));
    return {
      name: cols[0] ?? '',
      alias: cols[1] ?? '',
      email: cols[2] ?? '',
    };
  }).filter(p => p.name && p.email);
}
