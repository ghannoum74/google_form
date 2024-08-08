/* eslint-disable @typescript-eslint/ban-ts-comment */
import EachFormSignup from "../../components/EachFormSignup";
import AnimatedPages from "../../utilities/AnimatedPages";
import { signupInputsData } from "../../utilities/signupInputsData";

const PasswordDataPage = () => {
  return (
    <div className="passwordInfo" style={{ position: "relative" }}>
      <AnimatedPages>
        {/* @ts-expect-error */}
        <EachFormSignup item={signupInputsData[4]} />
      </AnimatedPages>
    </div>
  );
};

export default PasswordDataPage;
