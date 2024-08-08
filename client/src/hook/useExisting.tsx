// useExisting.js
import { useState } from "react";
import axios from "axios";

const useExisting = () => {
  const [exists, setExists] = useState(false);

  const checkExistence = async (name: string, value: object) => {
    try {
      let response;
      if (name === "email") {
        response = await axios.post(
          "http://localhost:5000/auth/check-email",
          value
        );
      } else {
        response = await axios.post(
          "http://localhost:5000/auth/check-phone",
          value
        );
      }
      setExists(response.data.exists);
      return response.data.exists;
    } catch (error) {
      console.error("Error checking existence", error);
    }
  };

  return { exists, checkExistence };
};

export default useExisting;
