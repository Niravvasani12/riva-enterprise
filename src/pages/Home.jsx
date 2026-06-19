import Hero from "../components/home/Hero";
import Services from "../components/home/Services";
import Gallery from "../components/home/Gallery";
import VideoSection from "../components/home/VideoSection";
import ContactForm from "../components/contact/ContactForm";
import Marquee from "../components/common/Marquee";
import PriceListingBest from "./PriceListingBest";

const Home = () => {
  return (
    <>
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
