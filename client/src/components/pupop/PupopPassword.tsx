import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import useUpdateForm from "../../hook/useUpdateForm";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

const PupopPassword = ({ setIsPuped }) => {
  const [data, setData] = useState<object>({});
  const [isVisible, setIsVisible] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  const { update, loading, error } = useUpdateForm();
  const full_data = useSelector((state) => state.fullUserData.user_data);

  const handleData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setData({ [name]: value });
  };

  const handleForm = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const match = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$"
    ).test(data["password"]);
    if (match) {
      setInvalidPassword(false);
      const result = await update(data, full_data._id);
      if (result) {
        toast.success("Form Updated Successfuly!", { autoClose: 500 });
        console.log(full_data);
        setData({});
        setIsPuped(false);
      } else {
        toast.error("Error with updating...");
        setIsPuped(false);
      }
    } else {
      setInvalidPassword(true);
    }
  };

  return (
    <form className="container-pupop" onSubmit={handleForm}>
      {/* <ToastContainer /> */}
      <h2 className="header">Create new password</h2>
      <div className="caption" style={{ margin: 0 }}>
        Password
      </div>
      <div className="container-input" style={{ zIndex: "1" }}>
        <div className="wrapper-input-passwordIcon">
          <input
            className="each-input"
            name="password"
            maxLength={40}
            required
            type={isVisible ? "text" : "password"}
            value={data["password"]}
            onChange={handleData}
          />
          <label className="each-label">Enter new Password</label>
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
          strong password should contain Minimum 8 characters. At least one
          uppercase letter. At least one lowercase letter. At least one number.
          At least one special character (e.g., !@#$%^&*).
        </div>
        <div className="wrapper-input-passwordIcon">
          <input
            className="each-input"
            name="password"
            maxLength={30}
            required
            type={isVisible ? "text" : "password"}
            value={data["password"]}
            onChange={handleData}
          />
          <label className="each-label">confirm your password</label>
        </div>
      </div>

      <div
        onClick={handleForm}
        className="pupop-submit"
        style={{ marginTop: 0, textAlign: "center" }}
      >
        Confirm
      </div>
    </form>
  );
};
export default PupopPassword;
