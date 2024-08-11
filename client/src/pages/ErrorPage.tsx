import React from "react";
import FormButton from "../components/FormButton";
import { useLocation, useNavigate } from "react-router-dom";
import AnimatedPages from "../utilities/AnimatedPages";

interface ErrorPageProps {
  status: string;
  header: string;
  caption: string;
}

const ErrorPage: React.FC<ErrorPageProps> = () => {
  const location = useLocation();
  const {
    status = "500",
    header = "Internal Server Error",
    caption = "Oops! Something went wrong on our end. Please try refreshing the page or come back later.",
  } = location.state || {};
  const navigate = useNavigate();
  const handleForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    navigate("/");
  };
  return (
    <AnimatedPages>
      <div className="errorPage">
        <div className="form-container ">
          <div className="status">{status}</div>
          <img
            className="error-img"
            src="../../public/robot-broken-image-broken-robot-clipart-person-human-transparent-png-2774732-removebg.png"
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
