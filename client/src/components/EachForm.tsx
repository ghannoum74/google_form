import { useEffect, useState } from "react";
import FormButton from "./FormButton";
import FormHeader from "./FormHeader";
import useValidation from "../hook/useValidation";

interface InputProps {
  id: number;

  name: string;
  type: string;
  required: boolean;
  label: string;
  errorsMsgs?: string;
}

interface ItemProps {
  id: number;
  header: string;
  caption: string;
  inputs: InputProps[];
  pattern: string;
  leftBtn: string;
  rightBtn: string;
}

interface EachFormProps {
  item: ItemProps;
}

const EachForm: React.FC<EachFormProps> = ({ item }) => {
  const [value, setValue] = useState({});

  // import useValidation hook to validate the value with the pattern
  const { validate, invalidInputs } = useValidation();

  // dispatch to update data

  const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    // first validate the inputs value object
    validate(value, item.pattern);
    console.log(invalidInputs);

    // check after validate in invalidInputs contain any invalid input
    if (invalidInputs.length == 0) {
      console.log("true");
    } else {
      console.log("false");
    }
  };

  useEffect(() => {});
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
              key={input.id}
              required={input.required}
              name={input.name}
              type={input.type}
              onChange={handleData}
            />
            <label className="each-label">{input.label}</label>
            <div className="each-errorMsg">{input.errorsMsgs}</div>
          </div>
        ))}
        <FormButton leftBtn={item.leftBtn} rightBtn={item.rightBtn} />
      </form>
    </div>
  );
};

export default EachForm;
