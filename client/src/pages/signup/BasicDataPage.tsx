/* eslint-disable @typescript-eslint/ban-ts-comment */
import EachFormSignup from "../../components/signup/EachFormSignup";
import AnimatedPages from "../../utilities/AnimatedPages";
import { signupInputsData } from "../../utilities/signupInputsData";

const BasicDataPage = () => {
  return (
    <div className="BasicInfo">
      <AnimatedPages>
        {/* @ts-expect-error */}
        <EachFormSignup item={signupInputsData[1]} />
      </AnimatedPages>
    </div>
  );
};

export default BasicDataPage;
