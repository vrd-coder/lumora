"use client";

import Loader from "@/components/Loader";
import BackgroundParticles from "@/components/BackgroundParticles";
import Image from "next/image";
import { useEffect, useState } from "react";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform
} from "framer-motion";

import {
  Play,
  Sparkles,
  Headphones,
  TimerReset,
  Monitor,
  Keyboard,
  BarChart3,
  Menu,
  X
} from "lucide-react";

import { FaWindows } from "react-icons/fa";

const features = [
  {
    icon: Sparkles,
    title: "Deep Focus Mode",
    desc: "Immersive fullscreen sessions designed for deep concentration and long study hours."
  },
  {
    icon: Headphones,
    title: "Ambient Soundscapes",
    desc: "Rain, ambience and cinematic audio environments crafted for productivity."
  },
  {
    icon: TimerReset,
    title: "Smart Sessions",
    desc: "Structured Pomodoro workflows optimized to maximize focus without burnout."
  },
  {
    icon: Monitor,
    title: "Fullscreen Experience",
    desc: "Transform your desktop into a cinematic distraction-free workspace."
  },
  {
    icon: Keyboard,
    title: "Keyboard Shortcuts",
    desc: "Instantly control sessions and workflows using intuitive hotkeys."
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    desc: "Track study hours, streaks and productivity growth over time."
  }
];

const reveal = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(10px)"
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardGlow = {
  rest: {
    opacity: 0
  },
  hover: {
    opacity: 1
  }
};

const stats = [
  {
    number: "12K+",
    label: "Focus Hours"
  },
  {
    number: "85K+",
    label: "Sessions"
  },
  {
    number: "4.2K",
    label: "Students"
  },
  {
    number: "99%",
    label: "Focus Rate"
  }
];
const faqItems = [
  {
    question: "Is Lumora free to use?",
    answer:
      "Yes. Lumora is completely free to download and use."
  },
  {
    question: "Does Lumora work offline?",
    answer:
      "Yes. Lumora works smoothly offline once installed on your system."
  },
  {
    question: "Will there be a macOS version?",
    answer:
      "Currently Lumora is only available for Windows, but macOS support may come in future updates."
  },
  {
    question: "What does Lumora help with?",
    answer:
      "Lumora helps students and creators stay focused using immersive fullscreen sessions, clean UI and productivity tools."
  }
];

