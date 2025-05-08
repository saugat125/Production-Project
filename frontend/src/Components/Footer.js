import { Link } from 'react-router-dom';

function Footer(){
    return (
      <footer>
        <div className="footer-container bg-[#EFF6FF]">
          <div className="custom-container">
            <div className="main-container flex justify-between pt-20">
              <div className="left-footer">
                <h2 className="w-[80%] mb-7 mt-5 text-[#1E40AF]">
                  Empowering Your Health Journey
                </h2>
                <p>
                  Connect with us for personalized health insights and support.
                </p>
              </div>
              <div className="right-footer flex gap-24 mr-5">
                <div className="column flex flex-col gap-4">
                  <Link
                    to="/"
                    className="nav-link hover:text-[#1E40AF] transition-all-duration-300"
                  >
                    Home
                  </Link>
                  <a
                    href="/#about-us"
                    className="nav-link hover:text-[#1E40AF] transition-all-duration-300"
                  >
                    About Us
                  </a>
                  <Link
                    to="/contact"
                    className="nav-link hover:text-[#1E40AF] transition-all-duration-300"
                  >
                    Contact Us
                  </Link>
                  <a
                    href="/#features"
                    className="nav-link hover:text-[#1E40AF] transition-all-duration-300"
                  >
                    Features
                  </a>
                </div>
                <div className="column flex flex-col gap-4">
                  <a
                    href="/#review"
                    className="nav-link hover:text-[#1E40AF] transition-all-duration-300"
                  >
                    Review
                  </a>
                  <Link
                    to="/prediction"
                    className="nav-link hover:text-[#1E40AF] transition-all-duration-300"
                  >
                    Symptom Checker
                  </Link>
                  <Link
                    to="/doctors"
                    className="nav-link hover:text-[#1E40AF] transition-all-duration-300"
                  >
                    Doctors
                  </Link>
                </div>
              </div>
            </div>

            <div className="bottom-footer mt-16 pb-12 mr-5 flex justify-between items-end">
              <div className="copyright">
                <p>© 2025 HealthVault. All rights reserved.</p>
              </div>
              <div className="social">
                <h5 className="mb-8">Social</h5>
                <div className="logo flex gap-6">
                  <img src="/images/facebook.png" alt="" className="w-6 h-6" />
                  <img src="/images/twitter.png" alt="" className="w-6 h-6" />
                  <img src="/images/insta.png" alt="" className="w-6 h-6" />
                  <img src="/images/linkedin.png" alt="" className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
}

export default Footer;