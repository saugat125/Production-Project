import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import TestimonialsSection from '../Components/testimonial';

function Home() {
  return (
    <div className="home-page">
      {/* Navbar */}
      <div className="nav mb-8 md:mb-16 lg:mb-[120px]">
        <Navbar />
      </div>

      {/* Banner Text */}
      <section className="head-section px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-[120px]">
            <div className="title w-full lg:w-2/5">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 lg:mb-0">
                Discover Your Health with Our Smart App
              </h1>
            </div>
            <div className="text w-full lg:w-1/2">
              <p className="mb-6 md:mb-[30px]">
                Our innovative application helps you identify potential diseases
                based on your symptoms. Connect with specialized doctors and
                manage your health seamlessly.
              </p>
              <div className="buttons flex flex-wrap gap-4">
                <button className="bg-[#2563EB] text-white px-6 py-2 text-[14px] font-bold hover:shadow-md transition-all duration-300">
                  <Link to="/prediction" className="nav-link">
                    Get Started
                  </Link>
                </button>
                <button className="border border-gray-800 text-gray-800 px-6 py-2 text-[14px] font-bold hover:shadow-md transition-all duration-300">
                  <a href="#about-us">Learn More</a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Image */}
      <section className="banner-section px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="image-container mt-10 md:mt-[40px] lg:mt-[70px] mb-16 md:mb-24 lg:mb-[160px]">
            <img 
              src="/images/banner.jpg"
              alt="banner"
              className="w-full h-auto md:h-[400px] lg:h-[570px] object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="features-section px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="head text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold w-full md:w-3/4 lg:w-1/2 mx-auto text-[#1E40AF]">
              Transform Your Health Journey with Technology
            </h2>
            <p className="w-full md:w-4/5 lg:w-3/5 mx-auto mt-4 lg:mt-[20px] mb-10 lg:mb-[60px]">
              Our application offers precise disease predictions based on your
              symptoms, connecting you with specialists who can provide tailored
              care. Experience seamless management of your health records with
              enhanced security and accessibility.
            </p>
          </div>

          <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-14 mb-16 md:mb-24 lg:mb-[160px]">
            <div className="feature-card bg-[#EFF6FF] p-6 md:p-8 rounded-lg text-center shadow-lg">
              <div className="icon flex justify-center mb-4 md:mb-6">
                <img
                  src="/images/feature1.png"
                  alt=""
                  className="w-16 h-16 md:w-20 md:h-20 lg:w-[80px] lg:h-[80px]"
                />
              </div>
              <h3 className="text-lg font-bold mb-4 md:mb-8 text-[#1D3D8E]">
                Symptom Based Disease Prediction
              </h3>
              <p className="text-sm text-gray-700">
                Get accurate predictions of potential diseases based on your
                reported symptoms.
              </p>
            </div>

            <div className="feature-card bg-[#EFF6FF] p-6 md:p-8 rounded-lg text-center shadow-lg">
              <div className="icon flex justify-center mb-4 md:mb-6">
                <img
                  src="/images/feature2.png"
                  alt=""
                  className="w-16 h-16 md:w-20 md:h-20 lg:w-[80px] lg:h-[80px]"
                />
              </div>
              <h3 className="text-lg font-bold mb-4 md:mb-8 text-[#1D3D8E]">
                Recommend Specialized Doctors
              </h3>
              <p className="text-sm text-gray-700">
                Easily connect with doctors who specialize in your predicted
                health concerns.
              </p>
            </div>

            <div className="feature-card bg-[#EFF6FF] p-6 md:p-8 rounded-lg text-center shadow-lg md:col-span-2 lg:col-span-1 md:mx-auto md:max-w-md lg:max-w-none">
              <div className="icon flex justify-center mb-4 md:mb-6">
                <img
                  src="/images/feature3.png"
                  alt=""
                  className="w-16 h-16 md:w-20 md:h-20 lg:w-[80px] lg:h-[80px]"
                />
              </div>
              <h3 className="text-lg font-bold mb-4 md:mb-8 text-[#1D3D8E]">
                Patient Details and Medical History
              </h3>
              <p className="text-sm text-gray-700">
                Easily store and view patient details and view their medical
                reports and history.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about-us" className="about-section px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="about-container flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-[90px] justify-between mb-12 md:mb-16 lg:mb-[100px]">
            <div className="text w-full lg:w-[55%] order-2 lg:order-1">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1E40AF] mb-6 lg:mb-[40px]">
                About Us
              </h2>
              <p>
                At HealthVault, we believe in transforming healthcare through
                the power of technology. Our platform combines intelligent
                disease prediction, secure electronic health record (EHR)
                management, and personalized doctor recommendations to provide
                users with timely, reliable, and accessible medical support.
                Using advanced machine learning models, we enable users to input
                their symptoms and receive insights into potential health
                conditions, along with guidance on finding the right medical
                specialists.
              </p>
              <br />
              <p>
                Our mission is to bridge the gap between patients and healthcare
                professionals by simplifying the diagnostic journey and
                promoting proactive care. Whether you're managing your personal
                health or assisting a loved one, our intuitive and secure system
                is designed to help you make informed decisions. We are
                committed to innovation, privacy, and usability—ensuring that
                our solution is not only smart but also trustworthy and easy to
                use.
              </p>
            </div>
            <div className="image-container w-full lg:w-[45%] order-1 lg:order-2">
              <img
                src="/images/aboutus.jpg"
                alt="About HealthVault"
                className="w-full h-auto md:h-[350px] lg:h-[450px] object-cover rounded-lg opacity-90"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <TestimonialsSection />

      {/* Footer */}
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default Home;
