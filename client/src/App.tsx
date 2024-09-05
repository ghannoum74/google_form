import { Route, Routes } from "react-router-dom";
import "./css/App.css";
import PersonalDataPage from "./pages/signup/PersonalDataPage";
import ErrorPage from "./pages/ErrorPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AnimatePresence } from "framer-motion";
import PasswordPage from "./pages/login/PasswordPage";
import LoginPage from "./pages/login/LoginPage";
import FullnameChecking from "./pages/login/FullnameChecking";
import BasicDataPage from "./pages/signup/BasicDataPage";
import EmailDataPage from "./pages/signup/EmailDataPage";
import PhoneNumberPage from "./pages/signup/PhoneNumberPage";
import PasswordDataPage from "./pages/signup/PasswordDataPage";
import Successfull from "./pages/Succesfull";
import Forget from "./pages/login/forgetPages/Forget";

function App() {
  return (
    <>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login-password" element={<PasswordPage />} />
          <Route path="login-forget" element={<Forget />} />
          <Route path="/checking-account-name" element={<FullnameChecking />} />
          <Route path="/error-page" element={<ErrorPage />} />

          {/* Protected routes */}
          <Route path="/personal-information" element={<PersonalDataPage />} />
          <Route
            path="/basic-information"
            element={<ProtectedRoute element={BasicDataPage} />}
          />
          <Route
            path="/email-information"
            element={<ProtectedRoute element={EmailDataPage} />}
          />
          <Route
            path="/phone-information"
            element={<ProtectedRoute element={PhoneNumberPage} />}
          />
          <Route
            path="/password-information"
            element={<ProtectedRoute element={PasswordDataPage} />}
          />
          <Route path="/successfull" element={<Successfull />} />

          {/* Catch-all route */}
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
