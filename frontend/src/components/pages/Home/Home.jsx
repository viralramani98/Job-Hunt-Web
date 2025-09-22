import Navbar from "../../common/Navbar/Navbar";
import HeroSection from "../../homeComponents/HeroSection/HeroSection";
import CatagoryCarousel from "../../homeComponents/CatagoryCarousel/CatagoryCarousel";
import Footer from "../../homeComponents/Footer/Footer";
import Latestjobs from "../../homeComponents/Latestjobs/Latestjobs";

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CatagoryCarousel />
      <Latestjobs />
      <Footer />
    </div>
  );
};

export default Home;
