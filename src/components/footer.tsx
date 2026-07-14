"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Twitter, Github, Linkedin, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Integrations", href: "#" },
    { label: "Changelog", href: "#" },
    { label: "Documentation", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press Kit", href: "#" },
    { label: "Partners", href: "#" },
  ],
  Resources: [
    { label: "Community", href: "#" },
    { label: "Help Center", href: "#" },
    { label: "Templates", href: "#" },
    { label: "Webinars", href: "#" },
    { label: "API Reference", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Security", href: "#" },
    { label: "GDPR", href: "#" },
    { label: "Status", href: "#" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <motion.a
              href="#"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 font-heading text-xl font-bold"
            >
              <motion.span
                whileHover={{ rotate: 15 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white"
              >
                <Zap className="h-5 w-5" />
              </motion.span>
              ApexFlow
            </motion.a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              The modern workflow automation platform for teams that refuse to
              settle.
            </p>

            <div className="mt-6">
              <p className="text-sm font-semibold mb-3">
                Subscribe to our newsletter
              </p>
              <AnimatePresence mode="wait">
                {subscribed ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="flex items-center gap-2 text-sm text-primary font-medium"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 500, damping: 15 }}
                    >
                      <Check className="h-4 w-4" />
                    </motion.span>
                    Thanks for subscribing!
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex gap-2 max-w-sm"
                  >
                    <motion.div
                      className="flex-1 relative"
                      animate={{
                        boxShadow: inputFocused
                          ? "0 0 0 3px hsl(187 62% 35% / 0.15)"
                          : "0 0 0 0px transparent",
                      }}
                      transition={{ duration: 0.2 }}
                      style={{ borderRadius: "12px" }}
                    >
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setInputFocused(true)}
                        onBlur={() => setInputFocused(false)}
                        placeholder="you@company.com"
                        required
                        className="flex h-10 w-full rounded-xl border border-border bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                        aria-label="Email address"
                      />
                    </motion.div>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05, boxShadow: "0 4px 20px -4px hsl(187 62% 35% / 0.35)" }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white"
                      aria-label="Subscribe"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-6 flex gap-3">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {Object.entries(footerLinks).map(([category, links], catIdx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.08, duration: 0.4 }}
            >
              <h3 className="font-heading text-sm font-semibold">{category}</h3>
              <motion.ul
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-4 space-y-2.5"
              >
                {links.map((link) => (
                  <motion.li key={link.label} variants={staggerItem}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-border py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} ApexFlow, Inc. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Made with precision for teams that ship.
          </p>
        </div>
      </div>
    </footer>
  );
}
