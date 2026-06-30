import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Onest } from 'next/font/google';
// src/app/layout.tsx
import './globals.css';
import { ToasterProvider } from './providers/toaster';

const onest = Onest({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'SCF AI - Smart Credit Financing AI Platform',
    template: '%s | SCF AI',
  },
  description:
    'SCF AI - Smart Credit Financing with federated learning and explainable AI. Privacy-preserving credit scoring, real-time risk intelligence, and automated supply chain financing for Ethiopian businesses.',
  keywords: 'SCF AI, credit scoring, federated learning, explainable AI, supply chain financing, Ethiopia, fintech, risk intelligence',
  authors: [{ name: 'SCF AI Team' }],
  openGraph: {
    title: 'SCF AI - Smart Credit Financing Intelligence',
    description: 'Privacy-preserving federated learning and explainable AI for credit scoring and supply chain financing.',
    type: 'website',
    url: 'https://www.scf.et',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`bg-gray-50 dark:bg-dark-secondary min-h-screen flex flex-col ${onest.className}`}
      >
        <ThemeProvider disableTransitionOnChange>
          {/* ToasterProvider must render before the children components */}
          {/* https://github.com/emilkowalski/sonner/issues/168#issuecomment-1773734618 */}
          <ToasterProvider />

          <div className="isolate flex flex-col flex-1">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}