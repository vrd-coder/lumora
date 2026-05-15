"use client";

import { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { LenisContext } from "@/context/LenisContext";

export default function SmoothScroll({ children }) {

  const [lenis, setLenis] = useState(null);

  useEffect(() => {

    const instance = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false,
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
