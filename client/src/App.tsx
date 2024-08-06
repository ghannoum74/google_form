import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./css/App.css";
import PersonalData from "./pages/PersonalData";
import BasicData from "./pages/BasicData";
import EmailData from "./pages/EmailData";
import PasswordData from "./pages/PasswordData";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PersonalData />} />
          <Route path="/basic-information" element={<BasicData />} />
          <Route path="/email-information" element={<EmailData />} />
          <Route path="/password-information" element={<PasswordData />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
