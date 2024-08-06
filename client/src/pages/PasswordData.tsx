import EachForm from "../components/EachForm";
import { inputsData } from "../utilities/inputsData";

const PasswordData = () => {
  return (
    <div className="passwordInfo" style={{ position: "relative" }}>
      <EachForm item={inputsData[3]} />
    </div>
  );
};

export default PasswordData;
