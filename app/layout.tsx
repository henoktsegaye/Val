import "./globals.css";

export const metadata = {
  title: "Happy Valentine 💖",
  description: "A small memory replay",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}