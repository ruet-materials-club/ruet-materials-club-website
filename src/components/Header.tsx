"use client";

import IconMinified from "@/images/logo-3d.webp";
import { cn } from "@/lib/utils";
import { Divide as Hamburger } from "hamburger-react";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Icon = dynamic(() => import("./Icon"), {
  loading: () => <Image src={IconMinified} alt="Icon" className="px-16" />,
});
const MotionImage = motion.create(Image);

export default function Header({
  navigationLinks,
}: {
  navigationLinks: { path: string; name: string }[];
}) {
  const pathname = usePathname();
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const padRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [isBannerExpanded, setIsBannerExpanded] = useState(pathname === "/");
  const isBannerCollapsing = useRef(false);

  function collapseBanner() {
    isBannerCollapsing.current = true;
    return false;
  }

  useEffect(() => {
    setIsNavMenuOpen(false);
    if (pathname !== "/") return setIsBannerExpanded(false);
    const observer1 = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio < 0.99 && !isBannerCollapsing.current) {
          setIsBannerExpanded(collapseBanner);
        }
      },
      { threshold: [0.5, 0.75, 1] },
    );
    if (headerRef.current) observer1.observe(headerRef.current);
    const observer2 = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio > 0 && !isBannerCollapsing.current) {
          padRef.current?.style.removeProperty("height");
          window.scroll(0, 0);
          setIsBannerExpanded(true);
        }
      },
      { threshold: 0.1 },
    );
    if (padRef.current) observer2.observe(padRef.current);
  }, [pathname]);

  const linkClassName = cn(
    "rounded-2xl border-solid px-4 py-2 text-lg",
    isBannerExpanded
      ? "border shadow backdrop-blur-[1px]"
      : "md:border md:shadow md:backdrop-blur-[1px]",
  );

  return (
    <>
      {pathname === "/" && <div ref={padRef}></div>}
      <header
        ref={headerRef}
        className={cn(
          isBannerExpanded || "sticky top-0 z-10 bg-[var(--c1)] shadow-lg",
        )}
      >
        <div
          className={cn(
            "relative flex items-center gap-4 py-4 [@media(max-height:40rem)]:gap-0",
            isBannerExpanded
              ? "min-h-svh flex-col justify-center text-center"
              : "container m-auto px-4",
          )}
        >
          <div
            className={cn("relative", isBannerExpanded ? "w-full" : "w-auto")}
          >
            {isBannerExpanded ? (
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
              isBannerExpanded
                ? "text-3xl font-bold md:text-6xl [@media(max-height:40rem)]:text-xl"
                : "text-xl"
            }
            onLayoutAnimationComplete={() => {
              if (isBannerCollapsing.current && padRef.current) {
                padRef.current.style.height = `${window.innerHeight}px`;
                window.scroll(0, window.innerHeight);
                isBannerCollapsing.current = false;
              }
            }}
          >
            RUET Materials Club
          </motion.h1>
          {isBannerExpanded && (
            <motion.div
              key="motto"
              className={
                isBannerExpanded
                  ? "text-xl md:text-3xl [@media(max-height:40rem)]:text-lg"
                  : "hidden"
              }
            >
              Learning. Linking. Leading.
            </motion.div>
          )}

          {!isBannerExpanded && (
            <div className="ms-auto md:hidden">
              <Hamburger
                toggled={isNavMenuOpen}
                toggle={setIsNavMenuOpen}
                size={24}
                rounded
              />
            </div>
          )}
          <motion.nav
            layout
            className={cn(
              "flex gap-4 rounded-3xl",
              isBannerExpanded ? "absolute bottom-4" : "ms-auto",
              isBannerExpanded || isNavMenuOpen || "max-md:hidden",
              isBannerExpanded ||
                "top-full right-4 left-4 max-md:absolute max-md:flex-col max-md:border max-md:bg-blue-500/10 max-md:p-2 max-md:backdrop-blur-lg",
            )}
          >
            {navigationLinks.map((x) =>
              pathname === "/" && x.path === "/" ? (
                <button
                  className={cn(
                    linkClassName,
                    "cursor-pointer border-b-2 border-b-blue-500/50 bg-blue-500/15",
                  )}
                  key={x.path}
                  onClick={() => {
                    setIsBannerExpanded((x) => !x);
                    setIsNavMenuOpen(false);
                  }}
                >
                  {x.name}
                </button>
              ) : (
                <Link
                  key={x.path}
                  href={x.path}
                  className={cn(
                    linkClassName,
                    pathname === x.path ||
                      isBannerExpanded ||
                      "max-md:bg-transparent",
                    pathname === x.path
                      ? "border-b-2 border-b-blue-500/50 bg-blue-500/15"
                      : "border-blue-500/10 bg-blue-500/5 hover:bg-blue-500/15",
                  )}
                  onClick={() => {
                    if (padRef.current) padRef.current.style.display = "none";
                  }}
                >
                  {x.name}
                </Link>
              ),
            )}
          </motion.nav>
        </div>
      </header>
      {pathname === "/" && (
        <style>{`
          body {
            min-height: 200vh;
          }
        `}</style>
      )}
    </>
  );
}
