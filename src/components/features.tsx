"use client";

import { motion } from "framer-motion";
import { useTilt } from "@/hooks/use-tilt";
import {
  Workflow,
  Zap,
  Shield,
  BarChart3,
  Globe,
  Bell,
} from "lucide-react";

const features = [
  {
    icon: Workflow,
    title: "Visual Workflow Builder",
    description:
      "Design complex automations with an intuitive drag-and-drop canvas. No code required.",
  },
  {
    icon: Zap,
    title: "Instant Triggers",
    description:
      "React to events in real-time with sub-second trigger latency across all integrations.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "SOC 2 compliant with end-to-end encryption, SSO, and granular role-based access controls.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Track every metric that matters with customizable dashboards and automated reporting.",
  },
  {
    icon: Globe,
    title: "200+ Integrations",
    description:
      "Connect your entire stack with native integrations for every major tool and platform.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description:
      "AI-powered alert routing ensures the right people see the right alerts at the right time.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", damping: 20, stiffness: 100 },
  },
};

function FeatureCard({ feature }: { feature: (typeof features)[number] }) {
  const tilt = useTilt({ intensity: 8 });
  const Icon = feature.icon;

  return (
    <motion.div
      ref={tilt.ref}
      onMouseMove={tilt.handleMouseMove}
      onMouseLeave={tilt.handleMouseLeave}
      variants={itemVariants}
      style={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{
        boxShadow: "0 20px 40px -12px hsl(187 62% 35% / 0.1)",
        borderColor: "hsl(187 62% 35% / 0.2)",
      }}
      className="group relative rounded-2xl border border-border bg-card p-7 transition-colors duration-300 cursor-default"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative">
        <motion.div
          whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/25"
        >
          <Icon className="h-6 w-6" />
        </motion.div>
        <h3 className="mt-5 font-heading text-lg font-semibold">
          {feature.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-sm font-semibold uppercase tracking-wider text-primary"
          >
            Features
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Everything you need to move faster
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            Powerful features designed for teams that refuse to settle for
            clunky, outdated tools.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          style={{ perspective: 1000 }}
        >
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
