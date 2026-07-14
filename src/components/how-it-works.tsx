"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Settings, Play, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Settings,
    title: "Connect your tools",
    description:
      "Link your existing apps and services in seconds. Our pre-built connectors handle the heavy lifting.",
  },
  {
    number: "02",
    icon: Play,
    title: "Build your flow",
    description:
      "Use the visual editor to design workflows with conditional logic, loops, and branching paths.",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Scale with confidence",
    description:
      "Deploy to production with built-in monitoring, automatic retries, and enterprise-grade reliability.",
  },
];

function ConnectingLine() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="hidden lg:block absolute top-24 left-[16.67%] right-[16.67%] h-0.5">
      <svg className="w-full h-full" preserveAspectRatio="none">
        <motion.line
          x1="0%"
          y1="50%"
          x2="100%"
          y2="50%"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary/30"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 lg:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-sm font-semibold uppercase tracking-wider text-primary"
          >
            How It Works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Up and running in three steps
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            No complicated onboarding. No steep learning curve. Just results.
          </motion.p>
        </div>

        <div className="mt-16 relative">
          <ConnectingLine />

          <div className="grid gap-12 lg:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.15,
                    type: "spring",
                    damping: 20,
                    stiffness: 100,
                  }}
                  whileHover={{ y: -4 }}
                  className="relative text-center group cursor-default"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.3 + index * 0.15,
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/25"
                  >
                    <Icon className="h-7 w-7" />
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.5 + index * 0.15,
                        type: "spring",
                        stiffness: 500,
                        damping: 15,
                      }}
                      className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-background border border-border text-xs font-bold text-foreground"
                    >
                      {step.number}
                    </motion.span>
                  </motion.div>
                  <h3 className="mt-6 font-heading text-xl font-semibold">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-xs mx-auto">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
