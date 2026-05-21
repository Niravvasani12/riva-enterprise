import "./Achievement.css";
import cert from "../assets/images/About/a3.png";

const Achievement = () => {
  return (
    <section className="achievement-section">
      {/* Glow Background */}
      <div className="achievement-glow"></div>

      <div className="achievement-container">
        {/* LEFT CONTENT */}
        <div className="achievement-left">
          <h2>Recognition & Achievement</h2>

          <p className="desc">
            We are proud to be recognized for our dedication to quality,
            innovation, and consistency in Direct-to-Film (DTF) printing.
          </p>

          <p className="desc-light">
            This certificate honors <span>Vivek Prajapati</span> for over 5
            years of excellence in delivering high-quality printing solutions
            and building strong client relationships in the industry.
          </p>

          <div className="certificate-meta">
            <p>Certified by Xenons Solution</p>
            <h4>May 7, 2024</h4>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="achievement-right">
          <div className="image-glow"></div>

          <img src={cert} alt="Certificate" />
        </div>
      </div>
    </section>
  );
};

export default Achievement;
