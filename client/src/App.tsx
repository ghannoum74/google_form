import "./App.css";
import EachForm from "./components/EachForm";
import { inputsData } from "./utilities/inputsData";

function App() {
  return (
    <>
      {inputsData.map((item) => (
        <EachForm key={item.id} item={item} />
      ))}
    </>
  );
}

export default App;
