"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How long does it take to get started?",
    answer:
      "Most teams are up and running within 30 minutes. Our guided onboarding walks you through connecting your first integration and building your initial workflow. No engineering resources required.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes. Every plan includes a 14-day free trial with full access to all features. No credit card required. If you need more time to evaluate, just reach out and we'll extend your trial.",
  },
  {
    question: "Can I switch plans after signing up?",
    answer:
      "Absolutely. You can upgrade or downgrade at any time from your dashboard. When upgrading, you'll be prorated for the remainder of your billing cycle. Downgrades take effect at the start of your next cycle.",
  },
  {
    question: "What integrations do you support?",
    answer:
      "We support 200+ integrations out of the box, including Slack, Jira, GitHub, Salesforce, HubSpot, AWS, GCP, and many more. We also offer a REST API and webhook support for custom integrations.",
  },
  {
    question: "How does ApexFlow handle security?",
    answer:
      "Security is foundational to our platform. We're SOC 2 Type II certified, use AES-256 encryption at rest and TLS 1.3 in transit, and offer SSO/SAML authentication on our Enterprise plan. All data is processed in region-specific data centers.",
  },
  {
    question: "What kind of support do you offer?",
    answer:
      "Starter plans include email support with 24-hour response times. Professional plans include priority support with 4-hour response times and live chat. Enterprise plans include a dedicated account manager and custom SLA.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes, there are no long-term contracts. You can cancel your subscription at any time from your billing settings. Your access continues until the end of your current billing period.",
  },
];

function FaqItem({ faq, index }: { faq: (typeof faqs)[number]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="border-b border-border last:border-0"
    >
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ x: 4 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-primary group"
        aria-expanded={open}
      >
        <span className="font-heading text-base font-semibold pr-4">
          {faq.question}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="shrink-0 text-muted-foreground group-hover:text-primary transition-colors"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </motion.button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <motion.p
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.05, duration: 0.25 }}
              className="pb-5 text-sm leading-relaxed text-muted-foreground"
            >
              {faq.answer}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Faq() {
  return (
    <section id="faq" className="py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-sm font-semibold uppercase tracking-wider text-primary"
          >
            FAQ
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Frequently asked questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            Can&apos;t find the answer you&apos;re looking for? Reach out to our
            support team.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-16 max-w-3xl rounded-2xl border border-border bg-card px-6 sm:px-8"
        >
          {faqs.map((faq, index) => (
            <FaqItem key={faq.question} faq={faq} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
