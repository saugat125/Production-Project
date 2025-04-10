export const getBaseURL = () => {
  return process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api';
};
