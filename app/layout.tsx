import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StyleSoul",
  description: "Your Personal Style Intelligence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
