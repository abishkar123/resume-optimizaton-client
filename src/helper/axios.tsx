import axios from "axios";

const rootUrl =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_ROOT_API
    : "http://localhost:8000/api/v1/resumes";

export const fetchAllUsers = async () => {
  try {
    const response = await axios.get(`${rootUrl}/users`);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return [];
  }
};
