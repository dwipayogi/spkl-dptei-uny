import type { Metadata } from "next";
import { UserProvider } from "@/contexts/auth-context";

import { Poppins } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "SPKL DPTEI UNY",
  description: "Sistem Penjaminan Mutu Internal Laboratorium DPTEI UNY",
  keywords: ["laboratorium", "ISO/IEC 17025:2017", "DPTEI", "UNY", "assessment"],
  authors: [{ name: "DPTEI UNY" }],
  viewport: "width=device-width, initial-scale=1",
};

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  fallback: ["system-ui", "arial"],
  preload: true,
  adjustFontFallback: true,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${poppins.variable} antialiased scroll-smooth`}
      >
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
