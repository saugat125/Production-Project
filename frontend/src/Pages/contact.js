import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

function Contact() {
  return (
    <div className="contact-page">
      {/* Navbar */}
      <div className="nav mb-8 md:mb-10">
        <Navbar />
      </div>

      {/* Contact Us */}
      <section className="contact-section bg-gradient-to-b from-blue-50 to-white px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center py-8 md:py-12 lg:py-16 gap-10 lg:gap-6">
            {/* Details */}
            <div className="contact-container w-full lg:w-1/2">
              <div className="title">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                  Contact Us
                </h1>
              </div>
              <div className="paragraph mt-3 md:mt-4 mb-6 md:mb-8 w-full md:w-4/5 lg:w-3/4">
                <p className="text-sm md:text-base text-gray-700">
                  Email, call or submit the form to contact us or tell us what
                  you have got in mind
                </p>
              </div>
              <div className="details text-sm md:text-base">
                <p className="mb-2">healthvault@gmail.com</p>
                <p className="mb-6 md:mb-8">+977-9800000000</p>
              </div>
              <div className="logo flex gap-4 md:gap-6 mb-10 lg:mb-0">
                <img
                  src="/images/facebook.png"
                  alt="Facebook"
                  className="w-5 h-5 md:w-6 md:h-6"
                />
                <img
                  src="/images/twitter.png"
                  alt="Twitter"
                  className="w-5 h-5 md:w-6 md:h-6"
                />
                <img
                  src="/images/insta.png"
                  alt="Instagram"
                  className="w-5 h-5 md:w-6 md:h-6"
                />
                <img
                  src="/images/linkedin.png"
                  alt="LinkedIn"
                  className="w-5 h-5 md:w-6 md:h-6"
                />
              </div>
            </div>

            {/* Form */}
            <div className="form-container w-full lg:w-5/12 px-4 sm:px-6 md:px-8 py-6 md:py-8 lg:py-10 rounded-lg shadow-md border bg-white">
              <div className="text">
                <h2 className="text-xl md:text-2xl font-semibold">
                  Get in Touch
                </h2>
                <p className="mt-1 md:mt-2 mb-6 md:mb-8 text-sm md:text-base text-gray-600">
                  Tell us how can we help you
                </p>
              </div>
              <div className="form">
                <form>
                  <div className="names grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 md:mb-5">
                    <input
                      type="text"
                      placeholder="First name"
                      className="rounded-lg w-full border border-gray-300 p-2 md:p-3"
                    />
                    <input
                      type="text"
                      placeholder="Last name"
                      className="rounded-lg w-full border border-gray-300 p-2 md:p-3"
                    />
                  </div>
                  <div className="email mb-4 md:mb-5">
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="rounded-lg w-full border border-gray-300 p-2 md:p-3"
                    />
                  </div>
                  <div className="message mb-5 md:mb-7">
                    <textarea
                      placeholder="How can we help?"
                      className="rounded-lg w-full border border-gray-300 p-2 md:p-3 h-24 md:h-32"
                    ></textarea>
                  </div>
                  <div className="button">
                    <button
                      type="submit"
                      className="common-button rounded-xl bg-blue-600 text-white py-2 md:py-3 px-6 md:px-8 w-full sm:w-auto"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="footer mt-10 md:mt-16">
        <Footer />
      </div>
    </div>
  );
}

export default Contact;
