"use client";

import { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { LenisContext } from "@/context/LenisContext";

export default function SmoothScroll({ children }) {

  const [lenis, setLenis] = useState(null);

  useEffect(() => {

    const instance = new Lenis({
  duration: 0.55,
  smoothWheel: true,
  smoothTouch: false,
  wheelMultiplier: 1,
  lerp: 0.12,
});

    setLenis(instance);

    let rafId;

function raf(time) {
  instance.raf(time);
  rafId = requestAnimationFrame(raf);
}

rafId = requestAnimationFrame(raf);

   return () => {
  cancelAnimationFrame(rafId);
  instance.destroy();
  setLenis(null);
};
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}
