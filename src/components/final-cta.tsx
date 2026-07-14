"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useMagnetic } from "@/hooks/use-magnetic";

function FloatingOrb({ className, duration = 7 }: { className?: string; duration?: number }) {
  return (
    <motion.div
      className={className}
      animate={{
        x: [0, 30, -20, 0],
        y: [0, -25, 15, 0],
        scale: [1, 1.1, 0.95, 1],
      }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export function FinalCta() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const orbX = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const primaryMagnetic = useMagnetic({ strength: 0.1 });
  const secondaryMagnetic = useMagnetic({ strength: 0.08 });

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
          className="relative overflow-hidden rounded-3xl bg-violet-950 px-6 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24 text-center"
        >
          <div className="absolute inset-0 -z-10">
            <FloatingOrb
              className="absolute top-0 left-1/4 h-[300px] w-[300px] rounded-full bg-primary/20 blur-3xl"
              duration={8}
            />
            <FloatingOrb
              className="absolute bottom-0 right-1/4 h-[200px] w-[200px] rounded-full bg-primary/10 blur-3xl"
              duration={10}
            />
            <motion.div
              style={{ x: orbX }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[250px] w-[250px] rounded-full bg-primary/5 blur-3xl"
            />
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mx-auto max-w-2xl font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Ready to transform how your team works?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mx-auto mt-5 max-w-xl text-base text-lavender-300/80 sm:text-lg"
          >
            Join thousands of teams already shipping faster with ApexFlow. Start
            your free trial today — no credit card required.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
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
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 0 40px 8px hsl(187 62% 35% / 0.3)",
                }}
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
                href="#"
                whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 px-7 text-sm font-semibold text-white w-full sm:w-auto"
              >
                Talk to Sales
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
