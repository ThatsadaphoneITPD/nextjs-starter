import axios from 'axios';
import { BASE_URL } from './constant';

const axiosClient = axios.create({ baseURL: BASE_URL });

// Request Interceptor
axiosClient.interceptors.request.use(
  async (config) => {
    config.headers = {
      'Content-Type': 'application/json',
      ...config.headers,
    };

    // Add Bearer Token if it exists
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosClient.interceptors.response.use(
  (response) => {
    // Handle success responses
    // if (response.status === 200 || response.status === 201) {
    //   // return response?.data; // Return only the data for cleaner usage
    //   return response; 
    // }
    return response;
  },
  (error) => {
    if (error.response) {
      const response = error.response;
      if (response?.data?.code === 401 && response?.data?.error === "Unauthorized") {
        console.log("Unauthorized", error.response);
        document.cookie ='token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        localStorage.removeItem('token');
        localStorage.removeItem('authStore');
        localStorage.removeItem('sideMenu');
      } else {
        console.error(
          `API Error: ${response.status} - ${response.statusText}`
        );
      }
    } else {
      console.error('Network/Server Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
