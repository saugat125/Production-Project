import { Link } from "react-router-dom";

function Signup(){
    return (
      <div className="signup-page bg-[linear-gradient(to_bottom,#b6ddf2,#f2f6fc)]">
        <section className="signup-section">
          <div className="login-container pt-10 pb-14">
            <div className="main-container max-w-lg mx-auto rounded-3xl shadow-custom border px-14 py-10 bg-[linear-gradient(to_bottom,#c3f1fc,#FFFFFF)]">
              <div className="image-container mb-4 flex justify-center">
                <img src="/images/in.png" alt="" className="w-16 h-16" />
              </div>
              <div className="text-container mb-10 text-center">
                <h3 className="mb-1">Create your account</h3>
                <p>Enter your credientials to create a new account</p>
              </div>
              {/* Form */}
              <div className="form">
                <form>
                  {/* Name */}
                  <div className="name mb-4 relative">
                    <div className="logo absolute left-3 top-1/2 transform -translate-y-1/2">
                      <img src="images/name.png" alt="" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      className="w-full p-2 pl-12 border border-[#a3a3a3] rounded-lg"
                      required
                    />
                  </div>
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
                  <div className="confirm-password mb-4 relative">
                    <div className="logo absolute left-3 top-1/2 transform -translate-y-1/2 ">
                      <img src="images/password.png" alt="" />
                    </div>
                    <input
                      type="password"
                      name="confirm_password"
                      placeholder="Confirm Password"
                      className="w-full p-2 pl-12 border border-[#a3a3a3] rounded-lg"
                      required
                    />
                  </div>
                  {/* Age */}
                  <div className="Age mb-4 relative">
                    <div className="logo absolute left-3 top-1/2 transform -translate-y-1/2 ">
                      <img src="images/age.png" alt="" />
                    </div>
                    <input
                      type="text"
                      name="age"
                      placeholder="Age"
                      className="w-full p-2 pl-12 border border-[#a3a3a3] rounded-lg"
                      required
                    />
                  </div>
                  {/* Gender */}
                  <div className="gender mb-6 relative">
                    <div className="logo absolute left-3 top-1/2 transform -translate-y-1/2 ">
                      <img src="images/name.png" alt="" />
                    </div>
                    <select className="w-full p-2 pl-12 border border-[#a3a3a3] rounded-lg text-gray-400">
                      <option value="">Gender</option>
                      <option value="male" className="text-black">
                        Male
                      </option>
                      <option value="female" className="text-black">
                        Female
                      </option>
                    </select>
                  </div>
                  {/* Button */}
                  <div className="button">
                    <button type="submit" className="black-button rounded-xl">
                      Sign Up
                    </button>
                  </div>
                </form>
                {/* Login */}
                <div className="signup text-center mt-8 text-sm">
                  Already have an account?
                  <Link to="/login" className="font-semibold ml-1">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
}

export default Signup;