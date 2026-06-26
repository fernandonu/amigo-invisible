'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-white/80">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={clsx(
              'w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30',
              'focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50',
              'transition-all duration-200 backdrop-blur-sm',
              icon && 'pl-10',
              error && 'border-red-400/50 focus:ring-red-400/50',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="text-red-400 text-xs flex items-center gap-1">
            <span>⚠️</span> {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
