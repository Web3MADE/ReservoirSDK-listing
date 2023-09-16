import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Web3Context } from "./context/Web3Context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Context>{children}</Web3Context>
      </body>
    </html>
  );
}
