import type { Metadata } from "next";
import "./globals.css";

import "@fontsource-variable/montserrat";
export const metadata: Metadata = {
  title: "Weather",
  description: "3D weather app made with react.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`$ antialiased`}>{children}</body>
    </html>
  );
}
