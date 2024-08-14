import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearErrorData, setErrorData } from "../redux/states/ErrorDataSlice";

const useExistingEmail = () => {
  const [exist, setExist] = useState(false);
  const [loading, setLoading] = useState(false);
  //   to track the appereance for the error message
  const [hasChecked, setHasChecked] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const checkExisting = async (value: object) => {
    dispatch(clearErrorData());
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
      dispatch(
        setErrorData({
          status: 500,
          header: "Internal Server Error",
          caption:
            "Oops! Something went wrong on our end. Please try refreshing the page or come back later.",
        })
      );
      navigate("/error-page");

      return false;
    } finally {
      setLoading(false);
    }
  };
  return { checkExisting, hasChecked, setHasChecked, loading };
};

export default useExistingEmail;
