import Navbar from '../Components/Navbar';
import ProfieSidebar from '../Components/ProfileSidebar';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBaseURL } from '../apiConfig';
import { format} from 'date-fns';
import { useState } from 'react';

function AppointmentHistory() {
  const queryClient = useQueryClient();
  const [cancelError, setCancelError] = useState(null);

  const {
    data: appointments = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['userAppointments'],
    queryFn: async () => {
      const response = await axios.get(
        `${getBaseURL()}/user/appointment/display/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      return response.data;
    },
  });

  const cancelAppointmentMutation = useMutation({
    mutationFn: async (appointmentId) => {
      try {
        await axios.delete(
          `${getBaseURL()}/user/appointment/${appointmentId}/cancel/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
      } catch (error) {
        throw new Error(
          error.response?.data?.message || 'Failed to cancel appointment'
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['userAppointments']);
      setCancelError(null);
    },
    onError: (error) => {
      setCancelError(error.message);
    },
  });

  const handleCancelAppointment = (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      cancelAppointmentMutation.mutate(appointmentId);
    }
  };

  if (isLoading)
    return <div className="text-center py-10">Loading appointments...</div>;
  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        Error: {error.message}
      </div>
    );

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
              <div className="appointment flex-1 bg-[#f6f6f6] rounded-3xl p-8 shadow-custom border min-h-[500px]">
                <div className="title">
                  <h4 className="text-3xl mb-14">Appointment History</h4>
                </div>

                {/* Error Message */}
                {cancelError && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                    {cancelError}
                  </div>
                )}

                {/* Appointment List */}
                <div className="appointments space-y-4">
                  {appointments.length > 0 ? (
                    appointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="item flex items-center gap-28"
                      >
                        <div className="flex items-center">
                          <div className="logo w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4 border">
                            <img src="/images/history.png" alt="Appointment" />
                          </div>
                          <div className="details">
                            <p className="font-medium">
                              {appointment.doctor_specialization}
                            </p>
                            <p className="text-gray-600 text-sm">
                              {appointment.doctor_name}
                            </p>
                          </div>
                        </div>

                        <div className="time text-gray-700 flex items-center gap-2">
                          <p className="font-medium">
                            {appointment.preferred_time}
                          </p>
                          <span>•</span>
                          <p className="text-gray-600 text-sm">
                            {format(
                              new Date(appointment.appointment_date),
                              'd MMMM, yyyy'
                            )}
                          </p>
                        </div>

                        <button
                          onClick={() =>
                            handleCancelAppointment(appointment.id)
                          }
                          disabled={cancelAppointmentMutation.isLoading}
                          className="border border-[#2563EB] text-[#2563EB] rounded-3xl px-6 py-1 text-sm flex items-center space-x-1 hover:bg-blue-50 transition-colors disabled:opacity-50"
                        >
                          <span className="font-semibold">
                            {cancelAppointmentMutation.isLoading
                              ? 'Cancelling...'
                              : 'Cancel'}
                          </span>
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-10">
                      No appointments found.
                    </p>
                  )}
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
