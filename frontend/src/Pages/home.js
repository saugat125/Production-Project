import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import TestimonialsSection from "../Components/testimonial";

function Home() {
  return (
    <div className="home-page ">
      {/* Navbar */}
      <div className="nav mb-[120px]">
        <Navbar />
      </div>

      {/* Banner Text */}
      <section className="head-section">
        <div className="custom-container">
          <div className="flex items-center justify-between gap-[120px]">
            <div className="title w-[40%]">
              <h1>Discover Your Health with Our Smart App </h1>
            </div>
            <div className="text w-[50%]">
              <p className="mb-[30px]">
                Our innovative application helps you identify potential diseases
                based on your symptoms. Connect with specialized doctors and
                manage your health seamlessly.
              </p>
              <div className="buttons flex space-x-4">
                <button class="bg-[#2563EB] text-white px-6 py-2 text-[14px] font-bold hover:shadow-md transition-all duration-300">
                  <Link to="/prediction" className="nav-link">
                    Get Started
                  </Link>
                </button>
                <button class="border border-gray-800 text-gray-800 px-6 py-2 text-[14px] font-bold hover:shadow-md transition-all duration-300">
                  <a href="#about-us">Learn More</a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Image */}
      <section className="banner-section">
        <div className="custom-container">
          <div className="image-container mt-[70px] mb-[160px]">
            <img
              src="/images/banner.jpg"
              alt="banner"
              className="w-[100%] h-[570px]"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="features-section">
        <div className="custom-container">
          <div className="head text-center">
            <h2 className="w-[40%] m-auto text-[#1E40AF]">
              Transform Your Health Journey with Technology
            </h2>
            <p className="w-[55%] m-auto mt-[20px] mb-[60px]">
              Our application offers precise disease predictions based on your
              symptoms, connecting you with specialists who can provide tailored
              care. Experience seamless management of your health records with
              enhanced security and accessibility.
            </p>
          </div>

          <div className="features-grid grid grid-cols-3 gap-14 mb-[160px] mx-[180px]">
            <div className="feature-card bg-[#EFF6FF] p-8 rounded-lg text-center shadow-custom">
              <div className="icon flex justify-center mb-6">
                <img
                  src="/images/feature1.png"
                  alt=""
                  className="w-[80px] h-[80px]"
                />
              </div>
              <h3 className="text-lg font-bold mb-8 text-[#1D3D8E]">
                Symptom Based Disease Prediction
              </h3>
              <p className="text-sm text-gray-700">
                Get accurate predictions of potential diseases based on your
                reported symptoms.
              </p>
            </div>

            <div className="feature-card bg-[#EFF6FF] p-8 rounded-lg text-center shadow-custom">
              <div className="icon flex justify-center mb-6">
                <img
                  src="/images/feature2.png"
                  alt=""
                  className="w-[80px] h-[80px]"
                />
              </div>
              <h3 className="text-lg font-bold mb-8 text-[#1D3D8E]">
                Recommend Specialized Doctors
              </h3>
              <p className="text-sm text-gray-700">
                Easily connect with doctors who specialize in your predicted
                health concerns.
              </p>
            </div>

            <div className="feature-card bg-[#EFF6FF] p-8 rounded-lg text-center shadow-custom">
              <div className="icon flex justify-center mb-6">
                <img
                  src="/images/feature3.png"
                  alt=""
                  className="w-[80px] h-[80px]"
                />
              </div>
              <h3 className="text-lg font-bold mb-8 text-[#1D3D8E]">
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
      <section id="about-us" className="about-section">
        <div className="custom-container">
          <div className="about-container flex gap-[90px] justify-between mb-[100px]">
            <div className="text w-[55%]">
              <h2 className="text-[#1E40AF] mb-[40px]">About Us</h2>
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
            <div className="image-container w-[45%]">
              <img
                src="/images/aboutus.jpg"
                alt=""
                className="w-[100%] h-[450px] opacity-90"
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
