"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ loading }) {

  return (

    <AnimatePresence>

      {loading && (

        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.8
            }
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        >

          {/* GLOW */}

          <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-400/20 blur-3xl"></div>

          {/* LOGO */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8
            }}

            animate={{
              opacity: 1,
              scale: 1
            }}

            transition={{
              duration: 1,
              ease: "easeOut"
            }}

            className="relative z-10"
          >

            <Image
              src="/lumora-logo.png"
              alt="Lumora"
              width={220}
              height={100}
              priority
              className="w-[180px] md:w-[220px] h-auto object-contain drop-shadow-[0_0_40px_rgba(34,211,238,0.5)]"
            />

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>

  );
}