import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CalendarIcon, Clock } from 'lucide-react';
import { getBaseURL } from '../apiConfig';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Simple notification component
const Notification = ({ message, type, onClose }) => {
  return (
    <div
      className={`fixed top-4 right-4 z-50 rounded-md p-4 shadow-md ${
        type === 'success'
          ? 'bg-green-100 text-green-800'
          : 'bg-red-100 text-red-800'
      }`}
    >
      <div className="flex items-center">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-sm font-medium">
          ✕
        </button>
      </div>
    </div>
  );
};

function Appointment() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [notification, setNotification] = useState(null);
  const queryClient = useQueryClient();

  // Get doctor information from URL parameters
  const doctorId = searchParams.get('doctorId');
  const doctorName = searchParams.get('doctorName');
  const doctorSpecialization = searchParams.get('doctorSpecialization');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Show notification helper
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000); // Auto-dismiss after 5 seconds
  };

  // Query to get and validate doctor information
  const { data: doctor, isLoading: isDoctorLoading } = useQuery({
    queryKey: ['doctor', doctorId],
    queryFn: async () => {
      // Check if we have the minimal required doctor information from the URL
      if (doctorId && doctorName && doctorSpecialization) {
        return {
          id: doctorId,
          name: doctorName,
          specialization: doctorSpecialization,
        };
      }

      // If any required parameter is missing, throw an error
      throw new Error('Doctor information is incomplete');
    },
    onError: (error) => {
      showNotification(
        'Doctor information is missing. Please select a doctor first.',
        'error'
      );
    },
    // Don't retry if doctor info is missing
    retry: false,
    // Skip the query if we don't have doctor ID
    enabled: !!doctorId,
  });

  // Mutation for booking an appointment
  const appointmentMutation = useMutation({
    mutationFn: async (appointmentData) => {
      return axios.post(`${getBaseURL()}/appointment/`, appointmentData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    },
    onSuccess: () => {
      showNotification('Appointment booked successfully!', 'success');
      setIsSubmitted(true);
      reset();
      // Invalidate any queries that might use appointment data
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
    onError: (error) => {
      console.error('Error booking appointment:', error);
      showNotification(
        'Failed to book appointment. Please try again.',
        'error'
      );
    },
  });

  const onSubmit = async (data) => {
    if (!doctor) {
      showNotification(
        'Doctor information is missing. Please select a doctor first.',
        'error'
      );
      return;
    }

    const appointmentData = {
      doctor: Number(doctor.id),
      appointment_date: data.appointment_date,
      preferred_time: data.preferred_time,
      message: data.message,
    };

    appointmentMutation.mutate(appointmentData);
  };

  // Show loading state
  if (isDoctorLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EFF6FF]">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p>Loading doctor information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="appointment-page min-h-screen bg-[#EFF6FF]">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <section className="appointment-form-section py-12 pt-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 md:flex-row">
            {/* Left side text*/}
            <div className="left-container flex flex-col justify-between rounded-lg border bg-white px-6 py-8 shadow-lg md:w-[40%] md:px-10 md:py-12">
              <div className="top">
                <h1 className="text-xl font-semibold text-[#1E40AF] md:text-2xl">
                  Book an Appointment!
                </h1>
                <p className="mt-6 text-gray-600">
                  We have the best specialists in your region. Quality,
                  guarantee and professionalism are our slogan!
                </p>
              </div>
              <div className="bottom mt-8 md:mt-0">
                <p className="mb-4 text-gray-600">
                  Give us a few details below and our team will be in touch.
                </p>
                <p className="text-gray-600">
                  Need further details? Shoot us an email at{' '}
                  <a
                    href="mailto:hello@gmail.com"
                    className="text-blue-600 hover:underline"
                  >
                    healthvault@gmail.com
                  </a>
                </p>
              </div>
            </div>

            {/* Form*/}
            <div className="form rounded-lg border bg-white px-6 py-8 shadow-lg md:w-[60%] md:px-10 md:py-12">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-10">
                  <div className="mb-6 rounded-full bg-green-100 p-3">
                    <svg
                      className="h-10 w-10 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h2 className="mb-2 text-2xl font-semibold">
                    Appointment Booked!
                  </h2>
                  <p className="mb-6 text-center text-gray-600">
                    Your appointment has been successfully booked. We'll contact
                    you with confirmation details.
                  </p>
                  <button
                    onClick={() => navigate('/prediction')}
                    className="rounded-xl bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
                  >
                    Return to Prediction
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Doctor Information (Read-only) */}
                  <div className="doctor mb-8">
                    <label className="mb-2 block text-sm font-medium">
                      Selected Doctor
                    </label>
                    <div className="rounded-lg border border-[#a3a3a3] bg-gray-50 p-4">
                      {doctor ? (
                        <div className="flex items-center gap-4">
                          <div className="relative h-12 w-12">
                            <img
                              src="/images/doctor.png"
                              alt="Doctor"
                              className="h-full w-full rounded-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{doctor.name}</p>
                            <p className="text-sm text-gray-600">
                              {doctor.specialization}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-500">
                          No doctor selected. Please go back and select a doctor
                          first.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="date mb-6">
                    <label
                      htmlFor="appointment_date"
                      className="mb-2 block text-sm font-medium"
                    >
                      Appointment Date
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <CalendarIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="date"
                        id="appointment_date"
                        className={`w-full rounded-lg border p-3 pl-10 ${
                          errors.appointment_date
                            ? 'border-red-500'
                            : 'border-[#a3a3a3]'
                        }`}
                        {...register('appointment_date', {
                          required: 'Please select a date',
                        })}
                        min={new Date().toISOString().split('T')[0]} // Prevent past dates
                      />
                    </div>
                    {errors.appointment_date && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.appointment_date.message}
                      </p>
                    )}
                  </div>

                  <div className="time mb-6">
                    <label
                      htmlFor="preferred_time"
                      className="mb-2 block text-sm font-medium"
                    >
                      Preferred Time
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Clock className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        id="preferred_time"
                        className={`w-full rounded-lg border p-3 pl-10 ${
                          errors.preferred_time
                            ? 'border-red-500'
                            : 'border-[#a3a3a3]'
                        }`}
                        {...register('preferred_time', {
                          required: 'Please select a time slot',
                        })}
                      >
                        <option value="">Select a time slot</option>
                        <option value="morning">
                          Morning (9:00 AM - 12:00 PM)
                        </option>
                        <option value="afternoon">
                          Afternoon (1:00 PM - 4:00 PM)
                        </option>
                        <option value="evening">
                          Evening (5:00 PM - 8:00 PM)
                        </option>
                      </select>
                    </div>
                    {errors.preferred_time && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.preferred_time.message}
                      </p>
                    )}
                  </div>

                  <div className="message mb-8">
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-medium"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      placeholder="Please describe your problem"
                      className={`h-[140px] w-full rounded-lg border p-3 ${
                        errors.message ? 'border-red-500' : 'border-[#a3a3a3]'
                      }`}
                      {...register('message', {
                        required: 'Please provide details about your condition',
                        minLength: {
                          value: 10,
                          message:
                            'Please provide more details (at least 10 characters)',
                        },
                      })}
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <div className="button">
                    <button
                      type="submit"
                      disabled={appointmentMutation.isPending || !doctor}
                      className="rounded-xl bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700 disabled:bg-blue-400"
                    >
                      {appointmentMutation.isPending
                        ? 'Booking...'
                        : 'Book Appointment'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Appointment;
