"use client";

import { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { LenisContext } from "@/context/LenisContext";

export default function SmoothScroll({ children }) {

  const [lenis, setLenis] = useState(null);

  useEffect(() => {

    const instance = new Lenis({
  lerp: 0.08,
  smoothWheel: true,
  smoothTouch: false,
  syncTouch: false,
  wheelMultiplier: 1
});

    setLenis(instance);

    function raf(time) {
      instance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
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
