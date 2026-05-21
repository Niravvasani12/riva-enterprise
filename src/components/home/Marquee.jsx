const Marquee = () => {
  const items = [
    "Premium DTF Printing",
    "Fast Delivery 🚚",
    "Bulk Orders Available",
    "Custom Apparel Solutions",
    "High Quality Materials",
    "24/7 Support ☎️",
    "Affordable Pricing 💰",
    "Nationwide Shipping 🇮🇳",
  ];

  return (
    <div className="overflow-hidden bg-green-500 py-2 text-sm font-semibold text-black relative">
      {/*  Gradient Fade Left */}
      <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-green-500 to-transparent z-10" />

      {/*  Gradient Fade Right */}
      <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-green-500 to-transparent z-10" />

      <div className="flex animate-marquee">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="mx-6 whitespace-nowrap">
            {item} |
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
