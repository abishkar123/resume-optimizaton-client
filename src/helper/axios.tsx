import axios from "axios";

const rootUrl =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_ROOT_API
    : "http://localhost:8000/api/v1/resumes";

// Add a request interceptor to include the auth token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const API_ENDPOINTS = {
  UPLOAD_RESUME: `${rootUrl}/upload`,
  OPTIMIZE_RESUME: `${rootUrl}/optimize-resume`,
  GET_HISTORY: (email: string) => `${rootUrl}/history/${email}`,
};

export const uploadResume = async (
  formData: FormData,
  onUploadProgress?: (progressEvent: any) => void
) => {
  const response = await axios.post(API_ENDPOINTS.UPLOAD_RESUME, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
  return response.data;
};

export const optimizeResume = async (email: string, fileUrl: string) => {
  const response = await axios.post(API_ENDPOINTS.OPTIMIZE_RESUME, {
    email,
    fileUrl,
  });

  return response.data;

};

export const getUserHistory = async (email: string) => {
  const response = await axios.get(API_ENDPOINTS.GET_HISTORY(email));
  return response.data;
};
