import EachForm from "../../components/EachForm";
import AnimatedPages from "../../utilities/AnimatedPages";
import { inputsData } from "../../utilities/inputsData";

const PersonalDataPage = () => {
  return (
    <div className="PersonalData">
      <AnimatedPages>
        <EachForm item={inputsData[0]} />
      </AnimatedPages>
    </div>
  );
};

export default PersonalDataPage;
