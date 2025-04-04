import { Link } from "react-router-dom";

function Login(){
    return (
      <div className="login-page bg-[linear-gradient(to_bottom,#b6ddf2,#f2f6fc)]">
        <section className="login-section">
          <div className="login-container pt-16 pb-14">
            <div className="main-container max-w-lg mx-auto rounded-3xl shadow-custom border px-14 py-14 bg-[linear-gradient(to_bottom,#c3f1fc,#FFFFFF)]">
              <div className="image-container mb-6 flex justify-center">
                <img src="/images/in.png" alt="" className="w-16 h-16" />
              </div>
              <div className="text-container mb-12 text-center">
                <h3 className="mb-2">Welcome Back!</h3>
                <p>Enter your credientials to login to your account</p>
              </div>
              {/* Form */}
              <div className="form">
                <form>
                  {/* Email */}
                  <div className="email mb-4 relative">
                    <div className="logo absolute left-3 top-1/2 transform -translate-y-1/2">
                      <img src="images/email.png" alt="" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="w-full p-2 pl-12 border border-[#a3a3a3] rounded-lg"
                      required
                    />
                  </div>
                  {/* Password */}
                  <div className="password mb-4 relative">
                    <div className="logo absolute left-3 top-1/2 transform -translate-y-1/2 ">
                      <img src="images/password.png" alt="" />
                    </div>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="w-full p-2 pl-12 border border-[#a3a3a3] rounded-lg"
                      required
                    />
                  </div>
                  {/* Checkbox */}
                  <div className="checkbox flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <label className="text-sm">Remember me</label>
                    </div>
                    <Link to="" className="text-sm">
                      Forgot Password?
                    </Link>
                  </div>
                  {/* Button */}
                  <div className="button">
                    <button type="submit" className="black-button rounded-xl">
                      Get Started
                    </button>
                  </div>
                </form>
                {/* Signup */}
                <div className="signup text-center mt-8 text-sm">
                  Don't have an account yet?
                  <Link to="/signup" className="font-semibold ml-1">
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
}

export default Login;