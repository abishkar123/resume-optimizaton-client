import axios from "axios";

const rootUrl =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_ROOT_API
    : "http://localhost:8000/api/v1/resumes";

const API_ENDPOINTS = {
  UPLOAD_RESUME: `${rootUrl}/upload`,
  OPTIMIZE_RESUME: `${rootUrl}/optimize-resume`,
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
