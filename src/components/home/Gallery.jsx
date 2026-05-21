import img1 from "../../assets/images/OurWork/i1.png";
import img2 from "../../assets/images/OurWork/i2.png";
import img3 from "../../assets/images/OurWork/i3.png";
import img4 from "../../assets/images/OurWork/i4.png";
import img5 from "../../assets/images/OurWork/i5.png";
import img6 from "../../assets/images/OurWork/i6.png";
import img7 from "../../assets/images/OurWork/i7.png";
import img8 from "../../assets/images/OurWork/i8.png";
import img9 from "../../assets/images/OurWork/i9.png";
import img10 from "../../assets/images/OurWork/i10.png";

import "./Gallery.css";

const galleryImages = [
  { src: img1, alt: "Custom DTF t-shirt print", speed: "slower" },
  { src: img2, alt: "Bulk DTF printing output", speed: "faster" },
  { src: img3, alt: "Detailed color transfer print", speed: "slower vertical" },
  { src: img8, alt: "saree lace beautiful", speed: "slower slower2" },
  { src: img5, alt: "Fabric print sample", speed: "" },
  { src: img6, alt: "Solid 3D Print", speed: "slower" },
  { src: img7, alt: "Sharp transfer quality", speed: "faster1" },
  { src: img8, alt: "saree lace beautiful", speed: "slower slower2" },
  { src: img9, alt: "Custom apparel print", speed: "" },
  { src: img10, alt: "Production-ready DTF print", speed: "slower last" },
  { src: img4, alt: "Premium neck design print", speed: "slower slower-down" },
];

const Gallery = () => {
  const renderGalleryItems = (isClone = false) =>
    galleryImages.map((image, index) => (
      <div
        key={`${isClone ? "clone" : "original"}-${image.alt}-${index}`}
        className={`img-wrapper ${image.speed} ${
          isClone ? "mobile-gallery-clone" : ""
        }`.trim()}
        aria-hidden={isClone ? "true" : undefined}
      >
        <figure>
          <img src={image.src} alt={isClone ? "" : image.alt} loading="lazy" />
          <figcaption>{image.alt}</figcaption>
        </figure>
      </div>
    ));

  return (
    <section className="gallery-parallax" aria-labelledby="gallery-heading">
      <div className="gallery-copy">
        <p className="gallery-eyebrow">Scroll Gallery</p>
        <h2 id="gallery-heading">Our Gallery</h2>
        <p>
          CSS-only horizontal parallax inspired presentation for our premium DTF
          print work.
        </p>
      </div>

      <p className="gallery-scroll-info">
        <span className="gallery-scroll-icon" aria-hidden="true">
          <svg viewBox="0 0 100 100" focusable="false">
            <path d="M50 67.1c-.6 0-1.2-.2-1.8-.7L36.7 54.9c-2.3-2.3 1.2-5.8 3.5-3.5l7.4 7.4V17.6c0-.6.2-1.2.5-1.5.4-.6 1.1-1 2-.9 13.7.3 26.4 7.2 33.5 19.1 12.9 21.6 1.1 50.7-23.4 57.3-24.7 6.6-48.6-12.5-49.1-37.6-.1-3.2 4.9-3.2 5 0 .3 13.8 8.4 26.4 21.3 31.5 12.5 5 27.1 1.9 36.6-7.5s12.5-24.1 7.5-36.6c-4.8-12.1-16.3-20.1-29-21.2v38.3l7.4-7.4c2.3-2.3 5.8 1.3 3.5 3.5L51.6 66.4c-.4.5-1 .7-1.6.7z" />
          </svg>
        </span>
        Try scrolling down
      </p>

      <div className="horizontal-scroll-wrapper">
        {renderGalleryItems()}
        {renderGalleryItems(true)}
      </div>
    </section>
  );
};

export default Gallery;
