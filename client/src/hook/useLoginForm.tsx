import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
const useLoginForm = () => {
  // because of timing for async i should get the data which contain only email
  // then merge it with the value which contain the password
  const data = useSelector((state) => state.loginData.data);
  const email = { ...data };
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");
  const login = async (value: object) => {
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
        // setLoad(false);
        return false;
      }
      console.log(result);
      setError("");
      // setLoad(false);
      return true;
    } catch (error) {
      // setLoad(false);
      setError("An unexpected error occurred. Please try again later.");
      return false;
    } finally {
      setLoad(false);
    }
  };
  return { login, load, error };
};
export default useLoginForm;
