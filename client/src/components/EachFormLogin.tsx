/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from "react";
import FormButton from "./FormButton";
import FormHeader from "./FormHeader";
import useValidation from "../hook/useValidation";
import { useDispatch, useSelector } from "react-redux";
import { updateData } from "../redux/states/loginDataSlics";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "react-phone-input-2/lib/style.css";
import axios from "axios";

interface InputProps {
  id: number;
  name: string;
  type: string;
  required: boolean;
  label: string;
  errorsMsgs?: string;
  min?: number | string;
  max?: number | string;
  maxlength?: number;
}

interface ItemProps {
  id: number;
  name: string;
  header: string;
  caption: string;
  pattern: string;
  next_route: string;
  loginInputs: InputProps[];
  leftBtn: string;
  rightBtn: string;
  forgetWord?: string;
  to: string;
}

interface EachFormLoginProps {
  item: ItemProps;
}

const EachFormLogin: React.FC<EachFormLoginProps> = ({ item }) => {
  // this state like general state so each component put in it key input and value different to the next component so you cannot initialize it
  // and after each succesfull entered data and goes to the next route it dispatch the useState's data and store it to redux store
  const [value, setValue] = useState({});

  // import useValidation hook to validate the value with the pattern
  const { validate, invalidInputs } = useValidation();

  // toggle password
  const [isVisible, setIsVisible] = useState(false);

  // dispatch to update data
  const dispatch = useDispatch();

  const data = useSelector((state) => state.loginData.data);

  // to navigate to the next route when everything is done
  const navigate = useNavigate();

  const handleData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    // first validate the inputs value object
    const isValid = validate(value, item.pattern);

    // check if validate true or false because of sync in js i cannot check directly on the InputInvalid.length because it will be sometimes not set it yet
    // so i checked on the validate it self if true or false
    // if it's true dispatch and navigate
    // if false handlie it in my jsx below using invalid state className
    if (isValid) {
      Object.entries(value).forEach(([key, value]) => {
        dispatch(updateData({ key, value }));
        navigate(item.next_route);
      });
    }
  };

  // i used useEffect to post because if i used it in the onSubmit the data not contain the password yet
  useEffect(() => {
    if (item.name === "password") {
      if (data.password) {
        axios
          .post("http://localhost:5000/auth/login", data)
          .then((response) => console.log(response))
          .catch((err) => navigate("/error-page"));
      } else {
        navigate("/error-page");
      }
    }
  }, [data, item.name]);

  return (
    <div className="form-container" key={item.id}>
      <FormHeader header={item.header} caption={item.caption} />

      <form className="auth-form" onSubmit={handleForm}>
        {item.loginInputs.map((input) => (
          // invalid class for the message error appear

          <div
            className={`container-input ${
              invalidInputs.includes(input.name) ? "invalid" : ""
            }`}
            key={input.id}
          >
            <input
              title={input.errorsMsgs}
              className="each-input"
              required={input.required}
              name={input.name}
              maxLength={input.maxlength}
              // i check first if type == password so i'm in the password-information page and i toggle
              type={
                input.type === "password"
                  ? isVisible
                    ? "text"
                    : "password"
                  : input.type || ""
              }
              min={input.min}
              max={input.max}
              onChange={handleData}
            />
            <label className="each-label">{input.label}</label>
            <div className="each-errorMsg">
              {input.name === "password" ? "" : input.errorsMsgs}
            </div>
            <Link
              style={{
                textDecoration: "none",
                paddingTop: "7px",
                paddingLeft: "5px",
                fontSize: "13px",
                fontWeight: "600",
              }}
              to={item.to}
              className="forget-email"
            >
              {item.forgetWord}
            </Link>
          </div>
        ))}
        {item.name === "password" && (
          <>
            {isVisible ? (
              <FontAwesomeIcon
                onClick={() => setIsVisible(!isVisible)}
                className="show-password-icon from-password-information inLoginPage"
                icon={faEyeSlash}
                style={{ color: "#5f6368" }}
              />
            ) : (
              <FontAwesomeIcon
                onClick={() => setIsVisible(!isVisible)}
                icon={faEye}
                style={{ color: "#5f6368" }}
                className="show-password-icon from-password-information inLoginPage"
              />
            )}
          </>
        )}

        <FormButton
          leftBtn={item.leftBtn}
          rightBtn={item.rightBtn}
          from="login"
        />
      </form>
    </div>
  );
};

export default EachFormLogin;
