import React from "react";
import { Link } from "react-router-dom";

interface FormButtonProps {
  leftBtn: string;
  rightBtn: string;
}
const FormButton: React.FC<FormButtonProps> = ({ leftBtn, rightBtn }) => {
  return (
    <div className="button-container">
      <Link to="/" className="leftBtn">
        {leftBtn}
      </Link>
      <button className="rightBtn">{rightBtn}</button>
    </div>
  );
};

export default FormButton;
