import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addData } from "../redux/states/FullUserDataSlice";
import { setErrorData } from "../redux/states/ErrorDataSlice";
import { useNavigate } from "react-router-dom";

const useUpdateForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const update = async (data: object, id) => {
    setLoading(true);
    try {
      const result = await axios.patch(
        `http://localhost:5000/auth/update/${id}`,
        data
      );

      dispatch(addData(result.data));
      return result.data ? true : false;
    } catch (error) {
      console.log(error);
      //   dispatch(
      //     setErrorData({
      //       header: "Internal Server Error",
      //       caption: error?.response.data.message,
      //       status: error?.response.status,
      //     })
      //   );
      navigate("/error-page");
    } finally {
      setLoading(false);
    }
  };
  return { update, loading, error };
};
export default useUpdateForm;
