import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Jost } from "next/font/google";
import Script from "next/script";
import { FaHouse, FaNewspaper, FaUsers } from "react-icons/fa6";
import "./globals.css";

// If loading a variable font, you don't need to specify the font weight
const jost = Jost({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RUET Materials Club",
  description: "Learning. Linking. Leading.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(jost.className, "flex min-h-svh flex-col")}>
        <Header
          navigationLinks={[
            { path: "/", name: "Home", icon: <FaHouse /> },
            { path: "/team", name: "Team", icon: <FaUsers /> },
            { path: "/posts", name: "Blog", icon: <FaNewspaper /> },
          ]}
        />
        {children}
        <Footer />
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="7a1c6141-d2f1-4eee-aceb-c0e2f57391e0"
        />
      </body>
    </html>
  );
}
