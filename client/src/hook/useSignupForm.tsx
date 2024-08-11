import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useSignupForm = () => {
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const signup = async (data: object) => {
    console.log(data);
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/signup",
        data
      );
      if (response.data.error) {
        setError(response.data.error);
        return false;
      }
      console.log(response);
      setError("");
      return true;
    } catch (error) {
      if (error.response) {
        navigate("/error-page", {
          state: {
            status: error.response.status,
            header: "Unexpected Server Response",
            caption:
              "The server returned an unexpected status. Please try again later or contact support if the issue persists.",
            currentRoute: "/",
          },
        });
      } else if (error.request) {
        navigate("/error-page", {
          state: {
            status: 500,
            header: "Internal Server Error",
            caption:
              "Oops! Something went wrong on our end. Please try refreshing the page or come back later.",
            currentRoute: "/",
          },
        });
      } else {
        navigate("/error-page", {
          state: {
            status: 400,
            header: "Request Error",
            caption:
              "An error occurred while setting up the request. Please try again or check your network connection.",
            currentRoute: "/",
          },
        });
      }
    } finally {
      setIsLoading(false);
    }
  };
  return { signup, loading, error };
};
export default useSignupForm;
