import type { Metadata } from "next";
import "./globals.css";
import SessionProvider from "@/lib/SessionProvider";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/toaster";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

import { Navbar } from "@/components/navbar/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";

import {
  ChakraBaseProvider,
  extendBaseTheme,
  theme as chakraTheme,
} from "@chakra-ui/react";

const { Button } = chakraTheme.components;

const theme = extendBaseTheme({
  components: {
    Button,
  },
});
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body>
        {/* <Providers> */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider session={session}>
            <div className="flex justify-center align-center fixed top-80 left-80 right-80 bottom-80 place-self-center">
              <Toaster />
            </div>
            <div className="fixed w-[100%] z-10 mb-[100px]">
              <Navbar />
            </div>
            <div>{children}</div>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}