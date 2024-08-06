import EachForm from "../../components/EachForm";
import AnimatedPages from "../../utilities/AnimatedPages";
import { inputsData } from "../../utilities/inputsData";

const PasswordDataPage = () => {
  return (
    <div className="passwordInfo" style={{ position: "relative" }}>
      <AnimatedPages>
        <EachForm item={inputsData[3]} />
      </AnimatedPages>
    </div>
  );
};

export default PasswordDataPage;
