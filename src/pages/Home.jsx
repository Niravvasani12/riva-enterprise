import Hero from "../components/home/Hero";
import Services from "../components/home/Services";
import Gallery from "../components/home/Gallery";
import VideoSection from "../components/home/VideoSection";
import ContactForm from "../components/contact/ContactForm";
import Marquee from "../components/common/Marquee";

const Home = () => {
  return (
    <>
      <Marquee />
      <Hero />
      <Services />
      <Gallery />
      <VideoSection />
      <ContactForm />
    </>
  );
};

export default Home;
