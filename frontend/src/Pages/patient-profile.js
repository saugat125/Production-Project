import Navbar from "../Components/Navbar";
import ProfieSidebar from "../Components/ProfileSidebar";
import axios from "axios";
import { useEffect, useState } from "react";
import { getBaseURL } from "../apiConfig";
import { format } from 'date-fns';

function PatientProfle(){
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);

      try {
        // Fetch user profile data
        const response = await axios.get(`${getBaseURL()}/user/profile/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setUser(response.data);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user profile. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Format gender display
  const formatGender = (gender) => {
    if (gender === 'M') return 'Male';
    if (gender === 'F') return 'Female';
    return 'Not specified';
  };

  // Format date display
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'd MMMM, yyyy');
    } catch (e) {
      return 'Invalid date';
    }
  };


  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(to_bottom,#EFF6FF,#FFFFFF)]">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(to_bottom,#EFF6FF,#FFFFFF)]">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <h3 className="mb-4 text-xl font-semibold text-red-600">Error</h3>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }


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
                          {user?.name}
                        </h4>
                        <p className="email text-gray-600 mb-5">
                          {user?.email}
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
                            <p className="font-medium text-lg">
                              {formatGender(user?.gender || null)}
                            </p>
                          </div>

                          <div className="item w-1/3">
                            <p className="text-md text-gray-500">Age</p>
                            <p className="font-medium text-lg">
                              {user?.age || 'Not specified'}
                            </p>
                          </div>

                          <div className="item w-1/3">
                            <p className="text-md text-gray-500">Blood Group</p>
                            <p className="font-medium text-lg">
                              {user?.blood_group || 'Not specified'}
                            </p>
                          </div>

                          <div className="item w-1/3">
                            <p className="text-md text-gray-500">Status</p>
                            <p className="font-medium text-lg">
                              {user?.is_active ? 'Active' : 'Inactive'}
                            </p>
                          </div>

                          <div className="item w-1/3">
                            <p className="text-md text-gray-500">
                              Registered Date
                            </p>
                            <p className="font-medium text-lg">
                              {user?.registered_date
                                ? formatDate(user.registered_date)
                                : 'Not available'}
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
                          <span className="text-sm text-gray-500 ml-4">F</span>
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