"use client";

import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function BackgroundParticles() {

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: false,

        background: {
          color: "transparent"
        },

        fpsLimit: 60,

        particles: {
          number: {
            value: 45
          },

          color: {
            value: "#22d3ee"
          },

          opacity: {
            value: 0.18
          },

          size: {
            value: {
              min: 1,
              max: 3
            }
          },

          move: {
            enable: true,
            speed: 0.4
          },

          links: {
            enable: false
          }
        },

        detectRetina: true
      }}
      className="absolute inset-0 z-0"
    />
  );
}