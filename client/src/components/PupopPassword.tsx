import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, useState } from "react";
import AnimatedPopup from "../utilities/AnimatedPopup";

interface PupopPasswordProps {
  togglePupop: boolean;
  setToggle: (value: boolean) => void;
}
const PupopPassword: React.FC<PupopPasswordProps> = ({
  togglePupop,
  setToggle,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState<object>({});
  const handleData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setValue((prev) => ({ ...prev, [name]: value }));
  };

  const handlePopupClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`bg ${togglePupop ? "visible" : ""}`}
      onClick={() => setToggle(false)}
    >
      <AnimatedPopup isVisible={togglePupop}>
        <div className="container-pupop" onClick={handlePopupClick}>
          <h2 className="header">Enter your password</h2>
          <div className="caption">Password</div>
          <div className="container-input" style={{ zIndex: "1" }}>
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
              {/* if i'm in the password page i added like show password checkbox */}
              {isVisible ? (
                <FontAwesomeIcon
                  onClick={() => setIsVisible(!isVisible)}
                  className="show-password-icon "
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
            </div>
          </div>
          <div className="button">
            <button className="pupop-submit">Ok</button>
          </div>
        </div>
      </AnimatedPopup>
    </div>
  );
};
export default PupopPassword;
