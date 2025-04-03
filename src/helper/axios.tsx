import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const rootURL = "http://localhost:8000/api/v1/resumes";

export const PostResumeupload = async (userData: FormData) => {
  console.log(userData)
  console.log(rootURL)
  try {
    const { data } = await axios.post(`${rootURL}/upload`, userData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    toast.success('Resume uploaded successfully!');

    console.log(data)

    return data;
  } catch (error) {
    const err = error as AxiosError;
    const message = (err.response?.data as any)?.message || err.message || 'Resume upload failed!';
    
    toast.error(message);

    return {
      status: 'error',
      message: err.message,
    };
  }
};
