/* eslint-disable @typescript-eslint/ban-ts-comment */
import EachFormSignup from "../../components/signup/EachFormSignup";
import AnimatedPages from "../../utilities/AnimatedPages";
import { signupInputsData } from "../../utilities/signupInputsData";

const PersonalDataPage = () => {
  return (
    <div className="PersonalData">
      <AnimatedPages>
        {/* @ts-expect-error */}
        <EachFormSignup item={signupInputsData[0]} />
      </AnimatedPages>
    </div>
  );
};

export default PersonalDataPage;
