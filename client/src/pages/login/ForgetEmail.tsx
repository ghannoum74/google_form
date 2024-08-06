import { useState } from "react";
import FormHeader from "../../components/FormHeader";
import useValidation from "../../hook/useValidation";

const ForgetEmail = () => {
  const [forgetEmail, setForgetEmail] = useState({});
  const { validate, invalidInputs } = useValidation();

  const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForgetEmail({ [name]: value });
  };

  const handleForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validateForgetEmail = validate(
      forgetEmail,
      "^[a-zA-Z0-9]{2,}[0-9]{0,3}@(gmail|hotmail).com$"
    );
  };
  return (
    <div className="forgetEmailPage">
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
          </div>

          <div className="button-container">
            <button className="rightBtn">Next</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetEmail;
