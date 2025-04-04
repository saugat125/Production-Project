import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

function Contact() {
  return (
    <div className="contact-page">
      {/* Navbar */}
      <div className="nav mb-[40px]">
        <Navbar />
      </div>

      {/* Contact Us */}
      <section className="contact-section bg-[linear-gradient(to_bottom,#EFF6FF,#FFFFFF)]">
        <div className="mx-[200px]">
          <div className="main-container flex justify-between items-center mb-[100px] pt-16">
            {/* Details */}
            <div className="contact-container w-[50%] mt-[-80px]">
              <div className="title">
                <h1>Contact Us</h1>
              </div>
              <div className="paragraph mt-4 mb-8 w-[75%]">
                <p>
                  Email, call or submit the form to contact us or tell us what
                  you have got in mind
                </p>
              </div>
              <div className="details">
                <p className="mb-2">example@gmail.com</p>
                <p className="mb-8">+977-9800000000</p>
              </div>
              <div className="logo flex gap-6">
                <img src="/images/facebook.png" alt="" className="w-6 h-6" />
                <img src="/images/twitter.png" alt="" className="w-6 h-6" />
                <img src="/images/insta.png" alt="" className="w-6 h-6" />
                <img src="/images/linkedin.png" alt="" className="w-6 h-6" />
              </div>
            </div>
            {/* Form */}
            <div className="form-container w-[40%] px-8 py-10 rounded-lg shadow-custom border bg-white">
              <div className="text">
                <h2>Get in Touch</h2>
                <p className="mt-2 mb-8">Tell us how can we help you</p>
              </div>
              <div className="form">
                <form>
                  <div className="names grid grid-cols-2 gap-4 mb-5">
                    <input
                      type="text"
                      placeholder="First name"
                      className="rounded-lg w-full border border-[#a3a3a3]"
                    />
                    <input
                      type="text"
                      placeholder="Last name"
                      className="rounded-lg w-full border border-[#a3a3a3]"
                    />
                  </div>
                  <div className="email mb-5">
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="rounded-lg w-full border border-[#a3a3a3]"
                    />
                  </div>
                  <div className="message mb-7">
                    <textarea
                      placeholder="How can we help?"
                      className="rounded-lg w-full border border-[#a3a3a3] h-[140px]"
                    ></textarea>
                  </div>
                  <div className="button">
                    <button
                      type="submit"
                      className=" common-button rounded-xl"
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
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default Contact;
