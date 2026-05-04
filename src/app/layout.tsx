import './globals.css';

export const metadata = {
  title: 'AI Token Profit Calculator',
  description: 'Calculate AI costs, revenue, and profit.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}