import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StyleSoul",
  description: "Find your colours and shape, and get three pieces picked for you each week.",
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
