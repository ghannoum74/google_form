import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setErrorData, clearErrorData } from "../redux/states/ErrorDataSlice";

const useSignupForm = () => {
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signup = async (data: object) => {
    // dispatch(clearErrorData());
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
      console.log(error);
      dispatch(
        setErrorData({
          header: "Internal Server Error",
          caption: error.response.data.message,
          status: error.response.status,
        })
      );
      navigate("/error-page");
    } finally {
      setIsLoading(false);
    }
  };
  return { signup, loading, error };
};
export default useSignupForm;
