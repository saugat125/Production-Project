import Navbar from '../Components/Navbar';
import ProfieSidebar from '../Components/ProfileSidebar';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getBaseURL } from '../apiConfig';

function MedicalHistory() {
  const {
    data: history = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['medicalHistory'],
    queryFn: async () => {
      const response = await axios.get(
        `${getBaseURL()}/user/predictionhistory/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      return response.data.data; // Assuming your API returns { data: [...] }
    },
  });

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <p>Loading medical history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div>
      <div className="nav">
        <Navbar />
      </div>

      <div className="medical-history-page py-10 my-6 bg-[linear-gradient(to_bottom,#EFF6FF,#FFFFFF)]">
        <div className="medical-history">
          <div className="custom-container">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar */}
              <ProfieSidebar />

              {/* Medical History */}
              <div className="medical flex-1 bg-[#f6f6f6] rounded-3xl p-8 shadow-custom border min-h-[500px]">
                <div className="title mb-8">
                  <h4 className="text-3xl mb-4">Medical History</h4>
                  <p className="text-gray-600">
                    Record of the previously predicted diseases along with
                    additional information
                  </p>
                </div>

                {/* History Items */}
                <div className="space-y-6">
                  {history.length > 0 ? (
                    history.map((record) => (
                      <div
                        key={record.id}
                        className="p-6 bg-white rounded-lg shadow border"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-2xl font-bold text-[#1E40AF] capitalize">
                            {record.disease_name || 'Unknown Disease'}
                          </h3>
                          <span className="text-sm text-gray-500">
                            {record.timestamp}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                          <div>
                            <h5 className="font-semibold mb-2">
                              Symptoms Reported
                            </h5>
                            <p className="text-gray-700 text-sm">
                              {record.symptoms
                                .replace(/'/g, '') // Remove quotes
                                .replace(/\[|\]/g, '') // Remove brackets
                                .replace(/_/g, ' ') // Replace underscores with spaces
                                .split(', ')
                                .join(', ')}
                            </p>
                          </div>
                          <div>
                            <h5 className="font-semibold mb-2">
                              Prediction Probability
                            </h5>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div
                                className="bg-blue-600 h-2.5 rounded-full"
                                style={{
                                  width: `${record.probability * 100}%`,
                                }}
                              ></div>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {(record.probability * 100).toFixed(0)}%
                              probability
                            </p>
                          </div>
                        </div>

                        {record.doctor_name && (
                          <div className="mt-4 pt-4 border-t">
                            <h5 className="font-semibold mb-2">
                              Recommended Specialist
                            </h5>
                            <p className="text-gray-700">
                              {record.doctor_name} (
                              {record.doctor_specialization})
                            </p>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10 text-gray-500">
                      No medical history records found
                    </div>
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

export default MedicalHistory;
