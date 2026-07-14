"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMagnetic } from "@/hooks/use-magnetic";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

const mobileMenuVariants = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: { type: "spring", damping: 30, stiffness: 300 } },
  exit: { x: "100%", transition: { duration: 0.2, ease: "easeIn" } },
};

const mobileOverlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
};

const staggerItem = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", damping: 25, stiffness: 200 } },
};

function NavLink({ label, href }: { label: string; href: string }) {
  return (
    <a href={href} className="group relative py-1">
      <span className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
        {label}
      </span>
      <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full" />
    </a>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const logoMagnetic = useMagnetic<HTMLAnchorElement>({ strength: 0.15 });

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.1 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16 lg:h-18">
          <motion.a
            href="#"
            ref={logoMagnetic.ref}
            style={{ x: logoMagnetic.x, y: logoMagnetic.y }}
            onMouseMove={logoMagnetic.handleMouseMove}
            onMouseLeave={logoMagnetic.handleMouseLeave}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 font-heading text-xl font-bold text-foreground"
          >
            <motion.span
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white"
            >
              <Zap className="h-5 w-5" />
            </motion.span>
            ApexFlow
          </motion.a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Log in
            </a>
            <motion.a
              href="#pricing"
              whileHover={{ scale: 1.03, boxShadow: "0 8px 30px -4px hsl(187 62% 35% / 0.3)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="inline-flex h-10 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-white transition-colors"
            >
              Start Free Trial
            </motion.a>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl text-foreground hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </motion.button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              variants={mobileOverlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed right-0 top-0 bottom-0 z-50 w-80 max-w-[85vw] bg-background border-l border-border p-6 lg:hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <a href="#" className="flex items-center gap-2 font-heading text-xl font-bold">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
                    <Zap className="h-5 w-5" />
                  </span>
                  ApexFlow
                </a>
                <motion.button
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-foreground hover:bg-muted transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-1"
              >
                {navLinks.map((link) => (
                  <motion.a
                    key={link.href}
                    variants={staggerItem}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    whileTap={{ scale: 0.97 }}
                    className="rounded-xl px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, type: "spring", damping: 25 }}
                className="mt-8 flex flex-col gap-3"
              >
                <a
                  href="#pricing"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-border px-5 text-sm font-semibold transition-colors hover:bg-muted"
                >
                  Log in
                </a>
                <a
                  href="#pricing"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-white transition-all hover:bg-primary/90"
                >
                  Start Free Trial
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
