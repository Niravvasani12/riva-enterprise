import { motion as Motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import machineImg from "../../assets/images/DTFmachine1.png";
import printHeadImg from "../../assets/images/Services/ink.jpg";
import printOutputImg from "../../assets/images/Services/FinalO.jpg";
import inkSystemImg from "../../assets/images/Services/Color.jpg";
import pressFinishImg from "../../assets/images/Services/Print.jpg";
import "./Services.css";

const machineStats = [
  { value: "CMYK+W", label: "Color System" },
  { value: "Bulk", label: "Order Ready" },
  { value: "Sharp", label: "Transfer Detail" },
];

const processSteps = [
  {
    title: "Ink & Head System",
    text: "Stable ink flow helps produce clean details, smooth color gradients, and strong white backing.",
    image: printHeadImg,
  },
  {
    title: "Print Output",
    text: "Artwork is printed on transfer film with rich color so the final press looks bright and durable.",
    image: printOutputImg,
  },
  {
    title: "Color Supply",
    text: "Dedicated ink channels support repeatable color quality for custom and bulk production runs.",
    image: inkSystemImg,
  },
  {
    title: "Press Ready Finish",
    text: "Finished transfers are prepared for pressing on t-shirts, hoodies, uniforms, and merchandise.",
    image: pressFinishImg,
  },
];

const arrowRanges = [
  [0.12, 0.28],
  [0.42, 0.58],
  [0.72, 0.88],
];

const ProcessArrow = ({ progress, index }) => {
  const [start, end] = arrowRanges[index];
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const scale = useTransform(progress, [start, end], [0.65, 1]);
  const x = useTransform(progress, [start, end], [-18, 0]);

  return (
    <Motion.div
      style={{ opacity, scale, x }}
      className="process-arrow"
      aria-hidden="true"
    >
      <svg viewBox="0 0 512 512" focusable="false">
        <path d="M133 28C70 50 22 101 12 164C2 229 35 285 93 310C143 332 205 331 258 311" />
        <path d="M258 311C222 307 191 289 175 259C154 219 170 166 215 121C256 79 304 70 328 96C354 123 343 174 300 219C264 256 214 281 175 288" />
        <path d="M175 288C180 375 251 444 339 452C409 458 470 427 500 374" />
        <path d="M425 377L501 374L489 451" />
      </svg>
    </Motion.div>
  );
};

const Services = () => {
  const processRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: processRef,
    offset: ["start center", "end center"],
  });

  return (
    <section className="services-showcase" aria-labelledby="services-heading">
      <div className="services-shell">
        <Motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65 }}
          className="services-heading"
        >
          <p className="services-eyebrow">Our Machine</p>
          <h2 id="services-heading">Professional DTF Printing Setup</h2>
          <p>
            We use a dedicated DTF production machine to create bright,
            detailed, and press-ready transfers for custom apparel and bulk
            orders.
          </p>
        </Motion.div>

        <div className="services-feature-grid">
          <Motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="services-machine-card"
          >
            <div className="machine-orbit" />
            <img src={machineImg} alt="Professional DTF printing machine" />
            <span className="machine-badge machine-badge-top">
              DTF Transfer Machine
            </span>
            <span className="machine-badge machine-badge-bottom">
              Print, Powder, Cure
            </span>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="services-info-card"
          >
            <p className="services-eyebrow">What It Delivers</p>
            <h3>Clean Transfers With Consistent Production Quality</h3>
            <p>
              The machine helps us control film movement, ink flow, white
              backing, and output quality so every transfer is ready for a clean
              press on fabric.
            </p>

            <div className="machine-stat-grid">
              {machineStats.map((stat) => (
                <div key={stat.label} className="machine-stat">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </Motion.div>
        </div>

        <div ref={processRef} className="services-process-scroll">
          <div className="services-process-sticky">
            <div className="services-process-grid">
              {processSteps.map((step, index) => (
                <div key={step.title} className="process-card-wrap">
                  <Motion.article
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.22 }}
                    transition={{ duration: 0.55, delay: index * 0.08 }}
                    className="process-card"
                  >
                    <img src={step.image} alt={step.title} loading="lazy" />
                    <div>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <h3>{step.title}</h3>
                      <p>{step.text}</p>
                    </div>
                  </Motion.article>

                  {index < processSteps.length - 1 ? (
                    <ProcessArrow progress={scrollYProgress} index={index} />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
