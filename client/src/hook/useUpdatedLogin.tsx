import { useDispatch } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setErrorData } from "../redux/states/ErrorDataSlice";
const useUpdatedLogin = () => {
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // i create my update login instead of the login because in this case i have the email and password stored in the local state
  // but in the login form the email is stored in global state and the password in the local because of pages
  const login = async (data: object) => {
    setLoad(true);

    try {
      const result = await axios.post("http://localhost:5000/auth/login", data);
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
export default useUpdatedLogin;
