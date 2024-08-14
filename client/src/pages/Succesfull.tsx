import {
  faAt,
  faCopy,
  faFloppyDisk,
  faKey,
  faLock,
  faMap,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { clearErrorData, setErrorData } from "../redux/states/ErrorDataSlice";
import { useNavigate } from "react-router-dom";
import { signupInputsData } from "../utilities/signupInputsData";
import { addData } from "../redux/states/FullUserDataSlice";
import PupopPassword from "../components/PupopPassword";
import { AnimatePresence } from "framer-motion";
import useUpdateForm from "../hook/useUpdateForm";
import { toast, ToastContainer } from "react-toastify";
import AnimatedPages from "../utilities/AnimatedPages";
const Successfull = () => {
  const [inputFocused, setInputFocused] = useState("");
  const [invalidBtn, setInvalidBtn] = useState(true);
  const [isPuped, setIsPuped] = useState(false);
  const [data, setData] = useState({});
  const [changableData, setChangableData] = useState({});

  const { update, loading, error } = useUpdateForm();
  const full_data = useSelector((state) => state.fullUserData.user_data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // so now i decod the token to access the id and send my fetch request
  const token = Cookies.get("Token");
  const id_user = jwtDecode(token)._id;

  const fetchUserData = async () => {
    dispatch(clearErrorData());
    try {
      const result = await axios.get(
        `http://localhost:5000/auth/get-user-data/${id_user}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(result.data);
      // Handle successful result here
      dispatch(addData(result.data));
    } catch (error) {
      console.log(error);
      if (error.response) {
        dispatch(setErrorData(error.response.data));
        navigate("/error-page");
      } else {
        dispatch(
          setErrorData({
            status: 500,
            header: "Internal Server Error",
            caption:
              "Oops! Something went wrong on our end. Please try refreshing the page or come back later.",
          })
        );
        navigate("/error-page");
      }
    }
  };

  useEffect(() => {
    if (!full_data || Object.keys(full_data).length === 0) {
      fetchUserData();
    }
  }, []);

  // the buttons will appears only when the data filled by data
  useEffect(() => {
    checkingData(data);
    if (Object.keys(data).length > 0) {
      setInvalidBtn(false);
    }
  }, [data]);

  // handle focus for puop
  const handleInputFocus = (inputName: string) => {
    setInputFocused(inputName);
  };

  // blur for the pupop background
  const handleInputBlur = () => {
    setInputFocused("");
  };

  const handleData = (e: React.ChangeEvent<HTMLElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const checkingData = (data: object) => {
    // Create an object to hold the changed data
    const changedData: { [key: string]: any } = {};

    // Iterate over the keys
    Object.keys(data).forEach((key) => {
      // Check if the value is different from the full_data
      if (data[key] !== full_data[key]) {
        // Add the key and its new value to the changedData object
        changedData[key] = data[key];
      }
    });

    // Set the changed data (both key and value) using setChangableData
    setChangableData(changedData);
  };

  // handle submit form
  const handleForm = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    // check if changable data contain data before send it
    if (Object.keys(changableData).length > 0) {
      const result = await update(changableData, full_data._id);
      if (result) {
        toast.success("Form Updated Successfuly!", { autoClose: 500 });
        setChangableData({});
      } else {
        toast.error("Error with updating...");
      }
    } else {
      toast.error("The data is up to date.", { autoClose: 500 });
    }
  };

  return (
    <>
      {full_data || loading ? (
        <AnimatedPages>
          <ToastContainer />
          <form className="successfulPage" onSubmit={handleForm}>
            <div className="container-successful">
              <div className="header-successful">
                <h3 className="header">User Profile</h3>
                <div className={`buttons ${invalidBtn ? "invalid" : "valid"}`}>
                  <div className="cancel">CANCEL</div>
                  <button className="save" disabled={invalidBtn ? true : false}>
                    <FontAwesomeIcon
                      icon={faFloppyDisk}
                      style={{ color: "#ffffff" }}
                    />
                    <div className="save-btn">SAVE</div>
                  </button>
                </div>
              </div>
              <div className="container-card">
                <div className="basic-card">
                  <div className="card-header">Basic Info</div>
                  <div className="each-card">
                    <div className="container-basic-data">
                      <div className="profile-picture">
                        <img src="" />
                        <input type="file" accept="image/*" />
                      </div>
                      <div className="main-data">
                        <div className="name">
                          {full_data.firstname}&nbsp;{full_data.lastname}
                        </div>
                        <div className="id"></div>
                        <FontAwesomeIcon
                          icon={faCopy}
                          style={{ color: "#5f6368", cursor: "pointer" }}
                          title="copy"
                        />

                        <div
                          className="change-password-btn"
                          onClick={() => setIsPuped(true)}
                        >
                          <FontAwesomeIcon
                            icon={faLock}
                            style={{ color: "#000000" }}
                          />
                          <span>CHANGE PASSWORD</span>
                        </div>
                      </div>
                    </div>
                    <div className="container-inputs">
                      <div className="container-success-box">
                        <label className="success-label">
                          {Object.keys(full_data)[1]}
                        </label>
                        <div
                          className={`wrapper-before ${
                            inputFocused === "firstname" ? "focused" : ""
                          }`}
                          onClick={() => handleInputFocus("firstname")}
                          onBlur={handleInputBlur}
                        >
                          <input
                            type="text"
                            name="firstname"
                            onChange={handleData}
                            className="success-input"
                            pattern="[A-Za-z]+(?:[ \-'][A-Za-z]+)*"
                            title="Sorry, only letters (a-z), numbers (0-9), and periods (.) are allowed."
                            defaultValue={full_data.firstname}
                          />
                        </div>
                      </div>
                      <div className="container-success-box">
                        <label className="success-label">
                          {Object.keys(full_data)[2]}
                        </label>
                        <div
                          className={`wrapper-before ${
                            inputFocused === "lastname" ? "focused" : ""
                          }`}
                          onClick={() => handleInputFocus("lastname")}
                          onBlur={handleInputBlur}
                        >
                          <input
                            type="text"
                            name="lastname"
                            pattern="[A-Za-z]+(?:[ \-'][A-Za-z]+)*"
                            title="Sorry, only letters (a-z), numbers (0-9), and periods (.) are allowed."
                            onChange={handleData}
                            className="success-input"
                            defaultValue={full_data.lastname}
                          />
                        </div>
                      </div>
                      <div className="container-success-box">
                        <label className="success-label">
                          {Object.keys(full_data)[3]}
                        </label>
                        <div
                          className={`wrapper-before ${
                            inputFocused === "day" ? "focused" : ""
                          }`}
                          onClick={() => handleInputFocus("day")}
                          onBlur={handleInputBlur}
                        >
                          <input
                            type="number"
                            name="day"
                            onChange={handleData}
                            className="success-input"
                            min={1}
                            max={30}
                            defaultValue={full_data.day}
                          />
                        </div>
                      </div>
                      <div className="container-success-box">
                        <label className="success-label">
                          {Object.keys(full_data)[5]}
                        </label>
                        <div
                          className={`wrapper-before ${
                            inputFocused === "year" ? "focused" : ""
                          }`}
                          onClick={() => handleInputFocus("year")}
                          onBlur={handleInputBlur}
                        >
                          <input
                            type="number"
                            name="year"
                            onChange={handleData}
                            className="success-input"
                            min={1950}
                            max={2024}
                            defaultValue={full_data.year}
                          />
                        </div>
                      </div>
                      <div className="container-success-box">
                        <label className="success-label">
                          {" "}
                          {Object.keys(full_data)[4]}
                        </label>
                        <div
                          className={`wrapper-before ${
                            inputFocused === "month" ? "focused" : ""
                          }`}
                          onClick={() => handleInputFocus("month")}
                          onBlur={handleInputBlur}
                        >
                          <select
                            className="success-input"
                            id="month"
                            name="month"
                            onChange={handleData}
                            required
                          >
                            <option defaultValue={full_data.month}>
                              {full_data.month}
                            </option>
                            {signupInputsData[1].selectData[0].monthsData?.map(
                              (month, index) => (
                                <option key={index} defaultValue={month}>
                                  {month}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </div>
                      <div className="container-success-box">
                        <label className="success-label">
                          {Object.keys(full_data)[6]}
                        </label>
                        <div
                          className={`wrapper-before ${
                            inputFocused === "gender" ? "focused" : ""
                          }`}
                          onClick={() => handleInputFocus("gender")}
                          onBlur={handleInputBlur}
                        >
                          <select
                            className="success-input"
                            onChange={handleData}
                            id="gender"
                            name="gender"
                            required
                          >
                            <option>{full_data.gender}</option>
                            {signupInputsData[1].selectData[1].genderData?.map(
                              (gender, index) => (
                                <option key={index} defaultValue={gender}>
                                  {gender}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container-last-cards">
                  <div className="basic-card">
                    <div className="card-header">Contacts</div>
                    <div className="each-card">
                      <div className="container-basic-data">
                        <FontAwesomeIcon
                          icon={faAt}
                          style={{ color: "#f44336" }}
                          className="at-sign"
                        />
                        <div className="main-data">
                          <div className="name">{full_data.phoneNumber}</div>
                          <div className="id">{full_data.email}</div>
                          <FontAwesomeIcon
                            icon={faCopy}
                            style={{ color: "#5f6368", cursor: "pointer" }}
                            title="copy"
                          />
                        </div>
                      </div>
                      <div className="container-inputs">
                        <div className="container-success-box">
                          <label className="success-label">
                            {Object.keys(full_data)[8]}
                          </label>
                          <div
                            className={`wrapper-before ${
                              inputFocused === "phonenumber" ? "focused" : ""
                            }`}
                            onClick={() => handleInputFocus("phonenumber")}
                            onBlur={handleInputBlur}
                          >
                            <input
                              type="text"
                              name="phoneNumber"
                              onChange={handleData}
                              className="success-input"
                              pattern="^(81|76|77|03|71|70)[0-9]{6}$"
                              title="phone number should contain 8 digits start by (81|71|76|03|70) without any space or special charactere"
                              defaultValue={full_data.phoneNumber}
                            />
                          </div>
                        </div>
                        <div className="container-success-box">
                          <label className="success-label">
                            {Object.keys(full_data)[7]}
                          </label>
                          <div
                            className={`wrapper-before ${
                              inputFocused === "email" ? "focused" : ""
                            }`}
                            onClick={() => handleInputFocus("email")}
                            onBlur={handleInputBlur}
                          >
                            <input
                              type="text"
                              className="success-input"
                              defaultValue={full_data.email}
                              title="you cannot change the email"
                              disabled
                              style={{ cursor: "not-allowed" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="basic-card">
                    <div className="card-header">Address</div>
                    <div className="each-card">
                      <div className="container-basic-data">
                        <FontAwesomeIcon
                          icon={faKey}
                          style={{ color: "#03a9f4" }}
                          className="lock-icon"
                        />
                        <div className="main-data">
                          <div className="name">Password</div>
                        </div>
                      </div>
                      <div className="container-inputs">
                        <div className="container-success-box">
                          <label className="success-label">
                            {Object.keys(full_data)[9]}
                          </label>
                          <div
                            className={`wrapper-before ${
                              inputFocused === "password" ? "focused" : ""
                            }`}
                            onClick={() => handleInputFocus("password")}
                            onBlur={handleInputBlur}
                          >
                            <input
                              type="password"
                              style={{ cursor: "not-allowed" }}
                              className="success-input"
                              defaultValue={full_data.password}
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <AnimatePresence>
              {isPuped && (
                <PupopPassword togglePupop={isPuped} setToggle={setIsPuped} />
              )}
            </AnimatePresence>
          </form>
        </AnimatedPages>
      ) : (
        <span className="loader"></span>
      )}
    </>
  );
};

export default Successfull;
