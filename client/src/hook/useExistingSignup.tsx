// useExisting.js
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useExistingSignup = () => {
  const [exists, setExists] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const checkExistence = async (name: string, value: object) => {
    // reset this form when we render it
    setExists(false);
    let response;
    setIsPending(true);
    if (name === "email") {
      try {
        response = await axios.post(
          "http://localhost:5000/auth/check-email",
          value
        );
        if (response.data.exists) {
          setExists(true);
          return true;
        }
        return false;
      } catch (error) {
        if (error.response) {
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
        setIsPending(false);
      }
    } else {
      try {
        response = await axios.post(
          "http://localhost:5000/auth/check-phone",
          value
        );
        if (response.data.exists) {
          setExists(true);
          return true;
        }
        return false;
      } catch (error) {
        if (error.response) {
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
        setIsPending(false);
      }
    }
    setExists(response.data.exists);
  };

  return { exists, checkExistence, isPending };
};

export default useExistingSignup;
