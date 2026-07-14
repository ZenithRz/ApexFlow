"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTilt } from "@/hooks/use-tilt";

const plans = [
  {
    name: "Starter",
    monthlyPrice: 29,
    annualPrice: 24,
    description: "Perfect for small teams getting started with automation.",
    features: [
      "Up to 5 team members",
      "100 automated workflows",
      "1,000 monthly executions",
      "10 integrations",
      "Email support",
      "Basic analytics",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Professional",
    monthlyPrice: 79,
    annualPrice: 66,
    description: "For growing teams that need more power and flexibility.",
    features: [
      "Up to 25 team members",
      "Unlimited workflows",
      "25,000 monthly executions",
      "100+ integrations",
      "Priority support",
      "Advanced analytics & reporting",
      "Custom webhooks",
      "Team collaboration tools",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    monthlyPrice: 199,
    annualPrice: 166,
    description: "For organizations with advanced security and scale needs.",
    features: [
      "Unlimited team members",
      "Unlimited workflows",
      "Unlimited executions",
      "200+ integrations + custom",
      "Dedicated account manager",
      "SSO & SAML authentication",
      "Custom SLA & uptime guarantee",
      "On-premise deployment option",
      "Audit logs & compliance tools",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

function AnimatedPrice({ value }: { value: number }) {
  const motionVal = useMotionValue(value);
  const springVal = useSpring(motionVal, { stiffness: 100, damping: 20 });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    motionVal.set(value);
  }, [value, motionVal]);

  useEffect(() => {
    const unsubscribe = springVal.on("change", (v) => {
      setDisplay(Math.round(v));
    });
    return unsubscribe;
  }, [springVal]);

  return <span>{display}</span>;
}

function PlanCard({ plan, annual, index }: { plan: (typeof plans)[number]; annual: boolean; index: number }) {
  const tilt = useTilt({ intensity: plan.popular ? 6 : 4 });

  return (
    <motion.div
      ref={tilt.ref}
      onMouseMove={tilt.handleMouseMove}
      onMouseLeave={tilt.handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.1,
        type: "spring",
        damping: 20,
        stiffness: 100,
      }}
      style={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative rounded-2xl border bg-card p-8 transition-colors duration-300",
        plan.popular
          ? "border-primary shadow-xl shadow-primary/10 lg:scale-105 lg:z-10"
          : "border-border hover:border-primary/20"
      )}
    >
      {/* Popular floating animation */}
      {plan.popular && (
        <>
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center rounded-full bg-primary px-4 py-1 text-xs font-semibold text-white shadow-sm"
            >
              <span className="relative mr-1.5 flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              Most Popular
            </motion.span>
          </div>
          {/* Subtle glow behind popular card */}
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-primary/10 to-transparent -z-10" />
        </>
      )}

      <h3 className="font-heading text-lg font-semibold">{plan.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {plan.description}
      </p>

      <div className="mt-6 flex items-baseline gap-1">
        <span className="font-heading text-4xl font-bold tracking-tight">
          $<AnimatedPrice value={annual ? plan.annualPrice : plan.monthlyPrice} />
        </span>
        <span className="text-sm text-muted-foreground">/mo</span>
      </div>

      <motion.a
        href="#"
        whileHover={{
          scale: 1.02,
          boxShadow: plan.popular ? "0 8px 30px -6px hsl(187 62% 35% / 0.35)" : "0 4px 20px -4px hsl(267 37% 10% / 0.1)",
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={cn(
          "mt-8 flex h-11 w-full items-center justify-center rounded-xl text-sm font-semibold",
          plan.popular
            ? "bg-primary text-white hover:bg-primary/90"
            : "border border-border text-foreground hover:bg-muted"
        )}
      >
        {plan.cta}
      </motion.a>

      <ul className="mt-8 space-y-3">
        {plan.features.map((feature, fIdx) => (
          <motion.li
            key={feature}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + fIdx * 0.04, duration: 0.3 }}
            className="flex items-start gap-3"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + fIdx * 0.04, type: "spring", stiffness: 500, damping: 15 }}
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            </motion.div>
            <span className="text-sm text-muted-foreground">
              {feature}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-sm font-semibold uppercase tracking-wider text-primary"
          >
            Pricing
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Simple, transparent pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            Start free, scale as you grow. No hidden fees, no surprises.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-8 flex items-center justify-center gap-3"
          >
            <span
              className={cn(
                "text-sm font-medium transition-colors duration-300",
                !annual ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Monthly
            </span>
            <motion.button
              onClick={() => setAnnual(!annual)}
              className={cn(
                "relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300",
                annual ? "bg-primary" : "bg-muted"
              )}
              role="switch"
              aria-checked={annual}
              aria-label="Toggle annual billing"
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="pointer-events-none inline-block h-6 w-6 rounded-full bg-white shadow-lg ring-0"
                style={{ marginLeft: annual ? "auto" : 2, marginRight: annual ? 2 : "auto" }}
              />
            </motion.button>
            <span
              className={cn(
                "text-sm font-medium transition-colors duration-300",
                annual ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Annual
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={annual ? "savings" : "none"}
                initial={{ opacity: 0, scale: 0.8, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className={cn(
                  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-all",
                  annual
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {annual ? "Save 20%" : "Billed monthly"}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3 lg:gap-8 items-start">
          {plans.map((plan, index) => (
            <PlanCard key={plan.name} plan={plan} annual={annual} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
