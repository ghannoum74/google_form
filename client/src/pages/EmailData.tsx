import EachForm from "../components/EachForm";
import { inputsData } from "../utilities/inputsData";

const EmailData = () => {
  return (
    <div className="emailInfo">
      <EachForm item={inputsData[2]} />
    </div>
  );
};

export default EmailData;
