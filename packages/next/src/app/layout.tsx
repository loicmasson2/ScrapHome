import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { Inter } from "next/font/google";
import { type Metadata } from "next";
import { TopNav } from "./_components/topnav";
import { Toaster } from "~/components/ui/sonner";

export const metadata: Metadata = {
  title: "ScrapHome",
  description: "How to easily find a new home",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  return (
      <html lang="en">
        <body className={`font-sans ${inter.variable} dark`}>
          <div className={"grid h-screen grid-rows-[auto,1fr]"}>
            <TopNav />
            <main className={"overflow-y-scroll"}>{children}</main>
          </div>
          {modal}
          <div id="modal-root" />
          <Toaster />
        </body>
      </html>
  );
}
