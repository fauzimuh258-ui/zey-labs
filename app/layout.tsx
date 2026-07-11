import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Zey Labs',
  description: 'Code Hosting & Intelligent Web Hosting Deployment Orchestrator',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: '#000000',
          color: '#00ff00',
          fontFamily: 'monospace',
        }}
      >
        {children}
      </body>
    </html>
  );
}
