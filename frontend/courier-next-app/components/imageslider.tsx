
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Package,
} from "lucide-react";

interface Slide {
  url: string;
}

type SlideArray = Slide[];

interface ImagesliderProps {
  slides: SlideArray;
  messages: string[];
}

const Imageslider: React.FC<ImagesliderProps> = ({
  slides,
  messages,
}) => {
  const [index, setIndex] = useState(0);

  const totalSlides = Math.min(slides.length, messages.length);

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (totalSlides <= 1) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    }, 6000);

    return () => clearInterval(timer);
  }, [totalSlides]);

  if (totalSlides === 0) return null;

  return (
    <section className="relative flex h-full min-h-[380px] w-full
      overflow-hidden bg-slate-950 sm:min-h-[480px] lg:min-h-[750px]">

      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.img
          key={slides[index].url}
          src={slides[index].url}
          alt={`NextCourier delivery service - slide ${index + 1}`}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r
        from-slate-950/90 via-slate-950/55 to-slate-950/10" />

      <div className="absolute inset-0 bg-gradient-to-t
        from-slate-950/50 via-transparent to-slate-950/10" />

      {/* Hero Content */}
      <div className="relative z-10 flex w-full flex-col
        justify-between px-6 py-8 sm:px-10 sm:py-12
        lg:px-16 lg:py-16">

        <div className="flex items-center gap-2 text-white">

          <div className="flex h-10 w-10 items-center justify-center
            rounded-xl bg-blue-600 shadow-lg shadow-blue-600/30">
            <Package size={22} />
          </div>

          <div>
            <h2 className="text-lg font-extrabold tracking-wide">
              NextCourier
            </h2>
            <p className="text-[10px] uppercase tracking-[0.2em]
              text-blue-200">
              Delivering Excellence
            </p>
          </div>

        </div>

        {/* Main Text */}
        <div className="max-w-2xl pb-8">

          <motion.div
            key={`tag-${index}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-flex items-center gap-2
              rounded-full border border-white/20
              bg-white/10 px-4 py-2 backdrop-blur-md"
          >
            <ShieldCheck size={15} className="text-blue-300" />

            <span className="text-xs font-semibold tracking-wide
              text-white sm:text-sm">
              Your Trusted Delivery Partner
            </span>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
            >

              <h1 className="text-4xl font-extrabold leading-[1.15]
                tracking-tight text-white
                sm:text-5xl lg:text-6xl xl:text-7xl">

                {messages[index].split("\n").map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}

              </h1>

              <p className="mt-5 max-w-lg text-sm leading-7
                text-slate-200 sm:text-base lg:text-lg">

                Fast, secure, and reliable courier services.
                We make sending and receiving parcels easier
                across Bangladesh.

              </p>

            </motion.div>
          </AnimatePresence>

          {/* Slider Controls */}
          <div className="mt-9 flex items-center gap-5">

            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous slide"
              className="flex h-11 w-11 items-center
                justify-center rounded-full border
                border-white/30 bg-white/10 text-white
                backdrop-blur-md transition-all
                hover:border-blue-500 hover:bg-blue-600"
            >
              <ArrowLeft size={19} />
            </button>

            <div className="flex items-center gap-2">

              {Array.from({ length: totalSlides }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={index === i ? "true" : undefined}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all
                    duration-300 ${index === i
                      ? "w-9 bg-blue-500"
                      : "w-2 bg-white/50 hover:bg-white"
                    }`}
                />
              ))}

            </div>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next slide"
              className="flex h-11 w-11 items-center
                justify-center rounded-full border
                border-white/30 bg-white/10 text-white
                backdrop-blur-md transition-all
                hover:border-blue-500 hover:bg-blue-600"
            >
              <ArrowRight size={19} />
            </button>

          </div>

          {/* Slide Counter */}
          <p className="mt-5 text-xs font-medium
            tracking-widest text-white/60">
            0{index + 1} / 0{totalSlides}
          </p>

        </div>

      </div>

    </section>
  );
};

export default Imageslider;
