import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1",
});

export default api;

// export const handleAxiosError = (error: unknown) => {
//   if (axios.isAxiosError(error) && error.response?.data?.error) {
//     throw new Error(error.response.data.error);
//   } else {
//     throw new Error("An unexpected error occurred");
//   }
// };

export const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error) && error.response?.data?.error) {
    throw new Error(error.response.data.error);
  } else if (axios.isAxiosError(error) && error.response?.data?.message) {
    throw new Error(error.response.data.message);
  } else {
    throw new Error("An unexpected error occurred");
  }
};
