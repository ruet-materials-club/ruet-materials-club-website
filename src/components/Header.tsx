"use client";

import IconMinified from "@/images/logo-3d.webp";
import { cn } from "@/lib/utils";
import { Divide as Hamburger } from "hamburger-react";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Icon = dynamic(() => import("./Icon"), {
  loading: () => <Image src={IconMinified} alt="Icon" className="px-16" />,
});
const MotionImage = motion(Image);

export default function Header({
  navigationLinks,
}: {
  navigationLinks: { path: string; name: string }[];
}) {
  const pathname = usePathname();
  const [isOpen, setOpen] = useState(false);
  const isFullPage = pathname === "/";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header>
      <div
        className={cn(
          "relative flex items-center gap-4 py-4 [@media(max-height:40rem)]:gap-0",
          isFullPage
            ? "min-h-svh flex-col justify-center text-center"
            : "container m-auto px-4",
        )}
      >
        <div className={cn("relative", isFullPage ? "w-full" : "w-auto")}>
          {isFullPage ? (
            <>
              <Icon />
              <motion.div
                layout
                layoutId="icon"
                className="absolute top-0 left-1/2 m-auto aspect-square -translate-x-1/2"
                style={{ width: "min(480px, calc(100% - 8rem), 40vh)" }}
              ></motion.div>
            </>
          ) : (
            <MotionImage
              layout
              layoutId="icon"
              src={IconMinified}
              alt="Icon"
              className="h-12 w-auto"
            />
          )}
        </div>
        <motion.h1
          layout
          className={
            isFullPage
              ? "text-3xl font-bold md:text-6xl [@media(max-height:40rem)]:text-xl"
              : "text-xl"
          }
        >
          RUET Materials Club
        </motion.h1>
        {isFullPage && (
          <motion.div
            key="motto"
            className={
              isFullPage
                ? "text-xl md:text-3xl [@media(max-height:40rem)]:text-lg"
                : "hidden"
            }
          >
            Learning. Linking. Leading.
          </motion.div>
        )}

        {!isFullPage && (
          <div className="ms-auto md:hidden">
            <Hamburger toggled={isOpen} toggle={setOpen} size={24} rounded />
          </div>
        )}
        <motion.nav
          layout
          className={cn(
            "flex gap-4 rounded-3xl",
            isFullPage ? "absolute bottom-4" : "ms-auto",
            isFullPage || isOpen || "max-md:hidden",
            isFullPage ||
              "top-full right-4 left-4 max-md:absolute max-md:flex-col max-md:border max-md:bg-blue-500/5 max-md:p-2 max-md:backdrop-blur-[2px]",
          )}
        >
          {navigationLinks.map((x) => (
            <Link
              key={x.path}
              href={x.path}
              className={cn(
                "rounded-2xl border-solid px-4 py-2 text-lg",
                isFullPage
                  ? "border shadow backdrop-blur-[1px]"
                  : "md:border md:shadow md:backdrop-blur-[1px]",
                pathname === x.path || isFullPage || "max-md:bg-transparent",
                pathname === x.path
                  ? "border-b-2 border-b-blue-500/50 bg-blue-500/15"
                  : "border-blue-500/10 bg-blue-500/5 hover:bg-blue-500/15",
              )}
            >
              {x.name}
            </Link>
          ))}
        </motion.nav>
      </div>
    </header>
  );
}
