import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  return (
    <>
      {/*  Desktop Only */}
      <div className="fixed bottom-6 right-6 z-50 group hidden md:block">
        {/*  Contact Text */}
        <div
          className="
          absolute right-16 bottom-16
          text-green-400 text-sm font-semibold
          opacity-0 translate-y-2
          group-hover:opacity-100 group-hover:-translate-y-1
          transition-all duration-500
          whitespace-nowrap
        "
        >
          Contact Us
        </div>

        {/*  Arrow */}
        <div className="absolute right-14 bottom-12 pointer-events-none">
          <div className="arrow-once group-hover:arrow-active"></div>
        </div>

        {/*  WhatsApp Button */}
        <a
          href="https://wa.me/918000572371?text=I%20really%20appreciate%20your%20work.%20I%20want%20to%20connect."
          target="_blank"
          rel="noopener noreferrer"
          className="
    relative flex items-center justify-center
    bg-green-500 p-4 rounded-full
    shadow-lg
    transition-all duration-300
    group-hover:scale-110
  "
        >
          <FaWhatsapp size={24} className="text-black" />
        </a>
      </div>

      <a
        href="https://wa.me/918000572371"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 p-4 rounded-full shadow-lg md:hidden z-50"
      >
        <FaWhatsapp size={24} />
      </a>
    </>
  );
};

export default WhatsAppButton;
