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
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                  <Link to="/" className="nav-link">
                    About Us
                  </Link>
                  <Link to="/" className="nav-link">
                    Contact Us
                  </Link>
                  <Link to="/" className="nav-link">
                    Features
                  </Link>
                </div>
                <div className="column flex flex-col gap-4">
                  <Link to="/" className="nav-link">
                    Review
                  </Link>
                  <Link to="/" className="nav-link">
                    Symptom Checker
                  </Link>
                  <Link to="/" className="nav-link">
                    Doctors
                  </Link>
                </div>
              </div>
            </div>

            <div className="bottom-footer mt-16 pb-12 mr-5 flex justify-between items-end">
              <div className="copyright">
                <p>© 2025 Health. All rights reserved.</p>
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