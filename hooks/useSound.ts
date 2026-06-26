'use client';

import { useCallback, useRef, useState } from 'react';

export function useSound() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioCtxRef.current;
  }, []);

  const playJingle = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      const notes = [523, 659, 784, 1047, 784, 659, 523];
      let time = ctx.currentTime;
      notes.forEach(freq => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = freq;
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.3, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.3);
        osc.start(time);
        osc.stop(time + 0.3);
        time += 0.15;
      });
    } catch (e) {
      // Silently fail if audio is not available
    }
  }, [soundEnabled, getAudioContext]);

  const playSuccess = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      const notes = [523, 659, 784, 1047];
      let time = ctx.currentTime;
      notes.forEach(freq => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = freq;
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.4, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.5);
        osc.start(time);
        osc.stop(time + 0.5);
        time += 0.2;
      });
    } catch (e) {}
  }, [soundEnabled, getAudioContext]);

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => !prev);
  }, []);

  return { soundEnabled, toggleSound, playJingle, playSuccess };
}
