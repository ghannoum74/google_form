import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./css/App.css";
import PersonalDataPage from "./pages/signup/PersonalDataPage";
import BasicDataPage from "./pages/signup/BasicDataPage";
import EmailDataPage from "./pages/signup/EmailDataPage";
import PasswordDataPage from "./pages/signup/PasswordDataPage";
import Succesfull from "./pages/Succesfull";
import LoginPage from "./pages/login/LoginPage";
import { AnimatePresence } from "framer-motion";
import PasswordPage from "./pages/login/passwordPage";

function App() {
  const location = useLocation();
  return (
    <>
      <AnimatePresence mode="wait">
        <Routes key={location.pathname} location={location}>
          <Route path="personal-information" element={<PersonalDataPage />} />
          <Route path="basic-information" element={<BasicDataPage />} />
          <Route path="email-information" element={<EmailDataPage />} />
          <Route path="password-information" element={<PasswordDataPage />} />
          <Route path="Succesfull" element={<Succesfull />} />
          <Route path="" element={<LoginPage />} />
          <Route path="/login-password" element={<PasswordPage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
