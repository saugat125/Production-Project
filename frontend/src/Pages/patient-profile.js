import Navbar from "../Components/Navbar";
import ProfieSidebar from "../Components/ProfileSidebar";
import axios from "axios";
import { useState } from "react";
import { getBaseURL } from "../apiConfig";
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { useQuery,useQueryClient } from '@tanstack/react-query';

function PatientProfle(){
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    data: user,
    isLoading: isUserLoading,
  } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const response = await axios.get(`${getBaseURL()}/user/profile/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  // Query for vitals data
  const {
    data: vitals,
    isLoading: isVitalsLoading,
  } = useQuery({
    queryKey: ['userVitals'],
    queryFn: async () => {
      console.log('Fetching vitals...');
      const response = await axios.get(`${getBaseURL()}/user/vital/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Vitals response:', response.data);
      return response.data;
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const isLoading = isUserLoading || isVitalsLoading;


  const handleEditClick = () => {
    setIsEditing(true);
    reset({
      blood_pressure: vitals?.blood_pressure || '',
      heart_rate: vitals?.heart_rate || '',
      temperature: vitals?.temperature || '',
    });
  };

  const onSubmit = async (data) => {
    try {
      await axios.post(
        `${getBaseURL()}/user/vital/update/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      queryClient.invalidateQueries(['userVitals']); // Invalidate the vitals query to refetch data

      setIsEditing(false);
    } catch (err) {
      console.error('Error updating vitals:', err);
      setError('Failed to update vitals. Please try again.');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

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
                        {!isEditing && (
                          <button
                            className="edit-btn ml-4"
                            onClick={handleEditClick}
                          >
                            <img src="/images/edit.png" alt="Edit vitals" />
                          </button>
                        )}
                      </h3>
                      {vitals?.date_time && (
                        <p className="updated text-sm text-gray-600">
                          Updated on {formatDate(vitals.date_time)}
                        </p>
                      )}
                    </div>

                    {isEditing ? (
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="card bg-white p-6 rounded-3xl shadow-md border"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                          <div className="item">
                            <label className="block font-medium mb-2">
                              Blood Pressure
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. 120/80"
                              className={`w-full p-2 border rounded ${
                                errors.blood_pressure
                                  ? 'border-red-500'
                                  : 'border-gray-300'
                              }`}
                              {...register('blood_pressure', {
                                pattern: {
                                  value: /^\d{1,3}\/\d{1,3}$/,
                                  message: 'Format should be like 120/80',
                                },
                              })}
                            />
                            {errors.blood_pressure && (
                              <p className="mt-1 text-xs text-red-500">
                                {errors.blood_pressure.message}
                              </p>
                            )}
                          </div>
                          <div className="item">
                            <label className="block font-medium mb-2">
                              Heart Rate
                            </label>
                            <input
                              type="number"
                              placeholder="e.g. 72"
                              className={`w-full p-2 border rounded ${
                                errors.heart_rate
                                  ? 'border-red-500'
                                  : 'border-gray-300'
                              }`}
                              {...register('heart_rate', {
                                min: {
                                  value: 30,
                                  message: 'Heart rate too low',
                                },
                                max: {
                                  value: 200,
                                  message: 'Heart rate too high',
                                },
                              })}
                            />
                            {errors.heart_rate && (
                              <p className="mt-1 text-xs text-red-500">
                                {errors.heart_rate.message}
                              </p>
                            )}
                          </div>
                          <div className="item">
                            <label className="block font-medium mb-2">
                              Temperature (°F)
                            </label>
                            <input
                              type="number"
                              step="0.1"
                              placeholder="e.g. 98.6"
                              className={`w-full p-2 border rounded ${
                                errors.temperature
                                  ? 'border-red-500'
                                  : 'border-gray-300'
                              }`}
                              {...register('temperature', {
                                min: {
                                  value: 90,
                                  message: 'Temperature too low',
                                },
                                max: {
                                  value: 110,
                                  message: 'Temperature too high',
                                },
                              })}
                            />
                            {errors.temperature && (
                              <p className="mt-1 text-xs text-red-500">
                                {errors.temperature.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-end space-x-4">
                          <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                            Save Changes
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="card grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="item bg-white p-6 rounded-3xl shadow-md border">
                          <h5 className="font-medium mb-4">Blood Pressure</h5>
                          <p className="text-2xl font-medium mb-1">
                            {vitals?.blood_pressure || '--'}
                            <span className="text-sm text-gray-500 ml-2">
                              mmHg
                            </span>
                          </p>
                        </div>
                        <div className="item bg-white p-6 rounded-3xl shadow-md border">
                          <h5 className="font-medium mb-4">Heart Rate</h5>
                          <p className="text-2xl font-medium mb-1">
                            {vitals?.heart_rate || '--'}
                            <span className="text-sm text-gray-500 ml-4">
                              bpm
                            </span>
                          </p>
                        </div>
                        <div className="item bg-white p-6 rounded-3xl shadow-md border">
                          <h5 className="font-medium mb-4">Body Temperature</h5>
                          <p className="text-2xl font-medium mb-1">
                            {vitals?.temperature || '--'}
                            <span className="text-sm text-gray-500 ml-4">
                              F
                            </span>
                          </p>
                        </div>
                      </div>
                    )}
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