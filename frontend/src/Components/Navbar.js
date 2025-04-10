import { Link } from "react-router-dom"

function Navbar(){
    const isAuthenticated = localStorage.getItem('token')

    const logout = () =>{
      localStorage.removeItem('token')
      localStorage.removeItem('refresh')
      window.location.href = '/'
    }

    return (
      <div className="navigation">
        <div className="header flex justify-between mx-[100px] mt-[30px] items-center">
          <div className="header-item">
            <h3>LOGO</h3>
          </div>
          <div className="header-item flex gap-10">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/contact" className="nav-link">
              Contact Us
            </Link>
            <Link to="/prediction" className="nav-link">
              Symptom Checker
            </Link>
            <Link to="/doctors" className="nav-link">
              Doctors
            </Link>
          </div>

          {!isAuthenticated ? (
            <div className="header-item flex gap-10">
              <Link to="/signup">Signup</Link>
              <Link to="/login">Login</Link>
            </div>
          ) : (
            <div className="header-item flex gap-8 items-center">
              <div className="user">
                <Link to="/patient-profile">
                  <img src="/images/user.png" alt="" className="w-8 h-8" />
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