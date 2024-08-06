import EachForm from "../../components/EachForm";
import AnimatedPages from "../../utilities/AnimatedPages";
import { inputsData } from "../../utilities/inputsData";

const BasicDataPage = () => {
  return (
    <div className="BasicInfo">
      <AnimatedPages>
        <EachForm item={inputsData[1]} />
      </AnimatedPages>
    </div>
  );
};

export default BasicDataPage;
