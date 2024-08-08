/* eslint-disable @typescript-eslint/ban-ts-comment */
import EachFormSignup from "../../components/EachFormSignup";
import AnimatedPages from "../../utilities/AnimatedPages";
import { signupInputsData } from "../../utilities/signupInputsData";

const EmailDataPage = () => {
  return (
    <div className="emailInfo">
      <AnimatedPages>
        {/* @ts-expect-error */}
        <EachFormSignup item={signupInputsData[2]} />
      </AnimatedPages>
    </div>
  );
};

export default EmailDataPage;
