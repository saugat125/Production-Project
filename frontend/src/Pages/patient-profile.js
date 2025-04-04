import Navbar from "../Components/Navbar";
import ProfieSidebar from "../Components/ProfileSidebar";

function PatientProfle(){
    return (
      <div>
        <div className="nav">
          <Navbar />
        </div>

        <div className="patient-profile-page py-10 my-6 bg-[linear-gradient(to_bottom,#EFF6FF,#FFFFFF)]">
          <div className="patient-dashboard ">
            <div className="">
              <div className="custom-container">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Sidebar */}
                  <ProfieSidebar />

                  {/* Details */}
                  <div className="flex-1 bg-[#f6f6f6] rounded-3xl p-6 shadow-custom border">
                    <div className="card bg-white rounded-3xl overflow-hidden mb-8 shadow-md border">
                      <div className="flex flex-col md:flex-row gap-10">
                        {/* Left side - Profile */}
                        <div className=" left-container p-10 pr-20 border-b md:border-b-0 md:border-r border-gray-300 flex flex-col items-center md:items-start">
                          <div className="image-container w-20 h-20 mb-6">
                            <img
                              src="/images/doctor.png"
                              alt=""
                              className="w-full h-full object-cover rounded-full"
                            />
                          </div>
                          <h4 className="name font-semibold mb-2">
                            Arthur Morgan
                          </h4>
                          <p className="email text-gray-600 mb-5">
                            arthur@gmail.com
                          </p>

                          <button className="border border-[#2563EB] text-[#2563EB] rounded-3xl px-5 py-2 text-sm flex items-center space-x-1">
                            <span className="font-semibold">Edit Profile</span>
                          </button>
                        </div>

                        {/* Right side - Patient details */}
                        <div className="details p-10 pt-20 flex-1">
                          <div className="flex flex-wrap gap-y-10">
                            <div className="item w-1/3">
                              <p className="text-md text-gray-500">Gender</p>
                              <p className="font-medium text-lg">Male</p>
                            </div>

                            <div className="item w-1/3">
                              <p className="text-md text-gray-500">Age</p>
                              <p className="font-medium text-lg">20</p>
                            </div>

                            <div className="item w-1/3">
                              <p className="text-md text-gray-500">Blood</p>
                              <p className="font-medium text-lg">A+</p>
                            </div>

                            <div className="item w-1/3">
                              <p className="text-md text-gray-500">Status</p>
                              <p className="font-medium text-lg">Active</p>
                            </div>

                            <div className="item w-1/3">
                              <p className="text-md text-gray-500">
                                Registered Date
                              </p>
                              <p className="font-medium text-lg">
                                10 March, 2025
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Vitals Section */}
                    <div className="vitals">
                      <div className="head flex justify-between items-center mb-6">
                        <h3 className="title text-lg font-medium flex items-center ml-2">
                          Patient Current Vitals
                          <button className="edit-btn ml-4">
                            <img src="/images/edit.png" alt="" />
                          </button>
                        </h3>
                        <p className="updated text-sm text-gray-600">
                          Updated on 10 March, 2025
                        </p>
                      </div>

                      <div className="card grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="item bg-white p-6 rounded-3xl shadow-md border">
                          <h5 className="font-medium mb-4">Blood Pressure</h5>
                          <p className="text-2xl font-medium mb-1">
                            120/80
                            <span className="text-sm text-gray-500 ml-2">
                              mmHg
                            </span>
                          </p>
                        </div>
                        <div className="item bg-white p-6 rounded-3xl shadow-md border">
                          <h5 className="font-medium mb-4">Heart Rate</h5>
                          <p className="text-2xl font-medium mb-1">
                            72
                            <span className="text-sm text-gray-500 ml-4">
                              bpm
                            </span>
                          </p>
                        </div>
                        <div className="item bg-white p-6 rounded-3xl shadow-md border">
                          <h5 className="font-medium mb-4">Blood Pressure</h5>
                          <p className="text-2xl font-medium mb-1">
                            98.6
                            <span className="text-sm text-gray-500 ml-4">
                              F
                            </span>
                          </p>
                        </div>
                      </div>
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

export default PatientProfle; 