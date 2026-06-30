import { motion as Motion, useReducedMotion } from "framer-motion";
import { FaRulerCombined, FaShippingFast, FaShoppingBag } from "react-icons/fa";
import SEO from "../components/common/SEO";

const rateRows = [
  { range: "2m - 30m", price: 190 },
  { range: "31m - 50m", price: 160 },
  { range: "51m - 99m", price: 150 },
  { range: "100m & Above", price: 130 },
  { range: "500m & Above", price: 120 },
];

const PriceListingBest = ({ embedded = false }) => {
  const reducedMotion = useReducedMotion();

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: reducedMotion ? 0 : 40,
      scale: reducedMotion ? 1 : 0.98,
    },
    show: { opacity: 1, y: 0, scale: 1 },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: reducedMotion ? 0 : -30 },
    show: (index) => ({
      opacity: 1,
      x: 0,
      transition: { delay: reducedMotion ? 0 : 0.08 * index, duration: 0.45 },
    }),
  };

  return (
    <>
      {!embedded && (
        <SEO
          title="DTF Printing Rate Card"
          description="View Riva Enterprise DTF printing rates in Surat. Check per meter pricing for small, bulk, and reseller DTF print orders with shipping support."
          keywords={[
            "DTF printing rate",
            "DTF printing price Surat",
            "Riva Enterprise price list",
            "DTF print rate card",
            "bulk DTF printing price",
          ]}
          structuredData={(siteUrl, canonicalUrl) => ({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "DTF Printing Rate Card",
            provider: {
              "@type": "LocalBusiness",
              name: "Riva Enterprise",
              image: `${siteUrl}/Riva.png`,
            },
            areaServed: "India",
            url: canonicalUrl,
            offers: rateRows.map((row) => ({
              "@type": "Offer",
              name: `${row.range} DTF printing`,
              price: row.price,
              priceCurrency: "INR",
              unitText: "meter",
              availability: "https://schema.org/InStock",
            })),
          })}
        />
      )}
      <section
        className={`relative overflow-hidden bg-[#04070d] px-3 py-10 sm:px-6 sm:py-14 ${
          embedded ? "" : "min-h-screen"
        }`}
      >
      <div className="pointer-events-none absolute inset-0">
        <Motion.div
          className="absolute -left-20 top-10 h-40 w-40 rounded-full bg-[#22345f]/30 blur-3xl"
          animate={reducedMotion ? {} : { y: [0, -15, 0], x: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <Motion.div
          className="absolute -right-12 bottom-20 h-52 w-52 rounded-full bg-[#22c55e]/20 blur-3xl"
          animate={reducedMotion ? {} : { y: [0, 18, 0], x: [0, -12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <Motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto w-full max-w-xl overflow-hidden rounded-3xl border border-[#22c55e]/45 bg-black text-white shadow-[0_0_35px_rgba(34,197,94,0.28)]"
      >
        <div className="border-b border-[#22c55e]/30 p-4 text-center sm:p-5">
          <h2 className="text-3xl font-black uppercase tracking-[0.12em] text-[#1f3368] sm:text-5xl">
            Riva Enterprise
          </h2>
          <p className="mt-1 text-sm font-semibold uppercase tracking-[0.35em] text-gray-100 sm:text-lg">
            Premium DTF Printing
          </p>
          <p className="mt-2 text-base italic text-[#4ade80] sm:text-lg">
            Create your own customisation
          </p>
        </div>

        <div className="border-b border-[#22c55e]/30 bg-gradient-to-r from-[#22c55e] to-[#16a34a] px-3 py-3">
          <h1 className="text-center text-2xl font-black uppercase tracking-wide text-black sm:text-4xl">
            DTF Printing Rate Card
          </h1>
        </div>

        <div className="mx-auto my-4 w-fit rounded-md border border-[#22c55e] bg-[#22c55e] px-6 py-1">
          <p className="text-center text-lg font-extrabold uppercase tracking-[0.2em] text-black sm:text-xl">
            New Rates
          </p>
        </div>

        <Motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="pb-4"
        >
          {rateRows.map((row, index) => (
            <Motion.div
              key={row.range}
              custom={index}
              variants={rowVariants}
              className="grid grid-cols-[44px_1fr_auto] items-center gap-2 border-y border-[#22c55e]/30 px-2 py-3 sm:grid-cols-[70px_1fr_auto] sm:gap-3 sm:px-3 sm:py-4"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#22c55e] text-base text-black sm:h-12 sm:w-12 sm:text-xl">
                <FaRulerCombined />
              </div>
              <p className="text-xl font-extrabold tracking-wide text-white sm:text-4xl">
                {row.range}
              </p>
              <p className="whitespace-nowrap text-2xl font-black text-[#22c55e] sm:text-5xl">
                {"\u20B9"}
                {row.price}
                <span className="ml-1 text-lg font-bold text-white sm:text-3xl">
                  / mtr
                </span>
              </p>
            </Motion.div>
          ))}
        </Motion.div>

        <Motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.45 }}
          className="mx-3 mb-4 flex items-center justify-center gap-3 rounded-xl border border-dashed border-[#22c55e] bg-black px-3 py-3 sm:mx-4 sm:py-4"
        >
          <FaShippingFast className="text-3xl text-white sm:text-4xl" />
          <p className="text-center text-xl font-black uppercase tracking-wide text-white sm:text-3xl">
            Shipping Extra
          </p>
        </Motion.div>

        <Motion.div
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          initial={{
            opacity: 0,
            y: reducedMotion ? 0 : 24,
            scale: reducedMotion ? 1 : 0.98,
          }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5 }}
          className="mx-3 mb-5 flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[#22c55e] to-[#16a34a] px-2 py-3 sm:mx-4 sm:mb-6 sm:gap-3 sm:px-3"
        >
          <FaShoppingBag className="text-xl text-black sm:text-2xl" />
          <p className="text-center text-xl font-black uppercase tracking-wide text-black sm:text-3xl">
            Bulk Orders Welcome
          </p>
        </Motion.div>
      </Motion.div>
      </section>
    </>
  );
};

export default PriceListingBest;
