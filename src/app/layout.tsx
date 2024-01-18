import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ["latin"], weight: "400" });


export const metadata: Metadata = {
  title: "Good First Issues",
  description: "Find latest good first issues.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-gradient-to-br dark:bg-gradient-to-bl">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
