import { Route, Routes, useLocation } from "react-router-dom";
import "./css/App.css";
import PersonalDataPage from "./pages/signup/PersonalDataPage";
import BasicDataPage from "./pages/signup/BasicDataPage";
import EmailDataPage from "./pages/signup/EmailDataPage";
import PasswordDataPage from "./pages/signup/PasswordDataPage";
import LoginPage from "./pages/login/LoginPage";
import { AnimatePresence } from "framer-motion";
import PhoneNumberPage from "./pages/signup/PhoneNumberPage";
import PasswordPage from "./pages/login/PasswordPage";
import ForgetEmail from "./pages/login/ForgetEmail";
import FullnameChecking from "./pages/login/FullnameChecking";
import ErrorPage from "./pages/ErrorPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <AnimatePresence mode="wait">
        <Routes key={location.pathname} location={location}>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login-password" element={<PasswordPage />} />
          <Route path="/login-forget-email" element={<ForgetEmail />} />
          <Route path="/checking-account-name" element={<FullnameChecking />} />
          <Route path="/error-page" element={<ErrorPage />} />

          {/* Protected routes */}
          <Route path="/personal-information" element={<PersonalDataPage />} />

          <Route
            path="/basic-information"
            element={
              <ProtectedRoute element={BasicDataPage} current_route="/" />
            }
          />
          <Route
            path="/email-information"
            element={
              <ProtectedRoute element={EmailDataPage} current_route="/" />
            }
          />
          <Route
            path="/phone-information"
            element={
              <ProtectedRoute element={PhoneNumberPage} current_route="/" />
            }
          />
          <Route
            path="/password-information"
            element={
              <ProtectedRoute element={PasswordDataPage} current_route="/" />
            }
          />
          {/* <Route
            path="/successfull"
            element={
              <ProtectedRoute
                element={Succe}
                current_route="/successfull"
              />
            }
          /> */}

          {/* Catch-all route */}
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
