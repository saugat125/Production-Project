import { Link } from "react-router-dom"

function Navbar(){
    const isAuthenticated = localStorage.getItem('token')
    const name = localStorage.getItem('name')

    const logout = () =>{
      localStorage.removeItem('token')
      localStorage.removeItem('refresh')
      localStorage.removeItem('name')
      window.location.href = '/'
    }

    return (
      <div className="navigation">
        <div className="header flex justify-between mx-[100px] mt-[30px] items-center">
          <div className="header-item">
            <h4 className="font-bold">
              <Link to="/" className="nav-link">
                HealthVault
              </Link>
            </h4>
          </div>
          <div className="header-item flex gap-10">
            <Link
              to="/"
              className="nav-link hover:text-[#1E40AF] transition-all-duration-300"
            >
              Home
            </Link>
            <Link
              to="/contact"
              className="nav-link hover:text-[#1E40AF] transition-all-duration-300"
            >
              Contact Us
            </Link>
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

          {!isAuthenticated ? (
            <div className="header-item flex gap-10">
              <Link
                to="/signup"
                className="hover:text-[#1E40AF] transition-all-duration-300"
              >
                Signup
              </Link>
              <Link
                to="/login"
                className="hover:text-[#1E40AF] transition-all-duration-300"
              >
                Login
              </Link>
            </div>
          ) : (
            <div className="header-item flex gap-8 items-center">
              <div className="user">
                <Link to="/patient-profile">
                  <div className="account flex gap-3 items-center">
                    <img src="/images/user.png" alt="" className="w-6 h-6" />
                    <p className="text-black">{name}</p>
                  </div>
                </Link>
              </div>
              <button onClick={logout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    );
}

export default Navbar