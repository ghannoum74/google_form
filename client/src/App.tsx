import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./css/App.css";
import PersonalData from "./pages/PersonalData";
import BasicData from "./pages/BasicData";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PersonalData />} />
          <Route path="/basic-information" element={<BasicData />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
