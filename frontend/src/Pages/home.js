import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

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
                <button class="bg-[#2563EB] text-white px-6 py-2 text-[14px] font-bold">
                  <Link to="/prediction" className="nav-link">
                    Get Started
                  </Link>
                </button>
                <button class="border border-gray-800 text-gray-800 px-6 py-2 text-[14px] font-bold">
                  Learn More
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
      <section className="features-section">
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
      <section className="about-section">
        <div className="custom-container">
          <div className="about-container flex gap-[90px] justify-between mb-[100px]">
            <div className="text w-[55%]">
              <h2 className="text-[#1E40AF] mb-[40px]">About Us</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <br />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
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

      {/* Footer */}
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default Home;
