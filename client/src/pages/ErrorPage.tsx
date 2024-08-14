import React, { useEffect } from "react";
import FormButton from "../components/FormButton";
import { useNavigate } from "react-router-dom";
import AnimatedPages from "../utilities/AnimatedPages";
import { useSelector } from "react-redux";

const ErrorPage = () => {
  const navigate = useNavigate();
  const { caption, header, status } = useSelector(
    (state) => state.getErrorData.errorData
  );
  const handleForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    navigate("/");
  };

  useEffect(() => {
    if (!caption && !header && !status) {
      navigate("/");
    }
  }, [caption, header, status, navigate]);
  return (
    <AnimatedPages>
      <div className="errorPage">
        <div className="form-container ">
          <div className="status">{status}</div>
          <img
            className="error-img"
            src="../../robot-broken-image-broken-robot-clipart-person-human-transparent-png-2774732-removebg.png"
            // alt="something went wrong"
          />
          <h3 className="header">{header}</h3>
          <div className="caption">{caption}</div>

          <form className="auth-form" onSubmit={handleForm}>
            {/* <div className="container-input "></div> */}
            <FormButton rightBtn="Retry" leftBtn="" from="" />
          </form>
        </div>
      </div>
    </AnimatedPages>
  );
};

export default ErrorPage;
