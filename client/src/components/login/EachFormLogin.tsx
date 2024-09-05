/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from "react";
import FormButton from "../FormButton";
import FormHeader from "../FormHeader";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "react-phone-input-2/lib/style.css";
import useLoginForm from "../../hook/useLoginForm";
import Cookies from "js-cookie";
import { updateData } from "../../redux/states/loginDataSlics";
import useExistingEmail from "../../hook/useExistingEmail";
import { setFormComplete } from "../../redux/states/protectRouteSlice";
import useSendSmsVerification from "../../hook/useSendSmsVerification";

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
  // dispatch to update data
  const dispatch = useDispatch();

  const reduxValue = useSelector((state) => state.loginData.data);
  console.log(reduxValue);
  // this state like general state so each component put in it key input and value different to the next component so you cannot initialize it
  // and after each succesfull entered data and goes to the next route it dispatch the useState's data and store it to redux store
  const [value, setValue] = useState<object>(reduxValue);

  // toggle password
  const [isVisible, setIsVisible] = useState(false);

  // i used hachCHecked to toggle the apperance for the error
  // because i cannot use exist which is not importet because in the case it will appear the error message when i render the component

  const { checkExisting, hasChecked, loading } = useExistingEmail();

  const { login, load, error } = useLoginForm();

  const { sendSms, pending, error: smsError } = useSendSmsVerification();

  // to navigate to the next route when everything is done
  const navigate = useNavigate();

  const handleData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleForm = async (e: React.ChangeEvent<HTMLFormElement>) => {
    // for the login page i didn't check validation i check existing
    e.preventDefault();
    if (item.name === "email") {
      const exist = await checkExisting(value);
      if (exist) {
        Object.entries(value).forEach(([key, value]) => {
          dispatch(updateData({ key, value }));
          navigate(item.next_route);
        });
      }
    } else if (item.name === "password") {
      Object.entries(value).forEach(([key, value]) => {
        dispatch(updateData({ key, value }));
      });
      dispatch(setFormComplete(true));
      // because of timing async so i should passed the value for password
      // os when i want to login and try to select the data the password dosent dispatchet yet
      const result = await login(value);
      if (result) {
        // save the data comes from login with the token in cookie to use it in the next route (successfull)
        Cookies.set("Token", result.data, {
          expires: 1,
          path: "/",
        });
        navigate(item.next_route);
      }
    } else {
      // that's mean it's the forgetPassword page
      const result = sendSms(value);
      console.log(result);
      console.log(pending);
    }
  };
  return (
    <>
      {(loading || load || pending) && (
        <div className="loading">
          <div></div>
        </div>
      )}
      <div className="form-container" key={item.id}>
        <FormHeader header={item.header} caption={item.caption} />
        <form className="auth-form" onSubmit={handleForm}>
          {item.loginInputs.map((input) => (
            // invalid class for the message error appear
            <div className="container-input" key={input.id}>
              <div className="wrapper-input-passwordIcon">
                <input
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
                  value={value[input.name]}
                />
                <label className="each-label">{input.label}</label>
                {item.name === "password" && (
                  <>
                    {isVisible ? (
                      <FontAwesomeIcon
                        onClick={() => setIsVisible(!isVisible)}
                        className="show-password-icon inLoginPage"
                        icon={faEyeSlash}
                        style={{ color: "#5f6368", top: "5%" }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        onClick={() => setIsVisible(!isVisible)}
                        icon={faEye}
                        style={{ color: "#5f6368", top: "20%" }}
                        className="show-password-icon inLoginPage"
                      />
                    )}
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
                  </>
                )}
              </div>

              {item.name === "email" && (
                <div
                  className="each-errorMsg"
                  style={{ display: hasChecked ? "none" : "block" }}
                >
                  {input.errorsMsgs}
                </div>
              )}
              {/* handle the error comes from password */}
              {item.name === "password" && (
                <div
                  className="each-errorMsg"
                  style={{ display: error ? "block" : "none" }}
                >
                  {error}
                </div>
              )}
              {/* {item.name === "forget" && (
                <div
                  className="each-errorMsg"
                  style={{ display: smsError ? "none" : "block" }}
                >
                  {input.errorsMsgs}
                </div>
              )} */}
            </div>
          ))}

          <FormButton
            leftBtn={item.leftBtn}
            rightBtn={item.rightBtn}
            from="login"
          />
        </form>
      </div>
    </>
  );
};

export default EachFormLogin;
