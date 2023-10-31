import "./globals.css";
import "@/styles/index.scss";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import AuthProvider from "./Provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Panel - Panda",
  description: "Panda Admin Panel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white d-flex`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
