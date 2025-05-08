import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { getBaseURL } from '../apiConfig';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import useAxios from '../Utils/axios';

export default function Prediction() {
  const [symptoms, setSymptoms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [symptomError, setSymptomError] = useState('');
  const api = useAxios();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const addSymptom = (data) => {
    if (data.symptom && !symptoms.includes(data.symptom)) {
      setSymptoms([...symptoms, data.symptom]);
      reset({ symptom: '' });
    }
  };

  const removeSymptom = (symptomToRemove) => {
    setSymptoms(symptoms.filter((symptom) => symptom !== symptomToRemove));
  };

  const predictDisease = async () => {
    setSymptomError('');

    if (symptoms.length === 0) return;

    setIsLoading(true);

    try {
      // Format symptoms for API
      const formattedSymptoms = symptoms.map((symptom) =>
        symptom.toLowerCase().replace(/\s+/g, '_')
      );
      console.log('Formatted Symptoms:', formattedSymptoms);

      const response = await api.post(`${getBaseURL()}/predict/`, {
        symptoms: formattedSymptoms,
      });

      console.log('API Response:', response.data);
      setPredictionResult(response.data);
      console.log(predictionResult);
    } catch (error) {
      setSymptomError(
        error.response?.data?.error ||
          'An error occurred while fetching predictions.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="nav">
        <Navbar />
      </div>

      <div className="prediction-page my-8 bg-[linear-gradient(to_bottom,#EFF6FF,#FFFFFF)] py-10">
        {/* Title */}
        <section className="title-section">
          <div className="mb-16 text-center md:mb-24">
            <h3 className="mb-3 text-2xl font-semibold md:text-3xl">
              Feeling Unwell? Let&apos;s Check
            </h3>
            <p className="m-auto max-w-3xl px-4 text-sm text-gray-600 md:text-base">
              Describe your symptoms, and our AI-powered system will analyze
              them to predict possible diseases—all in just a few seconds
            </p>
          </div>
        </section>

        {/* Symptom Checker */}
        <section className="symptom-section mb-16 md:mb-24">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-6">
              <h4 className="font-medium text-xl">Enter your Symptoms</h4>
            </div>
            <div className="form">
              <form onSubmit={handleSubmit(addSymptom)}>
                <div className="mb-4 flex flex-col sm:flex-row sm:items-center">
                  <input
                    type="text"
                    className="w-full rounded-2xl border border-[#a3a3a3] p-3 sm:w-[45%]"
                    placeholder="Type a symptom and press Enter"
                    {...register('symptom', {
                      required: 'Please enter a symptom',
                    })}
                  />
                  <button
                    type="submit"
                    className="mt-2 rounded-2xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 sm:ml-4 sm:mt-0"
                  >
                    Add Symptom
                  </button>
                </div>
                {errors.symptom && (
                  <p className="mb-2 text-sm text-red-500">
                    {errors.symptom.message}
                  </p>
                )}

                <div className="mb-8 flex flex-wrap gap-2 md:gap-4">
                  {symptoms.map((symptom, index) => (
                    <div
                      key={index}
                      className="flex items-center rounded-full bg-[#D1FAE5] px-3 py-1 text-[#15803D]"
                    >
                      <button
                        type="button"
                        className="mr-2 text-[#15803D]"
                        onClick={() => removeSymptom(symptom)}
                      >
                        ✕
                      </button>
                      {symptom}
                    </div>
                  ))}
                  {symptoms.length === 0 && (
                    <p className="text-sm text-gray-500">
                      No symptoms added yet. Add your first symptom above.
                    </p>
                  )}
                </div>

                {symptomError && (
                  <p className="mt-3 text-sm text-red-500">{symptomError}</p>
                )}

                <div className="button">
                  <button
                    type="button"
                    className="rounded-2xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:bg-gray-400"
                    onClick={predictDisease}
                    disabled={symptoms.length === 0 || isLoading}
                  >
                    {isLoading ? 'Analyzing...' : 'Check My Symptoms'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Results */}
        {predictionResult && (
          <section className="result-section">
            <div className="mx-auto max-w-6xl px-4">
              <div className="title">
                <h3 className="mb-8 text-2xl font-semibold">Results</h3>
              </div>
              <div className="mb-20">
                <div className="w-full rounded-2xl border bg-white px-6 py-8 shadow-lg md:px-10 md:pt-10 md:pb-16 lg:w-[90%]">
                  <h4 className="mb-6 text-xl font-bold">
                    Potential Conditions
                  </h4>

                  {predictionResult.predicted_disease &&
                    predictionResult.predicted_disease.map(
                      (prediction, index) => (
                        <div key={index} className="mb-4 border-b pb-4">
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-medium">
                              {prediction.disease}
                            </span>
                            <span className="text-gray-700 font-medium">
                              {(prediction.probability * 100).toFixed(0)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                            <div
                              className="bg-blue-600 h-2.5 rounded-full"
                              style={{
                                width: `${prediction.probability * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      )
                    )}

                  {/* Disease Information Section */}
                  {predictionResult.info && (
                    <div className="mt-16 pt-10 border-t">
                      <h3 className="text-2xl font-bold mb-10 text-[#1E40AF]">
                        About {predictionResult.predicted_disease[0].disease}
                      </h3>

                      {/* Description */}
                      <div className="mb-6">
                        <h5 className="font-semibold mb-2">Description</h5>
                        <p className="text-gray-700">
                          {predictionResult.info.description}
                        </p>
                      </div>

                      {/* Symptoms */}
                      <div className="mb-6">
                        <h5 className="font-semibold mb-2">Common Symptoms</h5>
                        <ul className="list-disc pl-5 space-y-1">
                          {predictionResult.info.common_symptoms.map(
                            (symptom, index) => (
                              <li key={index} className="text-gray-700">
                                {symptom}
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      {/* Prevention Tips */}
                      <div className="mb-6">
                        <h5 className="font-semibold mb-2">Prevention Tips</h5>
                        <ul className="list-disc pl-5 space-y-1">
                          {predictionResult.info.prevention_tips.map(
                            (tip, index) => (
                              <li key={index} className="text-gray-700">
                                {tip}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  )}

                  {predictionResult.warning && (
                    <div className="mt-4 p-3 bg-yellow-100 text-yellow-800 rounded-lg">
                      <p>{predictionResult.warning}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Recommended Doctor */}
        {predictionResult && predictionResult.recommended_doctor && (
          <section className="doctor-section">
            <div className="mx-auto max-w-6xl px-4">
              <div className="title">
                <h3 className="mb-6 text-2xl font-semibold">
                  Recommended Doctor
                </h3>
              </div>
              <div className="mb-8">
                <div className="w-full rounded-lg border bg-[linear-gradient(to_bottom,#EFF6FF,#FFFFFF)] p-6 shadow-lg md:p-8 lg:w-[60%] flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-4 md:gap-8 mb-4 md:mb-0">
                    <div className="relative h-16 w-16">
                      <img
                        src="/images/doctor.png"
                        alt="Doctor"
                        width={64}
                        height={64}
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="details">
                      <h5 className="text-lg font-medium">
                        {predictionResult.recommended_doctor.name}
                      </h5>
                      <p className="text-gray-600">
                        {predictionResult.recommended_doctor.specialization}
                      </p>
                    </div>
                  </div>

                  <button className="rounded-2xl bg-green-600 px-4 py-2 text-white hover:bg-green-700">
                    <Link
                      to={`/appointment?doctorId=${predictionResult.recommended_doctor.id}&doctorName=${predictionResult.recommended_doctor.name}&doctorSpecialization=${predictionResult.recommended_doctor.specialization}`}
                    >
                      Book an appointment
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
