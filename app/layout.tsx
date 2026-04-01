import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Calm Access | Login',
  description: 'Tela de login com layout organizado, fundo suave e interacoes uteis.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body suppressHydrationWarning className="antialiased">
        {children}
      </body>
    </html>
  );
}
