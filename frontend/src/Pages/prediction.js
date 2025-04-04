import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";

function Prediction(){
    return (
      <div>
        <div className="nav">
          <Navbar />
        </div>

        <div className="prediction-page py-10 my-8 bg-[linear-gradient(to_bottom,#EFF6FF,#FFFFFF)]">
          {/* Title */}
          <section className="title-section">
            <div className="text-container text-center mb-24">
              <h3 className="mb-3">Feeling Unwell? Let's Check</h3>
              <p className="max-w-3xl m-auto">
                Describe your symptoms, and our AI-powered system will analyze
                them to predict possible diseases—all in just a few seconds
              </p>
            </div>
          </section>

          {/* Symptom Checker */}
          <section className="symptom-section mb-24">
            <div className="custom-container">
              <div className="title mb-6">
                <h4 className="font-medium">Enter your Symptoms</h4>
              </div>
              <div className="form">
                <form>
                  <div className="textfield mb-4">
                    <input
                      type="text"
                      className="rounded-2xl w-[45%] border border-[#a3a3a3]"
                    />
                  </div>
                  <div className="tag flex gap-4 mb-8">
                    <div className="flex items-center bg-[#D1FAE5] text-[#15803D] px-3 py-1 rounded-full">
                      <button className="mr-2 text-[#15803D]">✕</button>
                      Headache
                    </div>
                    <div className="flex items-center bg-[#D1FAE5] text-[#15803D] px-3 py-1 rounded-full">
                      <button className="mr-2 text-[#15803D]">✕</button>
                      Headache
                    </div>
                  </div>
                  <div className="button">
                    <button className="common-button rounded-2xl mt-2">
                      Check My Symptoms
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>

          {/* Results */}
          <section className="result-section">
            <div className="custom-container">
              <div className="title">
                <h3 className="mb-8">Results</h3>
              </div>
              <div className="results mb-20">
                <div className="bg-white px-10 pt-10 pb-16 rounded-2xl w-[90%] shadow-lg border">
                  <h4 className="disease font-bold mb-4">Migraine</h4>
                  <p className="text-gray-700 mb-14">
                    A migraine is a type of headache that causes intense
                    throbbing pain, often accompanied by nausea or sensitivity
                    to light.
                  </p>

                  <div className="symptoms mb-14">
                    <h5 className="mb-4">Symptoms</h5>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      <li>Lorem ipsum dolor sit amet, consectetur </li>
                      <li>Lorem ipsum dolor sit amet, consectetur </li>
                      <li>Lorem ipsum dolor sit amet, consectetur </li>
                      <li>Lorem ipsum dolor sit amet, consectetur </li>
                    </ul>
                  </div>

                  <div className="prevention">
                    <h5 className="mb-4">Prevention Tips</h5>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      <li>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                      </li>
                      <li>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Recommend Doctor */}
          <section className="doctor-section">
            <div className="custom-container">
              <div className="title">
                <h3 className="mb-6">Recommended Doctor</h3>
              </div>
              <div className="main-container mb-8">
                <div className="doctor shadow-lg border bg-[linear-gradient(to_bottom,#EFF6FF,#FFFFFF)] p-8 rounded-lg flex items-center justify-between w-[60%]">
                  <div className="flex items-center gap-8">
                    <div className="image-container w-16 h-16">
                      <img
                        src="/images/doctor.png"
                        alt=""
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div className="details">
                      <h5 className="">Dr. John Morgan </h5>
                      <p className="text-gray-600">Neurologist</p>
                    </div>
                  </div>
                  <button className="green-button rounded-2xl">
                    <Link to="/appointment">Book an appointment</Link>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="footer">
          <Footer />
        </div>
      </div>
    );
}

export default Prediction;