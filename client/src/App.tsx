import { Route, Routes, useLocation } from "react-router-dom";
import "./css/App.css";
import PersonalDataPage from "./pages/signup/PersonalDataPage";
import BasicDataPage from "./pages/signup/BasicDataPage";
import EmailDataPage from "./pages/signup/EmailDataPage";
import PasswordDataPage from "./pages/signup/PasswordDataPage";
import Succesfull from "./pages/Succesfull";
import LoginPage from "./pages/login/LoginPage";
import { AnimatePresence } from "framer-motion";
import PhoneNumberPage from "./pages/signup/PhoneNumberPage";
import PasswordPage from "./pages/login/PasswordPage";
import ForgetEmail from "./pages/login/ForgetEmail";
import FullnameChecking from "./pages/login/FullnameChecking";

function App() {
  const location = useLocation();
  return (
    <>
      <AnimatePresence mode="wait">
        <Routes key={location.pathname} location={location}>
          <Route path="personal-information" element={<PersonalDataPage />} />
          <Route path="basic-information" element={<BasicDataPage />} />
          <Route path="email-information" element={<EmailDataPage />} />
          <Route path="phone-information" element={<PhoneNumberPage />} />
          <Route path="password-information" element={<PasswordDataPage />} />
          <Route path="Succesfull" element={<Succesfull />} />
          <Route path="" element={<LoginPage />} />
          <Route path="/login-password" element={<PasswordPage />} />
          <Route path="/login-forget-email" element={<ForgetEmail />} />
          <Route path="/checking-account-name" element={<FullnameChecking />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
