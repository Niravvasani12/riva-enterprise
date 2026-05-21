const Marquee = () => {
  const items = [
    "Premium DTF Printing",
    "Fast Delivery",
    "Bulk Orders Available",
    "Custom Apparel Solutions",
    "High Quality Materials",
    "Support on WhatsApp",
    "Affordable Pricing",
    "Nationwide Shipping",
  ];

  return (
    <div className="relative overflow-hidden bg-green-500 py-2 text-sm font-semibold text-black">
      <div className="absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-green-500 to-transparent" />
      <div className="absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-green-500 to-transparent" />

      <div className="flex animate-marquee">
        {[...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`} className="mx-6 whitespace-nowrap">
            {item} |
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
