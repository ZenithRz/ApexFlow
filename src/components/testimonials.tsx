"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "VP of Engineering",
    company: "Cloudscale",
    quote:
      "ApexFlow cut our deployment pipeline from 45 minutes to under 5. It's the single most impactful tool we've adopted this year.",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "Head of Operations",
    company: "Meridian Health",
    quote:
      "We automated 200+ manual processes in the first quarter. The ROI was visible within weeks, not months.",
    rating: 5,
  },
  {
    name: "Emily Watson",
    role: "CTO",
    company: "NovaBridge",
    quote:
      "The visual workflow builder is incredible. Our non-technical team members are building automations without any engineering support.",
    rating: 5,
  },
  {
    name: "David Park",
    role: "Engineering Lead",
    company: "Stratify",
    quote:
      "We evaluated six platforms before choosing ApexFlow. The integration ecosystem and reliability made it a clear winner.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Director of Product",
    company: "FinEdge",
    quote:
      "Our cross-functional workflows finally have a single source of truth. Communication overhead dropped by 40%.",
    rating: 5,
  },
  {
    name: "Alex Mitchell",
    role: "Founder & CEO",
    company: "Launchpad Labs",
    quote:
      "As a startup, we needed enterprise-grade automation without the enterprise price tag. ApexFlow delivered exactly that.",
    rating: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0, rotate: -30 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: i * 0.08,
            type: "spring",
            stiffness: 400,
            damping: 12,
          }}
        >
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        </motion.div>
      ))}
    </div>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", damping: 20, stiffness: 100 },
  },
};

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-20 sm:py-28 lg:py-32 bg-muted/30"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-sm font-semibold uppercase tracking-wider text-primary"
          >
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Loved by teams worldwide
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            See what our customers have to say about transforming their workflows
            with ApexFlow.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              variants={cardVariants}
              whileHover={{
                y: -4,
                boxShadow: "0 16px 40px -10px hsl(187 62% 35% / 0.08)",
              }}
              className="group rounded-2xl border border-border bg-card p-7 transition-colors duration-300 hover:border-primary/20 cursor-default"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Quote className="h-8 w-8 text-primary/20 transition-colors duration-300 group-hover:text-primary/40" />
              </motion.div>
              <div className="mt-2">
                <StarRating count={testimonial.rating} />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-heading text-sm font-bold text-primary select-none"
                >
                  {testimonial.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </motion.div>
                <div>
                  <p className="text-sm font-semibold">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
