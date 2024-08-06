import React, { useState } from "react";
import FormButton from "./FormButton";
import FormHeader from "./FormHeader";
import useValidation from "../hook/useValidation";
import { useDispatch } from "react-redux";
import { updateData } from "../redux/states/fullDataSlice";
import { useNavigate } from "react-router-dom";

interface InputProps {
  id: number;
  name: string;
  type: string;
  required: boolean;
  label: string;
  errorsMsgs?: string;
  min?: number | string;
  max?: number | string;
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

interface EachFormProps {
  item: ItemProps;
}

const EachForm: React.FC<EachFormProps> = ({ item }) => {
  // this state like general state so each component put in it key input and value different to the next component so you cannot initialize it
  // and after each succesfull entered data and goes to the next route it dispatch the useState's data and store it to redux store
  const [value, setValue] = useState({});

  // import useValidation hook to validate the value with the pattern
  const { validate, invalidInputs } = useValidation();
  // console.log(invalidInputs);

  // dispatch to update data
  const dispatch = useDispatch();

  // to navigate to the next route when everything is done
  const navigate = useNavigate();

  // it's a bad way to toggle password but i should like that to not modify the EachForm
  const togglePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkbox = e.target;

    const container = checkbox.parentElement?.parentElement;
    const input = (container?.children[0] as HTMLDivElement)
      .children[0] as HTMLInputElement;
    input.type = checkbox.checked ? "text" : "password";
  };

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

  return (
    <div className="form-container" key={item.id}>
      <FormHeader header={item.header} caption={item.caption} />
      <form className="auth-form" onSubmit={handleForm}>
        {item.inputs.map((input) => (
          <div
            className={`container-input ${
              invalidInputs.includes(input.name) ? "invalid" : ""
            }`}
            key={input.id}
          >
            <input
              className="each-input"
              required={input.required}
              name={input.name}
              type={input.type}
              min={input.min}
              max={input.max}
              onChange={handleData}
            />
            <label className="each-label">{input.label}</label>
            <div className="each-errorMsg">{input.errorsMsgs}</div>
          </div>
        ))}

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
            <div className="checkbox-password ">
              <input
                type="checkbox"
                id="checkbox"
                name="checkbox"
                value="Bike"
                onChange={togglePassword}
              />
              <label htmlFor="checkbox"> show password</label>
            </div>
          </>
        )}
        <FormButton leftBtn={item.leftBtn} rightBtn={item.rightBtn} />
      </form>
    </div>
  );
};

export default EachForm;
