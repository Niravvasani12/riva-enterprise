import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import WhatsAppButton from "../components/common/Button";

const MainLayout = ({ children }) => {
  return (
    <div className="bg-black text-white font-sans">
      <Navbar />
      {children}
      <WhatsAppButton /> <Footer />
    </div>
  );
};

export default MainLayout;
