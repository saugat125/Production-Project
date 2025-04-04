import { Link } from "react-router-dom";

function ProfieSidebar(){
    return (
      <div className="sidebar w-full h-2/3 md:w-80 bg-[#f6f6f6] rounded-3xl p-8 pb-14 shadow-custom border">
        <h5 className="title text-3xl mb-10 text-[#1E40AF]">Account Details</h5>
        <nav className="items space-y-6">
          <Link
            to="/patient-profile"
            className="flex items-center space-x-3 text-gray-800"
          >
            <img src="/images/name.png" alt="" />
            <span className="text-xl">Patient</span>
          </Link>

          <Link
            to="/medical-history"
            className="flex items-center space-x-3 text-gray-800"
          >
            <img src="/images/medical.png" alt="" />
            <span className="text-xl">Medical History</span>
          </Link>

          <Link
            to="/appoint-history"
            className="flex items-center space-x-3 text-gray-800"
          >
            <img src="/images/appointment.png" alt="" />
            <span className="text-xl">Appointment</span>
          </Link>

          <Link
            to="/logout"
            className="flex items-center space-x-3 text-gray-800"
          >
            <img src="/images/logout.png" alt="" />
            <span className="text-xl">Logout</span>
          </Link>
        </nav>
      </div>
    );
}

export default ProfieSidebar;