import React from "react";

interface FormButtonProps {
  leftBtn: string;
  rightBtn: string;
}
const FormButton: React.FC<FormButtonProps> = ({ leftBtn, rightBtn }) => {
  return (
    <div className="button-container">
      <a className="leftBtn">{leftBtn}</a>
      <button className="rightBtn">{rightBtn}</button>
    </div>
  );
};

export default FormButton;
