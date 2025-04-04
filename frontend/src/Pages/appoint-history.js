import Navbar from '../Components/Navbar';
import ProfieSidebar from '../Components/ProfileSidebar';

function AppointmentHistory() {
  return (
    <div>
      <div className="nav">
        <Navbar />
      </div>

      <div className="appoint-history-page py-10 my-6 bg-[linear-gradient(to_bottom,#EFF6FF,#FFFFFF)]">
        <div className="appointl-history">
          <div className="custom-container">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar */}
              <ProfieSidebar />

              {/* Appointment History */}
              <div className="appointment flex-1 bg-[#f6f6f6] rounded-3xl p-8 shadow-custom border h-[500px]">
                <div className="title">
                  <h4 className="text-3xl mb-14">Appointment History</h4>
                </div>

                {/* Appointment Detail */}
                <div className="appointments space-y-4">
                  <div className="item flex items-center gap-28">
                    <div className="flex items-center">
                      <div className="logo w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4 border">
                        <img src="/images/history.png" alt="" />
                      </div>
                      <div className="details">
                        <p className="font-medium">Cardiologist</p>
                        <p className="text-gray-600 text-sm">Dr. John Wick</p>
                      </div>
                    </div>

                    <div className="time text-gray-700">
                      <p>10:00 - 11:00. 10 March, 2025</p>
                    </div>

                    <button className="border border-[#2563EB] text-[#2563EB] rounded-3xl px-6 py-1 text-sm flex items-center space-x-1">
                      <span className="font-semibold">Cancel</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentHistory;
