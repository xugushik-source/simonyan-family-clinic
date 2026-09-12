"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

/**
 * Intro splash shown once on the initial page load: the full clinic
 * logo (mark + wordmark) surfaces large and centered, then fades away
 * to reveal the site — the same pattern MediCare Hospital's preloader
 * used, but with our real logo instead of a generic animated cross.
 */
export function LoadingScreen() {
  const [visible, setVisible] = useState(true);

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
            className="flex flex-col items-center px-6"
          >
            <Image
              src="/logo-full.png"
              alt="Simonyan Family Clinic — Семейная клиника Симонян"
              width={720}
              height={720}
              priority
              className="h-auto w-[240px] sm:w-[320px] md:w-[380px]"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
