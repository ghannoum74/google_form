import React, { useState } from "react";
import FormHeader from "../../components/FormHeader";
import { Link, useNavigate } from "react-router-dom";
import useValidation from "../../hook/useValidation";
import { useDispatch } from "react-redux";
import { setEmail } from "../../redux/states/loginDataSlics";

const LoginPage = () => {
  // set data
  const [loginData, setLoginData] = useState({});
  const { validate, invalidInputs } = useValidation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ [name]: value });
  };

  const handleForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const resultValidation = validate(
      loginData,
      "^[a-zA-Z0-9]{2,}[0-9]{0,3}@(gmail|hotmail).com$"
    );

    if (resultValidation) {
      dispatch(setEmail(loginData));
      navigate("login-password");
    }
  };
  return (
    <div className="loginPage">
      <div
        className="form-container"
        style={{ padding: "2rem 3rem 4rem 3rem" }}
      >
        <FormHeader header="Sign in" caption="Use your Google Account" />
        <form className="auth-form" onSubmit={handleForm}>
          <div
            className={`container-input ${
              invalidInputs.includes("email") ? "invalid" : ""
            }`}
          >
            <input
              title="email should be as format 'Example1@gmail|hotmail.com'"
              className="each-input"
              required
              name="email"
              type="text"
              onChange={handleData}
            />
            <label className="each-label">Email</label>
            <div className="each-errorMsg">
              Sorry, email should be as format 'Example1@gmail|hotmail.com'
            </div>
            <Link
              style={{
                textDecoration: "none",
                paddingTop: "7px",
                fontSize: "13px",
                fontWeight: "600",
              }}
              to={"/forget-email"}
              className="forget-email"
            >
              Forget Email?
            </Link>
          </div>

          <div className="button-container">
            <Link to="/personal-information" className="leftBtn">
              Create Account
            </Link>
            <button className="rightBtn">Next</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
