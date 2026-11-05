
"use client";

import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  ArrowUpRight,
  Truck,
} from "lucide-react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-slate-950 text-slate-300">

      {/* Main footer */}
      <div className="mx-auto max-w-[1440px] px-6 py-14 sm:px-10 lg:px-16 lg:py-16">

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">

          {/* Brand section */}
          <div className="flex flex-col items-start">
            <Link href="/" className="mb-5 inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20">
                <Truck size={25} className="text-white" />
              </div>

              <span className="text-2xl font-extrabold tracking-tight text-white">
                Next<span className="text-blue-500">Courier</span>
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-7 text-slate-400">
              Delivering your parcels safely, quickly, and reliably.
              We make every delivery a better experience.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Get our app
              </p>

              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get it on Google Play"
                className="inline-flex transition-transform hover:scale-105"
              >
                <Image
                  src="/google-play-badge.svg"
                  alt="Get it on Google Play"
                  width={145}
                  height={45}
                  className="h-auto w-36 object-contain"
                />
              </a>
            </div>
          </div>

          {/* Important links */}
          <div>
            <h3 className="mb-6 text-base font-bold text-white">
              Important Links
            </h3>

            <ul className="flex flex-col gap-4 text-sm">
              {[
                { label: "Courier", href: "/" },
                { label: "Enterprise", href: "/enterprise" },
                { label: "FAQ", href: "/faq" },
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Coverage Area", href: "/coverage-area" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1 transition-colors hover:text-blue-400"
                  >
                    {item.label}
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-base font-bold text-white">
              Contact Us
            </h3>

            <div className="flex flex-col gap-5 text-sm">

              <div className="flex items-start gap-3">
                <MapPin
                  size={19}
                  className="mt-1 shrink-0 text-blue-500"
                />
                <p className="leading-7 text-slate-400">
                  35, East Hajipara,
                  <br />
                  Rampura, Dhaka-1219,
                  <br />
                  Bangladesh.
                </p>
              </div>

              <a
                href="tel:01918302991"
                className="flex items-center gap-3 transition-colors hover:text-blue-400"
              >
                <Phone size={18} className="shrink-0 text-blue-500" />
                <span>01918302991</span>
              </a>
            </div>
          </div>

          {/* Social media */}
          <div>
            <h3 className="mb-6 text-base font-bold text-white">
              Follow Us
            </h3>

            <p className="mb-5 max-w-xs text-sm leading-6 text-slate-400">
              Stay connected with NextCourier for the latest updates and news.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 transition-all hover:-translate-y-1 hover:bg-blue-600"
              >
                <FaFacebookF size={19} />
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 transition-all hover:-translate-y-1 hover:bg-blue-600"
              >
                <FaLinkedinIn size={19} />
              </a>

              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 transition-all hover:-translate-y-1 hover:bg-red-600"
              >
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom copyright bar */}
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-3 px-6 py-5 text-center sm:flex-row sm:px-10 lg:px-16">

          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} NextCourier. All rights reserved.
          </p>

          <p className="text-xs text-slate-500">
            Delivering with care <span className="text-blue-500">●</span>
          </p>

        </div>
      </div>

    </footer>
  );
};

export default Footer;
