import React from "react";
import { Link } from "react-router-dom";

interface FormButtonProps {
  leftBtn: string;
  rightBtn: string;
  from: string;
}
const FormButton: React.FC<FormButtonProps> = ({ leftBtn, rightBtn, from }) => {
  return (
    <div className="button-container">
      <Link
        to={from === "signin" ? "/" : "/personal-information"}
        className="leftBtn"
      >
        {leftBtn}
      </Link>
      <button className="rightBtn">{rightBtn}</button>
    </div>
  );
};

export default FormButton;
