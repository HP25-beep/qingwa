import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/navbar/Navbar";
import MainWindow from "@/components/MainWindow";
import Player from "@/components/audio_player/Player";

import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import UserFSProvider from "@/providers/UserFSProvider";

// import getSongsByUserId from "@/actions/getSongsByUserId";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// const font = Figtree({subsets: ['latin']});

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Love Li",
  description: "Rewind the ephemeral",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const userSongs = await getSongsByUserId();
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToasterProvider />
        <UserProvider>
          <UserFSProvider>
            <ModalProvider />

            <Navbar />
            <MainWindow>
              {children}
            </MainWindow>
            {/* <Player /> */}

          </UserFSProvider>
        </UserProvider>
      </body>
    </html>
  );
}
