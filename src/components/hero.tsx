"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useMagnetic } from "@/hooks/use-magnetic";
import { useTilt } from "@/hooks/use-tilt";

const letterVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: i * 0.04, duration: 0.4, ease: [0.215, 0.61, 0.355, 1] },
  }),
};

function AnimatedHeadline({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  let globalIndex = 0;

  return (
    <span className={className}>
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-block mr-[0.3em]">
          {word.split("").map((char) => {
            const idx = globalIndex++;
            return (
              <motion.span
                key={idx}
                custom={idx}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block"
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </span>
  );
}

function FloatingOrb({ className, duration = 8 }: { className?: string; duration?: number }) {
  const y = useMotionValue(0);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className={className}
      animate={{ y: [0, -20, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const mockupY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const mockupRotateX = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const primaryMagnetic = useMagnetic({ strength: 0.12 });
  const secondaryMagnetic = useMagnetic({ strength: 0.08 });

  const mockupTilt = useTilt({ intensity: 5 });
  const mockupInview = useInView(mockupTilt.ref, { once: true });

  return (
    <section ref={sectionRef} className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32">
      <div className="absolute inset-0 -z-10">
        <FloatingOrb
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl"
          duration={10}
        />
        <FloatingOrb
          className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-teal-500/5 blur-3xl"
          duration={12}
        />
        <FloatingOrb
          className="absolute top-1/3 right-10 h-[200px] w-[200px] rounded-full bg-primary/3 blur-3xl"
          duration={9}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div style={{ opacity }} className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 15, stiffness: 200 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary ring-1 ring-primary/20">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              Now in Public Beta
            </span>
          </motion.div>

          <h1 className="mt-6 font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Ship workflows{" "}
            <span className="text-primary">
              <AnimatedHeadline text="ten times faster" />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
            className="mt-6 text-lg text-muted-foreground sm:text-xl"
          >
            ApexFlow unifies your team&apos;s processes, automations, and
            integrations into one intelligent platform — so you can focus on
            what moves the needle.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div
              ref={primaryMagnetic.ref}
              style={{ x: primaryMagnetic.x, y: primaryMagnetic.y }}
              onMouseMove={primaryMagnetic.handleMouseMove}
              onMouseLeave={primaryMagnetic.handleMouseLeave}
            >
              <motion.a
                href="#pricing"
                whileHover={{ scale: 1.04, boxShadow: "0 12px 40px -6px hsl(187 62% 35% / 0.35)" }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-7 text-sm font-semibold text-white w-full sm:w-auto group"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.a>
            </motion.div>
            <motion.div
              ref={secondaryMagnetic.ref}
              style={{ x: secondaryMagnetic.x, y: secondaryMagnetic.y }}
              onMouseMove={secondaryMagnetic.handleMouseMove}
              onMouseLeave={secondaryMagnetic.handleMouseLeave}
            >
              <motion.a
                href="#how-it-works"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="inline-flex h-12 items-center justify-center rounded-xl border border-border px-7 text-sm font-semibold text-foreground w-full sm:w-auto group"
              >
                <Play className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                Watch Demo
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
          style={{ y: mockupY, perspective: 1200 }}
          className="mt-16 lg:mt-20"
        >
          <motion.div
            ref={mockupTilt.ref}
            onMouseMove={mockupTilt.handleMouseMove}
            onMouseLeave={mockupTilt.handleMouseLeave}
            style={{
              rotateX: mockupTilt.rotateX,
              rotateY: mockupTilt.rotateY,
              transformStyle: "preserve-3d",
            }}
            whileHover={{ boxShadow: "0 25px 60px -15px hsl(187 62% 35% / 0.15)" }}
            className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-primary/5 transition-shadow duration-500"
          >
            <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
              <div className="flex gap-1.5">
                {["bg-red-400", "bg-yellow-400", "bg-green-400"].map((color, i) => (
                  <motion.span
                    key={color}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.05, type: "spring", stiffness: 500, damping: 15 }}
                    className={`h-3 w-3 rounded-full ${color}`}
                  />
                ))}
              </div>
              <div className="ml-4 flex-1">
                <div className="mx-auto flex h-7 max-w-md items-center rounded-lg bg-background px-3 text-xs text-muted-foreground ring-1 ring-border">
                  app.apexflow.com/dashboard
                </div>
              </div>
            </div>
            <div className="aspect-[16/9] bg-gradient-to-br from-violet-950 via-violet-900 to-violet-950 p-4 sm:p-8">
              <div className="grid h-full grid-cols-4 gap-4">
                <div className="col-span-1 hidden sm:block space-y-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + i * 0.06, duration: 0.3 }}
                      className="h-8 w-full rounded-lg bg-white/10"
                      style={{ width: `${60 + Math.random() * 40}%` }}
                    />
                  ))}
                </div>
                <div className="col-span-4 sm:col-span-3 flex flex-col gap-4">
                  <div className="flex gap-4">
                    {["bg-teal-500/30", "bg-primary/30", "bg-white/20"].map((color, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1 + i * 0.08, type: "spring", damping: 20 }}
                        className={`flex-1 rounded-xl bg-white/5 p-4 ${i === 2 ? "hidden md:block" : ""}`}
                      >
                        <div className="h-3 w-16 rounded bg-white/20 mb-2" />
                        <div className={`h-7 w-24 rounded ${color}`} />
                      </motion.div>
                    ))}
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3, type: "spring", damping: 20 }}
                    className="flex-1 rounded-xl bg-white/5 p-4"
                  >
                    <div className="h-4 w-32 rounded bg-white/20 mb-4" />
                    <div className="space-y-3">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.4 + i * 0.05 }}
                          className="flex items-center gap-3"
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1.5 + i * 0.05, type: "spring", stiffness: 500, damping: 15 }}
                            className="h-2 w-2 rounded-full bg-teal-500/60"
                          />
                          <div className="h-3 flex-1 rounded bg-white/10" />
                          <div className="h-3 w-16 rounded bg-white/10" />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
