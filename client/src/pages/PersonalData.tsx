import EachForm from "../components/EachForm";
import { inputsData } from "../utilities/inputsData";

const PersonalData = () => {
  return (
    <div className="PersonalData">
      <EachForm item={inputsData[0]} />
    </div>
  );
};

export default PersonalData;
