import EachForm from "../../components/EachForm";
import AnimatedPages from "../../utilities/AnimatedPages";
import { inputsData } from "../../utilities/inputsData";

const EmailDataPage = () => {
  return (
    <div className="emailInfo">
      <AnimatedPages>
        <EachForm item={inputsData[2]} />
      </AnimatedPages>
    </div>
  );
};

export default EmailDataPage;
