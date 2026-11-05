
"use client";

import React from "react";
import { motion } from "framer-motion";

import {
  Gauge,
  ShieldCheck,
  ThumbsUp,
  MapPin,
  BadgeDollarSign,
  Truck,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Gauge,
    title: "Fast Solutions",
    description:
      "Our professional team ensures quick and efficient delivery solutions for all your shipping needs.",
    number: "01",
  },
  {
    icon: ShieldCheck,
    title: "Secure Handling",
    description:
      "Every package is handled with care and attention to ensure a safe and reliable delivery experience.",
    number: "02",
  },
  {
    icon: ThumbsUp,
    title: "Client Satisfaction",
    description:
      "Your satisfaction comes first. We work hard to make every delivery experience exceptional.",
    number: "03",
  },
  {
    icon: MapPin,
    title: "Nationwide Coverage",
    description:
      "From major cities to remote areas, we provide courier services throughout Bangladesh.",
    number: "04",
  },
  {
    icon: BadgeDollarSign,
    title: "Affordable Rates",
    description:
      "Get dependable courier services at competitive prices without compromising on quality.",
    number: "05",
  },
  {
    icon: Truck,
    title: "Easy Pickup & Delivery",
    description:
      "Enjoy convenient parcel pickup and delivery services designed around your schedule.",
    number: "06",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const Choice: React.FC = () => {
  return (
    <section
      id="choose"
      className="relative isolate w-full overflow-hidden
        bg-slate-50 px-5 py-20
        dark:bg-slate-950
        sm:px-8 sm:py-24
        lg:px-12 lg:py-28"
    >

      {/* Background Decorations */}
      <div className="pointer-events-none absolute -right-40
        -top-40 -z-10 h-[450px] w-[450px]
        rounded-full bg-blue-400/10 blur-[100px]" />

      <div className="pointer-events-none absolute -bottom-40
        -left-40 -z-10 h-[450px] w-[450px]
        rounded-full bg-indigo-400/10 blur-[100px]" />

      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto mb-14 max-w-3xl text-center
            sm:mb-16 lg:mb-20"
        >

          {/* Eyebrow */}
          <div className="mb-5 inline-flex items-center
            gap-2 rounded-full border border-blue-200
            bg-blue-50 px-4 py-2
            dark:border-blue-500/20
            dark:bg-blue-500/10"
          >
            <Sparkles size={15} className="text-blue-600
              dark:text-blue-400" />

            <span className="text-xs font-bold uppercase
              tracking-[0.18em] text-blue-700
              dark:text-blue-400">
              The NextCourier Advantage
            </span>

          </div>

          <h2 className="text-3xl font-extrabold
            leading-tight tracking-tight
            text-slate-900 dark:text-white
            sm:text-4xl lg:text-5xl">

            Why Choose{" "}
            <span className="bg-gradient-to-r
              from-blue-600 to-indigo-500
              bg-clip-text text-transparent">
              NextCourier?
            </span>

          </h2>

          <p className="mx-auto mt-5 max-w-2xl
            text-sm leading-7 text-slate-500
            dark:text-slate-400
            sm:text-base">

            We go beyond delivering packages.
            We deliver trust, convenience, and peace of mind
            with every shipment.

          </p>

        </motion.div>

        {/* Feature Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-5
            sm:grid-cols-2
            lg:grid-cols-3 lg:gap-6"
        >

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <motion.article
                key={feature.number}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.25 },
                }}
                className="group relative flex min-h-[260px]
                  flex-col overflow-hidden rounded-2xl
                  border border-slate-200/80 bg-white
                  p-7 shadow-sm
                  transition-colors duration-300
                  hover:border-blue-200
                  hover:shadow-xl hover:shadow-blue-500/5
                  dark:border-slate-800
                  dark:bg-slate-900
                  dark:hover:border-blue-500/40
                  dark:hover:shadow-blue-500/5
                  sm:p-8"
              >

                {/* Decorative Number */}
                <span className="absolute right-6 top-5
                  text-5xl font-black tracking-tighter
                  text-slate-100 transition-colors
                  duration-300
                  group-hover:text-blue-50
                  dark:text-slate-800
                  dark:group-hover:text-blue-500/10">

                  {feature.number}

                </span>

                {/* Icon */}
                <div className="relative mb-7 flex h-14 w-14
                  items-center justify-center rounded-2xl
                  bg-blue-50 text-blue-600
                  transition-all duration-300
                  group-hover:scale-110
                  group-hover:bg-blue-600
                  group-hover:text-white
                  group-hover:shadow-lg
                  group-hover:shadow-blue-500/25
                  dark:bg-blue-500/10
                  dark:text-blue-400
                  dark:group-hover:bg-blue-600
                  dark:group-hover:text-white"
                >

                  <Icon size={27} strokeWidth={1.8} />

                </div>

                {/* Title */}
                <h3 className="mb-3 text-xl font-bold
                  tracking-tight text-slate-900
                  transition-colors duration-300
                  group-hover:text-blue-600
                  dark:text-white
                  dark:group-hover:text-blue-400">

                  {feature.title}

                </h3>

                {/* Description */}
                <p className="flex-1 text-sm leading-7
                  text-slate-500
                  dark:text-slate-400">

                  {feature.description}

                </p>

                {/* Bottom Decoration */}
                <div className="mt-7 flex items-center
                  justify-between">

                  <div className="h-1 w-10 rounded-full
                    bg-blue-500 transition-all duration-500
                    group-hover:w-20" />

                  <ArrowUpRight
                    size={20}
                    className="text-slate-300
                      transition-all duration-300
                      group-hover:-translate-y-1
                      group-hover:translate-x-1
                      group-hover:text-blue-600
                      dark:text-slate-600
                      dark:group-hover:text-blue-400"
                  />

                </div>

              </motion.article>
            );
          })}

        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative mt-16 overflow-hidden
            rounded-3xl bg-gradient-to-r
            from-blue-700 via-blue-600 to-indigo-600
            px-6 py-12 text-center
            shadow-2xl shadow-blue-500/15
            sm:mt-20 sm:px-12 sm:py-16"
        >

          {/* Decorative Circles */}
          <div className="pointer-events-none absolute
            -right-16 -top-24 h-64 w-64
            rounded-full border-[35px] border-white/10" />

          <div className="pointer-events-none absolute
            -bottom-32 -left-16 h-64 w-64
            rounded-full border-[35px] border-white/10" />

          <div className="relative z-10">

            <h3 className="text-2xl font-extrabold
              tracking-tight text-white
              sm:text-3xl lg:text-4xl">

              Your Delivery. Our Responsibility.

            </h3>

            <p className="mx-auto mt-4 max-w-xl
              text-sm leading-7 text-blue-100
              sm:text-base">

              Let NextCourier take care of your deliveries
              with speed, security, and reliability.

            </p>

            <a
              href="#top"
              className="mt-8 inline-flex items-center
                gap-2 rounded-xl bg-white px-7 py-3.5
                text-sm font-bold text-blue-700
                shadow-lg transition-all duration-300
                hover:-translate-y-1 hover:bg-blue-50
                hover:shadow-xl"
            >

              Get Started

              <ArrowUpRight size={18} />

            </a>

          </div>

        </motion.div>

      </div>

    </section>
  );
};

export default Choice;
