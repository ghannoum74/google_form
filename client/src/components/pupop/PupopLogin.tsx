import { faEye, faEyeSlash, faL } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import AnimatedPopup from "../../utilities/AnimatedPopup";
import { useSelector } from "react-redux";
import useUpdatedLogin from "../../hook/useUpdatedLogin";
import PupopPassword from "./PupopPassword";
import AnimatedPages from "../../utilities/AnimatedPages";

const PupopLogin = ({ setIsPuped }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState<object>({});
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [goNext, setGoNext] = useState(false);

  // i use my update login instead of the login because in this case i have the email and password stored in the local state
  // but in the login form the email is stored in global state and the password in the local because of pages
  const { login, load, error } = useUpdatedLogin();

  const data = useSelector((state) => state.fullUserData.user_data);
  const handleData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setValue((prev) => ({ ...prev, [name]: value }));
  };

  // so when i click on form it avoid its behavior
  // so when i click on the page it disappear except the form part

  const handleForm = async () => {
    // check ferstly if email is valid so we can reduce api call
    if (value["email"] !== data["email"]) {
      setInvalidEmail(true);
    } else {
      setInvalidEmail(false);

      // so first checking if password accepted and match to reduce the api calling too
      const result = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$"
      ).test(value["password"]);
      if (!result) {
        setInvalidPassword(true);
      } else {
        setInvalidPassword(false);
        const result = await login(value);
        if (!result) {
          setInvalidPassword(true);
        } else {
          setInvalidPassword(false);
          // go to the next component
          setGoNext(true);
        }
      }
    }
  };
  return (
    <>
      {!goNext ? (
        <AnimatedPopup>
          <div className="container-pupop">
            <h2 className="header">Enter your Data</h2>
            <div className="caption" style={{ margin: 0 }}>
              Verify identity
            </div>
            <div className="container-input" style={{ zIndex: "1" }}>
              <div className="wrapper-input-passwordIcon">
                <input
                  className="each-input"
                  name="email"
                  maxLength={40}
                  required
                  type="text"
                  onChange={handleData}
                />
                <label className="each-label">Enter your Email</label>
                <div
                  className="each-errorMsg"
                  style={{
                    display: invalidEmail ? "block" : "none",
                    marginLeft: "5px",
                  }}
                >
                  Incorrect Email, please enter your valid Email!
                </div>
              </div>
              <div className="wrapper-input-passwordIcon">
                <input
                  className="each-input"
                  name="password"
                  maxLength={30}
                  required
                  type={isVisible ? "text" : "password"}
                  onChange={handleData}
                />
                <label className="each-label">Enter your password</label>

                <FontAwesomeIcon
                  onClick={() => setIsVisible(!isVisible)}
                  className="show-password-icon"
                  style={{ color: "#5f6368" }}
                  icon={isVisible ? faEyeSlash : faEye}
                />
              </div>
              <div
                className="each-errorMsg"
                style={{
                  display: invalidPassword ? "block" : "none",
                  marginLeft: "5px",
                }}
              >
                {error ? error : "Invalid Password!"}
              </div>
            </div>

            <div
              onClick={handleForm}
              className="pupop-submit"
              style={{ marginTop: 0, textAlign: "center" }}
            >
              Ok
            </div>
          </div>
        </AnimatedPopup>
      ) : (
        <AnimatedPages>
          <PupopPassword setIsPuped={setIsPuped} />
        </AnimatedPages>
      )}
    </>
  );
};
export default PupopLogin;
