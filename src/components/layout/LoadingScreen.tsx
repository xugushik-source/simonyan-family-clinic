"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLocale } from "next-intl";
import { clinicName, clinicTagline, clinicBrandInternational } from "@/config/clinic.config";
import type { Locale } from "@/i18n/routing";

/**
 * Intro splash shown once on the initial page load: the icon surfaces
 * large and centered with the clinic name and tagline, then fades away
 * to reveal the site — the same pattern MediCare Hospital's preloader
 * used, but with our real logo instead of a generic animated cross.
 *
 * The name/tagline are rendered as real, translated text (not baked
 * into an image) so switching the locale actually changes what the
 * splash says, instead of always showing the same Russian wordmark.
 */
export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const locale = useLocale() as Locale;

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-milk"
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-4 px-6 text-center"
          >
            <Image
              src="/logo-icon.png"
              alt={clinicName[locale]}
              width={160}
              height={160}
              priority
              className="h-24 w-24 sm:h-28 sm:w-28"
            />
            <div>
              <p className="max-w-xs font-serif text-xl font-semibold text-forest-900 sm:max-w-sm sm:text-2xl">
                {clinicName[locale]}
              </p>
              <p className="mt-2 text-xs text-teal-700 sm:text-sm">{clinicTagline[locale]}</p>
              <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-ink-300 sm:text-xs">
                {clinicBrandInternational}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
