import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";
import ContactForm from "../components/contact/ContactForm";
// import image from "../assets/images/image.png";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  WHATSAPP_LINK,
} from "../utils/constants";

const Contact = () => {
  return (
    <section className="min-h-screen bg-black px-6 py-20 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="space-y-6">
          <div>
            <h1 className="mb-4 text-4xl font-bold text-green-400">
              Contact Us
            </h1>
            <p className="text-gray-400 leading-relaxed">
              Reach out for custom printing, reseller orders, and bulk
              production support. We will help you choose the right print
              solution quickly.
            </p>
          </div>

          {/* <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-3">
            <img
              src={image}
              alt="DTF print samples"
              className="h-64 w-full rounded-[20px] object-cover"
            />
          </div> */}

          {/* CONTACT INFO */}
          <div className="space-y-4 rounded-3xl border border-white/10 bg-gray-900/70 p-6">
            <a
              href={`tel:${CONTACT_PHONE_DISPLAY.replace(/[^+\d]/g, "")}`}
              className="flex items-center gap-3 text-gray-200 transition hover:text-green-300"
            >
              <FaPhoneAlt className="text-green-400" />
              Phone: {CONTACT_PHONE_DISPLAY}
            </a>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-200 transition hover:text-green-300"
            >
              <FaWhatsapp className="text-green-400" />
              WhatsApp: {CONTACT_PHONE_DISPLAY}
            </a>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center gap-3 break-all text-gray-200 transition hover:text-green-300"
            >
              <FaEnvelope className="text-green-400" />
              Email: {CONTACT_EMAIL}
            </a>

            <p className="flex items-start gap-3 text-gray-200 leading-relaxed">
              <FaMapMarkerAlt className="mt-1 text-green-400 shrink-0" />

              <span>
                <strong className="text-white">Address:</strong> Shop No. 2,
                Godavari Society Vibhag 2, Nr Ganesh Ice Cream, Kiran Chowk,
                Surat - 395010, Gujarat, India
              </span>
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - STICKY FORM */}
        <div className="md:sticky md:top-28 self-start h-fit">
          <div className="rounded-3xl border border-white/10 bg-gray-900 p-4 shadow-xl">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
