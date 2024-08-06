import EachForm from "../components/EachForm";
import { inputsData } from "../utilities/inputsData";

const BasicData = () => {
  return (
    <div className="BasicInfo">
      <EachForm item={inputsData[1]} />
    </div>
  );
};

export default BasicData;
