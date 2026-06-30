import Hero from "../components/home/Hero";
import Services from "../components/home/Services";
import Gallery from "../components/home/Gallery";
import VideoSection from "../components/home/VideoSection";
import ContactForm from "../components/contact/ContactForm";
import Marquee from "../components/common/Marquee";
import SEO from "../components/common/SEO";
import PriceListingBest from "./PriceListingBest";

const Home = () => {
  return (
    <>
      <SEO
        title="Premium DTF Printing in Surat"
        description="Riva Enterprise offers premium DTF printing, custom transfer prints, bulk order support, and reseller-friendly DTF print rates from Surat, Gujarat."
        keywords={[
          "DTF printing Surat",
          "Riva Enterprise",
          "premium DTF printing",
          "custom transfer printing",
          "bulk DTF printing",
        ]}
        structuredData={(siteUrl, canonicalUrl) => ({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Riva Enterprise",
          url: canonicalUrl,
          image: `${siteUrl}/Riva.png`,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Surat",
            addressRegion: "Gujarat",
            addressCountry: "IN",
          },
        })}
      />
      <Marquee />
      <Hero />
      <PriceListingBest embedded />
      <Services />
      <Gallery />
      <VideoSection />
      <ContactForm />
    </>
  );
};

export default Home;
