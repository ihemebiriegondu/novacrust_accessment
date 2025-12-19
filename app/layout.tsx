import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "NovaCrust assessment",
  description: "Frontend Developer Take-Home Assessment (React / Next.js)"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} antialiased`}
      >
        <main className="font-outfit">
          <div className="min-h-screen bg-gray-950 flex items-center justify-center p-2 sm:p-6">
            <div className="w-full max-w-2xl mx-auto">
              <div className="bg-white rounded-3xl shadow-lg px-4 sm:px-8 py-6 md:px-16 md:py-10">
                {children}
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
