import type { Metadata } from "next";
import "./globals.css";

import "@fontsource-variable/montserrat";
export const metadata: Metadata = {
  title: "Weather App",
  description: "3D weather app created with react-three-fibre.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`$ antialiased h-screen`}>{children}</body>
    </html>
  );
}
