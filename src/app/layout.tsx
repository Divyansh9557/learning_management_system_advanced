import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Toaster} from "react-hot-toast"
import { TRPCReactProvider } from "@/trpc/client";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Learning Management App",
  description: "This make the learniing process smooth ",
  icons:{
    icon:"/favicon.svg"
  }
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NuqsAdapter>

    <TRPCReactProvider>
      
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-black antialiased`}
        >
      
        {children}
        <Toaster/>
        
      </body>
    </html>
  </TRPCReactProvider>
          </NuqsAdapter>
  );
}
