import { logoutUser } from "@/redux/slices/userSlice";
import { makeStore } from "@/redux/store";
import axios from "axios";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/`;

export const axiosClient = axios.create({
  baseURL: BASE_URL,
  // headers: {
  //     Authorization: `Bearer ${'token'}`
  // }
});

export const axiosClientWithHeaders = axios.create({
  baseURL: BASE_URL,
  // headers: {
  //   Authorization: `Bearer ${Cookie.get("token")}`,
  // },
});

// Request interceptor
axiosClientWithHeaders.interceptors.request.use(
  (config: any) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      if (config.headers)
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: any) => {
    console.log('Request error:', error);
    
    // Handle request errors here
    const status = error?.response?.status;

    if (status === 401 || status === 403) {
      // Clear token and other user info
      localStorage.clear();
      
      // Redirect to login page
      window.location.href = "/login"; // Change path if needed
    }

    return Promise.reject(error);
  }
);

// Response interceptor
axiosClientWithHeaders.interceptors.response.use(
  (response) => response, // pass through successful responses
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401 || status === 403) {
        // Clear auth data (localStorage, sessionStorage, cookies, etc.)
        const store = makeStore();
        store.dispatch(logoutUser());
        
        // Optional: redirect to login page
        setTimeout(() => {
          window.location.href = "/login";
        }, 500);
      }
    }
    return Promise.reject(error);
  }
);