function FaqAccordion() {

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="space-y-4">
      {faqItems.map((item, index) => {

        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className="overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl"
          >

            <button
  onClick={() =>
    setOpenIndex(isOpen ? null : index)
  }
  style={{
    WebkitTapHighlightColor: "transparent",
    touchAction: "manipulation"
  }}
  className="flex w-full items-center justify-between px-6 py-5 text-left transition-all duration-300 hover:bg-white/[0.03]"
>

              <span className="text-lg font-semibold text-white">
                {item.question}
              </span>

              <span className="text-2xl text-cyan-400">
                {isOpen ? "−" : "+"}
              </span>

            </button>

            <div
              className={`grid transition-all duration-300 ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-6 text-zinc-400 leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
}
export default function Home() {

  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const mouseXGlow = useMotionValue(0);
  const mouseYGlow = useMotionValue(0);

  function handleMouseGlow(e) {

    if (isMobile) return;

    mouseXGlow.set(e.clientX - 300);
    mouseYGlow.set(e.clientY - 300);
  }

  useEffect(() => {

    const timer = setTimeout(() => setLoading(false), 2200);

    return () => clearTimeout(timer);

  }, []);

  useEffect(() => {

    const checkMobile = () => setIsMobile(window.innerWidth < 768);

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);

  }, []);

  useEffect(() => {

    const handleScroll = () => {

      setScrolled(window.scrollY > 20);

      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress = (window.scrollY / totalHeight) * 100;

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-300, 300], [10, -10]),
    {
      stiffness: 120,
      damping: 18
    }
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-300, 300], [-10, 10]),
    {
      stiffness: 120,
      damping: 18
    }
  );

  function handleMouseMove(e) {

    const rect = e.currentTarget.getBoundingClientRect();

    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {

    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <>

      {!isMobile && <Loader loading={loading} />}

      <main
        onMouseMove={handleMouseGlow}
        className="relative overflow-x-clip bg-[#020304] text-white"
        style={{
          WebkitOverflowScrolling: "touch"
        }}
      >

        {!isMobile && <BackgroundParticles />}

        {!isMobile && (
          <motion.div
            style={{
              x: mouseXGlow,
              y: mouseYGlow
            }}
            className="pointer-events-none fixed left-0 top-0 z-0 h-[600px] w-[600px] rounded-full bg-cyan-400/10 blur-3xl"
          />
        )}

        {/* BACKGROUND */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">

          <div className="absolute inset-0 bg-black"></div>

          <div className="absolute top-[-300px] left-1/2 -translate-x-1/2 w-[1800px] h-[1800px] rounded-full bg-cyan-400/10 blur-3xl"></div>

          <div className="absolute top-[150px] left-[0%] w-[1000px] h-[1000px] rounded-full bg-emerald-400/10 blur-3xl"></div>

          <div className="absolute top-[100px] right-[0%] w-[1000px] h-[1000px] rounded-full bg-blue-500/10 blur-3xl"></div>

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.5)_100%)]"></div>

        </div>

        {/* NAV */}
        <nav
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 99999
          }}
          className={`transition-all duration-500 ${
            scrolled
              ? "backdrop-blur-2xl bg-black/40 border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.35)]"
              : "bg-transparent"
          }`}
        >

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "85px",
              paddingLeft: "24px",
              paddingRight: "24px",
              maxWidth: "1400px",
              margin: "0 auto",
              position: "relative"
            }}
          >

            <Image
              src="/lumora-logo.png"
              alt="Lumora"
              width={180}
              height={80}
              priority
              style={{
                width: isMobile ? "140px" : "150px",
                height: "auto",
                objectFit: "contain"
              }}
            />

            {!isMobile ? (
  <div
    style={{
      position: "absolute",
      right: "24px",
      display: "flex",
      alignItems: "center",
      gap: "48px"
    }}
  >
    {[
      { label: "Features", href: "#features" },
      { label: "Experience", href: "#pc-preview-video" },
      { label: "Download", href: "#download" }
    ].map((item) => (
      <a
        key={item.label}
        href={item.href}
        style={{
          color: "#a1a1aa",
          textDecoration: "none",
          fontSize: "16px"
        }}
      >
        {item.label}
      </a>
    ))}
  </div>
) : (
  <motion.button
  whileTap={{ scale: 0.92 }}
  animate={{ rotate: menuOpen ? 90 : 0 }}
  transition={{ duration: 0.25 }}
  onClick={() => setMenuOpen(!menuOpen)}
  className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-2xl shadow-[0_0_25px_rgba(34,211,238,0.12)]"
>
  {menuOpen ? (
    <X size={24} className="text-cyan-300" />
  ) : (
    <Menu size={24} className="text-white" />
  )}
</motion.button>
    )}
    
  </div>

</nav>
        {isMobile && menuOpen && (
  <motion.div
  initial={{ opacity: 0, y: -15 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -15 }}
  transition={{ duration: 0.25 }}
  className="fixed top-[92px] left-4 right-4 z-[99998] overflow-hidden rounded-[28px] border border-white/10 bg-black/80 backdrop-blur-2xl shadow-[0_0_40px_rgba(34,211,238,0.08)]"
>
    <div className="flex flex-col px-6 py-6">

      <a
        href="#features"
        onClick={() => setMenuOpen(false)}
        className="py-4 text-zinc-300 text-lg border-b border-white/5"
      >
        Features
      </a>

      <a
        href="#mobile-preview-video"
        onClick={() => setMenuOpen(false)}
        className="py-4 text-zinc-300 text-lg border-b border-white/5"
      >
        Experience
      </a>

      <a
        href="#download"
        onClick={() => setMenuOpen(false)}
        className="py-4 text-cyan-400 text-lg"
      >
        Download
      </a>

    </div>
  </motion.div>
)}

        {/* HERO SECTION */}
        <section
          id="experience"
          className="relative min-h-screen overflow-hidden"
        >

          <div className="container relative z-10 grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-center pt-24 md:pt-32 pb-20 md:pb-28 px-6">

            <motion.div
              className="relative z-30"
              initial={{
                opacity: isMobile ? 1 : 0,
                y: isMobile ? 0 : 35
              }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
            >

              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl px-5 py-3 mb-10 shadow-[0_0_20px_rgba(255,255,255,0.03)]">

                <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,1)]"></div>

                <span className="text-sm text-zinc-300">
                  Immersive Focus Environment
                </span>

              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl xl:text-[102px] font-black leading-[0.95] tracking-[-2px] sm:tracking-[-6px]">
                Enter<br />Deep<br />Focus.
              </h1>

              <p className="mt-8 max-w-xl text-base sm:text-lg md:text-xl leading-relaxed text-zinc-400">
                Lumora transforms studying and deep work into a cinematic distraction-free experience.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-5 mt-10">

                <motion.a
  href="/Lumora%20Setup%201.0.0.exe"
  download
  whileHover={{
    scale: 1.04,
    boxShadow: "0 0 45px rgba(34,211,238,0.35)"
  }}
  whileTap={{ scale: 0.97 }}
  className="w-full sm:w-auto flex items-center justify-center gap-3 rounded-full bg-cyan-400 px-8 py-4 font-semibold text-black"
>
  <FaWindows size={20} />
  Download For Windows
</motion.a>

                {!isMobile && (
                <button
                  type="button"
                  onClick={() => setPreviewOpen(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-3 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl px-8 py-4 transition-all duration-300 active:scale-[0.97] hover:bg-white/[0.05]"
                  style={{
                    WebkitTapHighlightColor: "transparent",
                    touchAction: "manipulation"
                  }}
                >
                  <Play size={18} fill="white" />
                  Watch Preview
                </button>
                )}

              </div>

            </motion.div>

            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative mt-10 lg:mt-0 z-0 pointer-events-none"
            >

              <motion.div
                style={
                  !isMobile
                    ? {
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d"
                      }
                    : {}
                }
                initial={{
                  opacity: isMobile ? 1 : 0,
                  x: isMobile ? 0 : 50
                }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="relative"
              >

                <div className="absolute -inset-10 rounded-[50px] bg-cyan-400/15 blur-3xl"></div>

                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative"
                >

                  <div className="absolute inset-0 rounded-[38px] border border-cyan-400/30 shadow-[0_0_35px_rgba(34,211,238,0.45)] z-20 pointer-events-none"></div>

                  <div className="relative overflow-hidden rounded-[28px] md:rounded-[38px] border border-white/10 bg-[#05090d]/95 backdrop-blur-xl md:backdrop-blur-2xl shadow-[0_25px_100px_rgba(0,0,0,0.7)]">

                    <div className="flex items-center justify-between border-b border-white/10 bg-black/40 px-6 py-4">

                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>

                      <p className="text-sm text-zinc-400">Lumora</p>

                      <div className="w-16"></div>

                    </div>

                    <div className="relative overflow-hidden rounded-b-[38px] bg-black">

                      <Image
                        src="/lumora-ui.png"
                        alt="Lumora UI"
                        width={1600}
                        height={1000}
                        priority
                        className="relative z-20 w-full h-auto object-cover"
                      />

                    </div>

                  </div>

                </motion.div>

              </motion.div>

            </div>

          </div>

        </section>

        {/* STATS */}
        <section className="relative pb-24">

          <div className="container relative z-10">

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

              {stats.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{
                    opacity: isMobile ? 1 : 0,
                    y: isMobile ? 0 : 35
                  }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.12
                  }}
                  whileHover={!isMobile ? {
                    y: -10,
                    scale: 1.03
                  } : {}}
                  className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-6 sm:p-8"
                >

                  <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_65%)]"></div>

                  <div className="relative z-10">

                    <p className="mb-5 text-xs uppercase tracking-[3px] text-zinc-500">
                      {item.label}
                    </p>

                    <motion.h3
                      initial={{ scale: isMobile ? 1 : 0.8, opacity: isMobile ? 1 : 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: 0.15 + index * 0.1
                      }}
                      className="text-3xl sm:text-5xl font-black tracking-tight"
                    >
                      {item.number}
                    </motion.h3>

                  </div>

                </motion.div>
              ))}

            </div>

          </div>

        </section>

        {/* FEATURES */}
        <section
          id="features"
          className="relative py-32 overflow-hidden"
        >

          <motion.div
            initial={{
              opacity: isMobile ? 1 : 0,
              y: isMobile ? 0 : 35
            }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative z-10 text-center mb-20 px-6"
          >

            <div className="relative z-10">

              <p className="mb-4 text-sm uppercase tracking-[4px] text-cyan-400">
                Features
              </p>

              <h2 className="text-4xl sm:text-5xl md:text-7xl font-black leading-[0.92] tracking-[-3px] md:tracking-[-4px]">
                Built For<br />Modern Focus.
              </h2>

            </div>

          </motion.div>

          <div className="container relative z-10">

            <motion.div
              variants={stagger}
              initial={isMobile ? "visible" : "hidden"}
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 xl:grid-cols-3 gap-7"
            >

              {features.map((feature, index) => {

                const Icon = feature.icon;

                return (
                  <motion.div
                    key={index}
                    variants={isMobile ? undefined : reveal}
                    whileHover={!isMobile ? {
                      y: -12,
                      scale: 1.025,
                      rotateX: 2,
                      rotateY: 2
                    } : {}}
                    transition={{ duration: 0.25 }}
                    className="group relative"
                  >

                    {!isMobile && (
                      <motion.div
                        variants={cardGlow}
                        initial="rest"
                        whileHover="hover"
                        className="pointer-events-none absolute -inset-[1px] rounded-[34px] bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.18),transparent_65%)] blur-2xl"
                      />
                    )}

                    <div className="relative h-full overflow-hidden rounded-[34px] border border-white/10 bg-[#071018]/85 backdrop-blur-2xl p-8 sm:p-9 shadow-[0_10px_50px_rgba(0,0,0,0.35)] transition-all duration-300 group-hover:border-cyan-400/20 group-hover:shadow-[0_0_50px_rgba(34,211,238,0.08)]">

                      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.08),transparent_60%)]"></div>

                      <div className="relative z-10">

                        <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 shadow-[0_0_30px_rgba(34,211,238,0.18)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(34,211,238,0.35)]">
                          <Icon className="w-7 h-7 text-cyan-300" />
                        </div>

                        <h3 className="mb-4 text-2xl font-bold tracking-tight">
                          {feature.title}
                        </h3>

                        <p className="text-[15px] leading-relaxed text-zinc-400">
                          {feature.desc}
                        </p>

                      </div>

                    </div>

                  </motion.div>
                );
              })}

            </motion.div>

          </div>

        </section>

        {/* MOBILE PREVIEW VIDEO — only visible on mobile, sits just before the footer */}
        <section
          id="mobile-preview-video"
          style={{ scrollMarginTop: "100px" }}
          className="relative py-16 px-6 md:hidden"
        >

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.06),transparent_70%)] pointer-events-none"></div>

            <div className="relative z-10">

              <div className="text-center mb-10">
                <p className="mb-3 text-sm uppercase tracking-[4px] text-cyan-400">
                  See It In Action
                </p>
                <h2 className="text-4xl font-black leading-[0.95] tracking-[-2px]">
                  The Experience.
                </h2>
              </div>

              <div className="relative max-w-5xl mx-auto">
                <div className="absolute -inset-4 rounded-[44px] bg-cyan-400/10 blur-3xl pointer-events-none"></div>
                <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black shadow-[0_0_60px_rgba(34,211,238,0.15)]">
                  <div className="flex items-center gap-3 border-b border-white/10 bg-black/60 px-5 py-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                    <span className="ml-2 text-xs text-zinc-400">Lumora — Preview</span>
                  </div>
                  <video
                    src="/lumora-preview.mp4"
                    controls
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

            </div>

          </section>

        {/* PC PREVIEW VIDEO — only visible on desktop */}
        <section
          id="pc-preview-video"
          style={{ scrollMarginTop: "100px" }}
          className="relative py-24 px-6 hidden md:block overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.06),transparent_70%)] pointer-events-none"></div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="container relative z-10"
          >
            <div className="text-center mb-14">
              <p className="mb-4 text-sm uppercase tracking-[4px] text-cyan-400">
                See It In Action
              </p>
              <h2 className="text-5xl md:text-7xl font-black leading-[0.92] tracking-[-4px]">
                The Experience.
              </h2>
            </div>

            <div className="relative max-w-5xl mx-auto">
              <div className="absolute -inset-6 rounded-[50px] bg-cyan-400/10 blur-3xl pointer-events-none"></div>
              <div className="relative overflow-hidden rounded-[38px] border border-white/10 bg-black shadow-[0_0_80px_rgba(34,211,238,0.18)]">
                <div className="flex items-center gap-3 border-b border-white/10 bg-black/60 px-6 py-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-3 text-sm text-zinc-400">Lumora — Preview</span>
                </div>
                <video
                  src="/lumora-preview.mp4"
                  controls
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* TESTIMONIALS */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.04),transparent_70%)] pointer-events-none"></div>

          <motion.div
            initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative z-10 text-center mb-20 px-6"
          >
            <p className="mb-4 text-sm uppercase tracking-[4px] text-cyan-400">Testimonials</p>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black leading-[0.92] tracking-[-3px] md:tracking-[-4px]">
              Students Love<br />Lumora.
            </h2>
          </motion.div>

          <div className="container relative z-10">
            <motion.div
              variants={stagger}
              initial={isMobile ? "visible" : "hidden"}
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 xl:grid-cols-3 gap-7"
            >
              {[
                {
                  name: "Aryan Mehta",
                  role: "Engineering Student, IIT Delhi",
                  avatar: "AM",
                  text: "Lumora completely changed how I study. The ambient sounds and fullscreen mode help me stay locked in for hours without getting distracted.",
                  stars: 4
                },
                {
                  name: "Priya Sharma",
                  role: "CA Aspirant, Mumbai",
                  avatar: "PS",
                  text: "I used to struggle with 2 hour study sessions. With Lumora's Pomodoro timer and focus mode, I'm easily hitting 6+ hours daily. Game changer.",
                  stars: 5
                },
                {
                  name: "Rohan Verma",
                  role: "UPSC Prep, Delhi",
                  avatar: "RV",
                  text: "The cinematic UI actually makes studying feel premium. I open Lumora and my brain just switches to focus mode automatically now.",
                  stars: 5
                },
                {
                  name: "Sneha Kulkarni",
                  role: "Medical Student, Pune",
                  avatar: "SK",
                  text: "Fullscreen Northern Lights + Pomodoro = perfect study setup. Nothing else comes close to this experience.",
                  stars: 4
                },
                {
                  name: "Dev Patel",
                  role: "Software Dev, Bangalore",
                  avatar: "DP",
                  text: "Even as a developer I use this for deep work sessions. The progress tracking keeps me accountable. Highly recommend.",
                  stars: 5
                },
                {
                  name: "Ananya Singh",
                  role: "Design Student, Ahmedabad",
                  avatar: "AS",
                  text: "The UI is so beautiful it's actually motivating. I look forward to opening Lumora every morning. Absolutely love it.",
                  stars: 5
                }
              ].map((t, index) => (
                <motion.div
                  key={index}
                  variants={isMobile ? undefined : reveal}
                  whileHover={!isMobile ? { y: -10, scale: 1.02 } : {}}
                  transition={{ duration: 0.25 }}
                  className="group relative"
                >
                  <div className="relative h-full overflow-hidden rounded-[34px] border border-white/10 bg-[#071018]/85 backdrop-blur-2xl p-8 shadow-[0_10px_50px_rgba(0,0,0,0.35)] transition-all duration-300 group-hover:border-cyan-400/20 group-hover:shadow-[0_0_50px_rgba(34,211,238,0.08)]">
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.07),transparent_60%)]"></div>

                    <div className="relative z-10">
                      {/* Stars */}
                      <div className="flex gap-1 mb-6">
                        {Array.from({ length: t.stars }).map((_, i) => (
                          <span key={i} className="text-cyan-400 text-lg">★</span>
                        ))}
                      </div>

                      {/* Quote */}
                      <p className="text-[15px] leading-relaxed text-zinc-300 mb-8">
                        "{t.text}"
                      </p>

                      {/* Author */}
                      <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-400/15 border border-cyan-400/25 text-cyan-300 text-sm font-bold shadow-[0_0_20px_rgba(34,211,238,0.15)]">
                          {t.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-white text-sm">{t.name}</p>
                          <p className="text-xs text-zinc-500 mt-0.5">{t.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative py-32 overflow-hidden z-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.04),transparent_70%)] pointer-events-none"></div>

          <motion.div
            initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative z-10 text-center mb-20 px-6"
          >
            <p className="mb-4 text-sm uppercase tracking-[4px] text-cyan-400">FAQ</p>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black leading-[0.92] tracking-[-3px] md:tracking-[-4px]">
              Got Questions?<br />We Got You.
            </h2>
          </motion.div>

          <div className="container relative z-50 max-w-3xl mx-auto px-6 pointer-events-auto">
            <FaqAccordion />
          </div>
        </section>

        {/* FOOTER */}
        <footer
          id="download"
          className="relative overflow-hidden border-t border-white/10 py-24"
        >

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.08),transparent_60%)]"></div>

          <div className="container relative z-10">

            <motion.div
              initial={{
                opacity: isMobile ? 1 : 0,
                y: isMobile ? 0 : 30
              }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-10 md:p-16 text-center shadow-[0_0_80px_rgba(34,211,238,0.06)]"
            >

              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_60%)]"></div>

              <div className="relative z-10">

                <p className="mb-4 text-sm uppercase tracking-[4px] text-cyan-400">
                  Start Your Focus Journey
                </p>

                <h2 className="text-4xl md:text-6xl font-black leading-[1.08] md:leading-[0.95] tracking-[-2px] md:tracking-[-3px]">
                  Study Smarter.<br />Focus Deeper.
                </h2>

                <p className="mt-6 max-w-2xl mx-auto text-zinc-400 leading-relaxed text-sm sm:text-base">
                  Lumora transforms productivity into an immersive cinematic experience designed for deep work, studying and modern focus.
                </p>

                <motion.a
  href="/Lumora%20Setup%201.0.0.exe"
  download
  whileHover={{
    scale: 1.04,
    boxShadow: "0 0 45px rgba(34,211,238,0.35)"
  }}
  whileTap={{ scale: 0.97 }}
  className="mt-10 inline-flex items-center gap-3 rounded-full bg-cyan-400 px-8 py-4 font-semibold text-black"
>
  <FaWindows size={20} />
  Download For Windows
</motion.a>
<p className="mt-5 max-w-md mx-auto text-sm leading-7 text-zinc-300">
  Windows may show a security prompt because Lumora is a new application.
  <br />
  Click <span className="font-semibold text-cyan-300">“More info”</span> →{" "}
  <span className="font-semibold text-cyan-300">“Run anyway”</span>.
</p>
                <div className="mt-12 flex flex-col items-center justify-center gap-3 text-zinc-500 text-sm">
                  <span>© 2026 Lumora. All rights reserved.</span>
                  <span>
                    Made with <span className="text-red-400">❤️</span> by{" "}
                    <a
                      href="https://www.instagram.com/bettercallvrd/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                      style={{
                        textShadow: "0 0 12px rgba(34,211,238,0.5)"
                      }}
                    >
                      @bettercallvrd
                    </a>
                  </span>
                </div>

              </div>

            </motion.div>

          </div>

        </footer>

        {/* PREVIEW MODAL — desktop only */}
        {previewOpen && (
          <div
            className="fixed inset-0 z-[99999999] flex items-center justify-center bg-black/95 p-4 pointer-events-auto"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh"
            }}
          >

            <div className="relative w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/10 bg-black">

              <button
                onClick={() => setPreviewOpen(false)}
                className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white"
              >
                ✕
              </button>

              <video
                src="/lumora-preview.mp4"
                controls
                autoPlay
                muted={false}
                playsInline
                className="w-full h-full max-h-[85vh] object-cover"
              />

            </div>

          </div>
        )}

        {/* SCROLL PROGRESS */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: `${scrollProgress}%`,
            height: "3px",
            zIndex: 999999,
            background: "linear-gradient(90deg, #22d3ee, #3b82f6)",
            boxShadow: "0 0 20px rgba(34,211,238,0.7)"
          }}
        />

      </main>

    </>
  );
}