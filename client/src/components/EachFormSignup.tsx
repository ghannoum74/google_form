/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from "react";
import FormButton from "./FormButton";
import FormHeader from "./FormHeader";
import useValidation from "../hook/useValidation";
import { useDispatch, useSelector } from "react-redux";
import { updateData } from "../redux/states/signupDataSlice";
import { useNavigate } from "react-router-dom";
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

interface SelectProps {
  id: number;
  label: string;
  monthsData?: string[];
  genderData?: string[];
}

interface ItemProps {
  id: number;
  name: string;
  header: string;
  caption: string;
  pattern: string;
  next_route: string;
  inputs: InputProps[];
  selectData?: SelectProps[];
  leftBtn: string;
  rightBtn: string;
}

interface EachFormSignupProps {
  item: ItemProps;
}

const EachFormSignup: React.FC<EachFormSignupProps> = ({ item }) => {
  // this state like general state so each component put in it key input and value different to the next component so you cannot initialize it
  // and after each succesfull entered data and goes to the next route it dispatch the useState's data and store it to redux store
  const [value, setValue] = useState({});

  // import useValidation hook to validate the value with the pattern
  const { validate, invalidInputs } = useValidation();

  // toggle password
  const [isVisible, setIsVisible] = useState(false);

  // toggle email input
  const [isChecked, setIsCheck] = useState(false);

  // dispatch to update data
  const dispatch = useDispatch();
  // @ts-expect-error
  const data = useSelector((state) => state.fullData.data);
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

    // in this case i should send the data to the data base
    // if (item.name === "password") {
    //   axios
    //     .post("http://localhost:5000/auth/signin", value)
    //     .then((res) => console.log(res))
    //     .catch((error) => console.log(error));
    // }
  };

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  return (
    <div className="form-container" key={item.id}>
      <FormHeader header={item.header} caption={item.caption} />
      <form className="auth-form" onSubmit={handleForm}>
        {/* check if the page is the Email page  */}
        {item.id === 3 ? (
          <div className="radio">
            <div className="container-input container-radio">
              <input
                type="radio"
                name="email"
                onClick={() => setIsCheck(false)}
                onChange={handleData}
                id="opt_1"
                className="radio-input"
                value={
                  (data.firstname + data.lastname.slice(0, 2) + data.year)
                    .replace(/ /g, "")
                    .toLowerCase() + "@gmail.com"
                }
              />
              <label htmlFor="opt_1" className="radio-label">
                {(data.firstname + data.lastname.slice(0, 2) + data.year)
                  .replace(/ /g, "")
                  .toLowerCase() + "@gmail.com"}
              </label>
            </div>
            <div className="container-input container-radio">
              <input
                type="radio"
                name="email"
                id="opt_2"
                className="radio-input"
                onClick={() => setIsCheck(false)}
                onChange={handleData}
                value={
                  (
                    data.lastname +
                    data.firstname.slice(0, 2) +
                    +data.day
                  ).toLowerCase() + "@gmail.com"
                }
              />
              <label htmlFor="opt_2" className="radio-label">
                {(
                  data.lastname +
                  data.firstname.slice(0, 2) +
                  +data.day
                ).toLowerCase() + "@gmail.com"}
              </label>
            </div>
            <div className="container-input container-radio toggle-email">
              <input
                type="radio"
                name="email"
                className="radio-input toggle-radio"
                onClick={() => setIsCheck(true)}
                id="opt_3"
              />
              <label htmlFor="opt_3" className="radio-label">
                Create your own Gmail address
              </label>
            </div>
            {isChecked && (
              <div
                className={`container-input ${
                  invalidInputs.includes(item.inputs[0].name) ? "invalid" : ""
                }`}
              >
                <input
                  title={item.inputs[0].errorsMsgs}
                  className="each-input"
                  required={item.inputs[0].required}
                  name={item.inputs[0].name}
                  maxLength={item.inputs[0].maxlength}
                  type={item.inputs[0].type}
                  onChange={handleData}
                />
                <label className="each-label">{item.inputs[0].label}</label>
                <div className="each-errorMsg">{item.inputs[0].errorsMsgs}</div>
              </div>
            )}
          </div>
        ) : (
          item.inputs.map((input) => (
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
              <div className="each-errorMsg">{input.errorsMsgs}</div>
            </div>
          ))
        )}

        {/* only if there is select input type so this mean only if i was in the basic page */}
        {item.selectData && (
          <>
            <div className="container-input">
              <select
                className="each-input"
                id="month"
                name="month"
                required
                onChange={handleData}
              >
                <option defaultValue="" disabled hidden selected></option>
                {item.selectData[0].monthsData?.map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <label className="each-label" htmlFor="month">
                Month
              </label>
            </div>
            <div className="container-input gender">
              <select
                className="each-input"
                id="gender"
                name="gender"
                required
                onChange={handleData}
              >
                <option defaultValue="" disabled hidden selected></option>
                {item.selectData[1].genderData?.map((gender, index) => (
                  <option key={index} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
              <label className="each-label" htmlFor="gender">
                Gender
              </label>
            </div>
          </>
        )}

        {/* if i'm in the password page i added like show password checkbox */}
        {item.name === "password" && (
          <>
            {isVisible ? (
              <FontAwesomeIcon
                onClick={() => setIsVisible(!isVisible)}
                className="show-password-icon from-password-information"
                icon={faEyeSlash}
                style={{ color: "#5f6368" }}
              />
            ) : (
              <FontAwesomeIcon
                onClick={() => setIsVisible(!isVisible)}
                icon={faEye}
                style={{ color: "#5f6368" }}
                className="show-password-icon from-password-information"
              />
            )}
          </>
        )}
        <FormButton
          leftBtn={item.leftBtn}
          rightBtn={item.rightBtn}
          from="signin"
        />
      </form>
    </div>
  );
};

export default EachFormSignup;
