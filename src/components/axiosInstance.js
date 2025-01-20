import axios from "axios";
import { useNavigate } from "react-router-dom";

const setupAxiosInterceptors = (navigate) => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // Token expired or unauthorized, redirect to login
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );
};

export default setupAxiosInterceptors;
