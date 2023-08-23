import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mercado Pago | De ahora en adelante, hacés más con tu dinero.',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
