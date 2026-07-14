"use client";

import { motion } from "framer-motion";

const logos = [
  { name: "Acme Corp" },
  { name: "Globex" },
  { name: "Initech" },
  { name: "Hooli" },
  { name: "Stark Industries" },
  { name: "Wayne Enterprises" },
];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function SocialProof() {
  return (
    <section className="border-y border-border bg-muted/30 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-sm font-medium text-muted-foreground mb-8"
        >
          Trusted by forward-thinking teams at
        </motion.p>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {logos.map((logo) => (
            <motion.div
              key={logo.name}
              variants={staggerItem}
              whileHover={{ scale: 1.08, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="flex items-center justify-center px-6 py-4 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default rounded-xl hover:bg-background/50"
            >
              <span className="font-heading text-lg font-bold text-foreground/80 whitespace-nowrap select-none">
                {logo.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Continuous marquee on larger screens */}
      <div className="hidden lg:block border-t border-border">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 py-5 w-max"
        >
          {[...logos, ...logos].map((logo, i) => (
            <span
              key={`${logo.name}-${i}`}
              className="font-heading text-base font-semibold text-muted-foreground/30 whitespace-nowrap select-none"
            >
              {logo.name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
