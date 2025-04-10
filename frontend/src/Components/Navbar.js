import { Link } from "react-router-dom"

function Navbar(){
    const isAuthenticated = localStorage.getItem('token')

    return (
      <div className="navigation">
        <div className="header flex justify-between mx-[100px] mt-[30px]">
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
          { (!isAuthenticated)?(
            <div className="header-item flex gap-10">
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </div>
          ):
          <p>user</p>
            
          }

        </div>
      </div>
    );
}

export default Navbar