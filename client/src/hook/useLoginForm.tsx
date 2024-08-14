import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearErrorData, setErrorData } from "../redux/states/ErrorDataSlice";
const useLoginForm = () => {
  // because of timing for async i should get the data which contain only email
  // then merge it with the value which contain the password
  const data = useSelector((state) => state.loginData.data);
  const email = { ...data };
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = async (value: object) => {
    dispatch(clearErrorData());
    // now i should merge the data
    email["password"] = value["password"];
    const final_data = email;
    setLoad(true);
    try {
      const result = await axios.post(
        "http://localhost:5000/auth/login",
        final_data
      );
      if (result.data.error) {
        setError(result.data.error);
        return false;
      }

      setError("");
      return result;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        dispatch(
          setErrorData({
            status: error.response.status,
            header: error.response.data.header,
            caption: error.response.data.caption,
          })
        );
        navigate("/error-page");
      } else {
        // this is fire when the server shot down so it dosent send response so i handle manualy
        dispatch(
          setErrorData({
            status: 500,
            header: "Internal Server Error",
            caption:
              "Oops! Something went wrong on our end. Please try refreshing the page or come back later.",
          })
        );
        navigate("/error-page");
      }
    } finally {
      setLoad(false);
    }
  };
  return { login, load, error };
};
export default useLoginForm;
