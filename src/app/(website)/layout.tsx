import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Jost } from "next/font/google";
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
      </body>
    </html>
  );
}
