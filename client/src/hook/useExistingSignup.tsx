// useExisting.js
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearErrorData, setErrorData } from "../redux/states/ErrorDataSlice";

const useExistingSignup = () => {
  const [exists, setExists] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkExistence = async (name: string, value: object) => {
    dispatch(clearErrorData());
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
        dispatch(
          setErrorData({
            status: 500,
            header: "Internal Server Error",
            caption:
              "Oops! Something went wrong on our end. Please try refreshing the page or come back later.",
          })
        );
        navigate("/error-page");
        // to prevant go forward to the next route
        return true;
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
        dispatch(
          setErrorData({
            status: 500,
            header: "Internal Server Error",
            caption:
              "Oops! Something went wrong on our end. Please try refreshing the page or come back later.",
          })
        );
        navigate("/error-page");
        // to prevant go forward to the next route
        return true;
      } finally {
        setIsPending(false);
      }
    }
    setExists(response?.data.exists);
  };

  return { exists, checkExistence, isPending };
};

export default useExistingSignup;
