import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useExistingEmail = () => {
  const [exist, setExist] = useState(false);
  const [loading, setLoading] = useState(false);
  //   to track the appereance for the error message
  const [hasChecked, setHasChecked] = useState(true);
  const navigate = useNavigate();
  const checkExisting = async (value: object) => {
    setLoading(true);
    try {
      const result = await axios.post(
        "http://localhost:5000/auth/check-email",
        value
      );
      if (result.data.exists) {
        setHasChecked(true);
        setExist(true);
        return true;
      }
      setHasChecked(false);
      return false;
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        navigate("/error-page", {
          state: {
            status: error.response.status, // Use actual status code from the server response
            header: "Unexpected Server Response",
            caption:
              "The server returned an unexpected status. Please try again later or contact support if the issue persists.",
            currentRoute: "/",
          },
        });
      } else if (error.request) {
        // No response received from the server
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
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { checkExisting, hasChecked, setHasChecked, loading };
};

export default useExistingEmail;
