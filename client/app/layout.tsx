import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Team Building",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased pt-2 pl-2 pr-2`}
      >
        <h1 className="font-bold text-amber-700 text-3xl ml-7 mt-4">ACME</h1>
        <div className="font-bold text-4xl ml-7 mt-2">Team Building</div>
        {children}
      </body>
    </html>
  );
}
