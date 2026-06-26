export interface Participant {
  id: string;
  name: string;
  alias: string;
  email: string;
}

export interface Assignment {
  giver: Participant;
  receiver: Participant;
}

export type RaffleStatus = 'idle' | 'confirm' | 'animating' | 'sending' | 'success' | 'error';

export interface SendProgress {
  sent: number;
  total: number;
  current: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}
