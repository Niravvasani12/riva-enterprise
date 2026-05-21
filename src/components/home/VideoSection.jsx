import { motion as Motion } from "framer-motion";
import {
  FiAward,
  FiCheckCircle,
  FiDroplet,
  FiLayers,
  FiShield,
  FiZap,
} from "react-icons/fi";

import step1 from "../../assets/process/step1.png";
import step2 from "../../assets/process/step2.png";
import step3 from "../../assets/process/step3.png";
import step4 from "../../assets/process/step4.png";
import "./VideoSection.css";

const serviceHighlights = [
  {
    icon: FiAward,
    title: "Professional Finish",
    text: "Premium transfer quality with clean edges, rich color, and polished output.",
  },
  {
    icon: FiShield,
    title: "Consistent Delivery",
    text: "Controlled production standards keep every order reliable and repeatable.",
  },
  {
    icon: FiZap,
    title: "Fast Turnaround",
    text: "Structured workflow helps us deliver quickly without reducing quality.",
  },
];

const processCards = [
  {
    icon: FiLayers,
    title: "Artwork Preparation",
    text: "We prepare print-ready artwork to protect sharp lines and proper color placement.",
    image: step1,
  },
  {
    icon: FiDroplet,
    title: "Precision Printing",
    text: "Advanced DTF printing creates vivid color and smooth white backing for premium transfers.",
    image: step2,
  },
  {
    icon: FiCheckCircle,
    title: "Curing & Finishing",
    text: "Correct powdering and curing improve wash durability and transfer flexibility.",
    image: step3,
  },
  {
    icon: FiAward,
    title: "Press-Ready Output",
    text: "Final transfers are delivered clean, branded, and ready for professional application.",
    image: step4,
  },
];

const VideoSection = () => {
  return (
    <section className="video-section" aria-labelledby="video-section-heading">
      <div className="video-section__glow video-section__glow--left" />
      <div className="video-section__glow video-section__glow--right" />

      <div className="video-section__container">
        <Motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65 }}
          className="video-section__header"
        >
          <span className="video-section__eyebrow">
            Why Businesses Choose Us
          </span>
          <h2 id="video-section-heading">
            Professional DTF Printing Quality For Serious Brands
          </h2>
          <p>
            Built for business-grade consistency, our process focuses on clean
            detail, strong color, and dependable finishing so every print looks
            ready for market.
          </p>
        </Motion.header>

        <div className="video-section__highlights">
          {serviceHighlights.map((item, index) => {
            const Icon = item.icon;

            return (
              <Motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="video-section__highlight-card"
              >
                <div className="video-section__icon-wrap">
                  <Icon size={20} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </Motion.article>
            );
          })}
        </div>

        <div className="video-section__process-grid">
          {processCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <Motion.article
                key={card.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="video-section__process-card"
              >
                <div className="video-section__process-image-wrap">
                  <img src={card.image} alt={card.title} loading="lazy" />
                </div>
                <div className="video-section__process-body">
                  <div className="video-section__process-top">
                    <span>Step {String(index + 1).padStart(2, "0")}</span>
                    <Icon size={18} />
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              </Motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
