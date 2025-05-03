import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getBaseURL } from '../apiConfig';
import { useState } from 'react';

function Doctors() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: doctors = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['doctors', searchQuery],
    queryFn: async () => {
      const response = await axios.get(
        `${getBaseURL()}/doctors/?search=${searchQuery}`
      );
      return response.data;
    },
    keepPreviousData: true,
  });

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSearchQuery(searchTerm); // Only update searchQuery on Enter
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update input without triggering search
  };

  if (isLoading)
    return (
      <div className="text-center py-20">
        <p>Loading doctors...</p>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20 text-red-500">
        Error: {error.message}
      </div>
    );

  return (
    <div className="doctors-page">
      <div className="nav">
        <Navbar />
      </div>

      <section className="doctors-section py-10 my-8 bg-[linear-gradient(to_bottom,#EFF6FF,#FFFFFF)]">
        <div className="custom-container">
          {/* Title */}
          <div className="head max-w-3xl mx-auto text-center mb-8">
            <h1 className="title text-4xl font-bold mb-4 text-[#1E40AF]">
              Our Specialists
            </h1>
            <p className="text-gray-600">
              Connect with our experienced doctors specialized in various
              medical fields
            </p>
          </div>

          {/* Search Bar */}
          <div className="search-bar relative mb-[60px]">
            <div className="search-logo absolute inset-y-0 left-[25%] flex items-center pl-3">
              <img src="/images/search.png" alt="search" className="w-4 h-4" />
            </div>
            <input
              className="block w-[50%] m-auto p-3 pl-10 text-sm border border-gray-400 rounded-lg"
              placeholder="Search doctors by name or specialty"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
            {doctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                name={doctor.name}
                specialization={doctor.specialization}
                id={doctor.id}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

function DoctorCard({ name, specialization, id }) {
  return (
    <div className="doctor-card bg-white p-10 rounded-lg flex flex-col items-center text-center shadow-lg border">
      <div className="image-container w-20 h-20 mb-6">
        <img
          src="/images/doctor.png"
          alt={`Dr. ${name}`}
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div className="text-container">
        <h3 className="font-bold text-lg mb-2">{name}</h3>
        <p className="text-sm text-gray-600 mb-6 capitalize">
          {specialization.toLowerCase()}
        </p>
      </div>

      <div className="social flex space-x-3 mb-6">
        <a
          href="facebook.com"
          aria-label="Facebook"
          className="text-gray-600 hover:text-gray-800"
        >
          <img src="/images/facebook.png" alt="Facebook" className="w-5 h-5" />
        </a>
        <a
          href="linkedin.com"
          aria-label="LinkedIn"
          className="text-gray-600 hover:text-gray-800"
        >
          <img src="/images/linkedin.png" alt="LinkedIn" className="w-5 h-5" />
        </a>
        <a
          href="twitter.com"
          aria-label="Twitter"
          className="text-gray-600 hover:text-gray-800"
        >
          <img src="/images/insta.png" alt="Instagram" className="w-5 h-5" />
        </a>
      </div>

      <span className="appointment text-sm font-bold text-[#15803D]">
        <Link
          to={`/appointment?doctorId=${id}&doctorName=${name}&doctorSpecialization=${specialization}`}
        >
          Appointment
        </Link>
      </span>
    </div>
  );
}

export default Doctors;
