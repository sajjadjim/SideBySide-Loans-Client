import HeroSection from "./Sections/HeroSection";
import HowitWorks from "./Sections/HowitWorks";
import Brands from "./Sections/Brands";
import CTASection from "./Sections/CTASection";
import Reviews from "./Sections/Reviews";
import LoanCategories from "./Sections/LoanCategories";



const Home = () => {

  return (
    <div className="home-page">
      <HeroSection />

       <div>
       
       <LoanCategories/>
      </div>

 
      <div className="" >
        <HowitWorks/>
      </div>
<div>
  <div>
  <Brands/>
</div>
</div>
      <CTASection/>
      <Reviews/>

    
     
      
    </div>
  );
};

export default Home;
