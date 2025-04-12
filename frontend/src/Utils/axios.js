import axios from "axios";
import { getBaseURL } from "../apiConfig";  

const baseURL = getBaseURL();

const useAxios = () => {
  const accessToken = localStorage.getItem('token');

  const axiosInstance = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return axiosInstance;
};

export default useAxios;