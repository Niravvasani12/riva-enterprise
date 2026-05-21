import { motion as Motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroVideo from "../../assets/video/dtf-process.mp4";

const Hero = () => {
  return (
    <section className="relative flex min-h-[calc(100vh-72px)] items-center justify-center overflow-hidden px-6 text-center">
      {/* 🎥 VIDEO BACKGROUND */}
      <video
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* 🔥 LIGHT OVERLAY (for readability, not full black) */}
      <div className="absolute inset-0 bg-black/30" />

      {/* CONTENT */}
      <Motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="relative z-10 max-w-3xl"
      >
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-green-300">
          Premium DTF Printing
        </p>

        <h1
          className="
  text-4xl 
  leading-tight 
  font-black 
  text-white 
  sm:text-5xl 
  md:text-7xl
"
        >
          DTF Print Solution
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-200 md:text-lg">
          Premium quality custom printing with fast delivery, vibrant colors,
          and production-ready consistency for every order.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/contact"
            className="rounded-full bg-green-500 px-8 py-3 font-semibold text-black transition hover:bg-green-400"
          >
            Get Started
          </Link>

          <Link
            to="/about"
            className="rounded-full border border-white/30 px-8 py-3 font-semibold text-white transition hover:border-green-400 hover:text-green-300"
          >
            Learn More
          </Link>
        </div>
      </Motion.div>
    </section>
  );
};

export default Hero;
