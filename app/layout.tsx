import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '🎅 Amigo Invisible - Organizá tu sorteo',
  description: 'La forma más divertida y fácil de organizar tu sorteo de Amigo Invisible',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
        <Toaster
          theme="dark"
          toastOptions={{
            style: {
              background: 'rgba(20, 10, 10, 0.9)',
              border: '1px solid rgba(255, 215, 0, 0.2)',
              color: 'white',
              backdropFilter: 'blur(10px)',
            },
          }}
        />
      </body>
    </html>
  );
}
