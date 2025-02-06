import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Custom App",
  description: "Welcome to my custom Next.js app",
  openGraph: {
    title: "My Custom App",
    description: "Welcome to my custom Next.js app",
  },
  icons: {
    icon: "/local.png", // Favicon or custom app icon
  },
};







export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body>

        {children}
      </body>
    </html>
  </ClerkProvider>

  );
}