'use client';

import { useRef } from 'react';
import { Download, Upload } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { exportToCSV, parseCSV } from '@/lib/csvUtils';
import type { Participant } from '@/types';

interface CSVControlsProps {
  participants: Participant[];
  onImport: (data: Omit<Participant, 'id'>[]) => number;
}

export function CSVControls({ participants, onImport }: CSVControlsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = ev => {
      const content = ev.target?.result as string;
      const parsed = parseCSV(content);
      const imported = onImport(parsed);
      alert(`Se importaron ${imported} participantes.`);
    };
    reader.readAsText(file, 'UTF-8');
    e.target.value = '';
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="secondary"
        size="sm"
        icon={<Upload size={14} />}
        onClick={() => fileInputRef.current?.click()}
      >
        Importar CSV
      </Button>
      <Button
        variant="secondary"
        size="sm"
        icon={<Download size={14} />}
        onClick={() => exportToCSV(participants)}
        disabled={participants.length === 0}
      >
        Exportar CSV
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        className="hidden"
        onChange={handleImport}
      />
    </div>
  );
}
