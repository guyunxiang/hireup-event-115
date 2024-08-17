import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HireUp - Web Developer Position",
  description: "Create a responsive FAQ (Frequently Asked Questions) page in Next.js that displays a list of questions and answers. The page should allow users to search through the questions, and each question should be able to expand or collapse to show or hide its answer. The entire solution must be implemented in a single file using Tailwind CSS for styling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
