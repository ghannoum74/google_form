import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setErrorData } from "../redux/states/ErrorDataSlice";
import { useNavigate } from "react-router-dom";

const useSendSmsVerification = () => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendSms = async (phoneNumber: object) => {
    setPending(true);
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/send-sms",
        phoneNumber
      );
      if (response.data.error) {
        console.log(response.data.error);
        setError(response.data.error);
        return false;
      }
      console.log(response);
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
      setPending(false);
    }
  };
  return { sendSms, pending };
};
export default useSendSmsVerification;
