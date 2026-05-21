import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  WHATSAPP_LINK,
} from "../../utils/constants";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 text-left md:grid-cols-3">
        <div>
          <h2 className="mb-4 text-xl font-semibold text-white">
            DTF Print Solution
          </h2>
          <p className="text-sm leading-6">
            High-quality DTF printing services for t-shirts, banners, and custom
            designs. We deliver premium prints with fast turnaround.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-green-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-green-400">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-green-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">Contact Us</h3>
          <p className="text-sm">Surat, Gujarat</p>
          <p className="text-sm">{CONTACT_PHONE_DISPLAY}</p>
          <p className="text-sm">{CONTACT_EMAIL}</p>

          <div className="mt-4 flex gap-4">
            <a href="#" className="hover:text-green-400" aria-label="Facebook">
              <FaFacebookF />
            </a>

            <a
              href="https://www.instagram.com/riva_dtf_printing_solution?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 text-center text-sm">
        @ Copyright {new Date().getFullYear()} mitu enterprise. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
