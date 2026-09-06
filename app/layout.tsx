import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";

const serif = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});
const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sacred India",
  description:
    "Discover 85+ sacred sites across 7 major faiths. Remote puja, AI guide, and crowd intelligence.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} h-full antialiased`}>
      <body className="min-h-screen flex flex-col bg-[#F8F3EA] [font-family:var(--font-sans)]">
        <Navigation>{children}</Navigation>
      </body>
    </html>
  );
}
