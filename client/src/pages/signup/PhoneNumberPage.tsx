/* eslint-disable @typescript-eslint/ban-ts-comment */
import EachFormSignup from "../../components/EachFormSignup";
import AnimatedPages from "../../utilities/AnimatedPages";
import { signupInputsData } from "../../utilities/signupInputsData";

const PhoneNumberPage = () => {
  return (
    <div className="phoneNumberInfo">
      <AnimatedPages>
        {/* @ts-expect-error */}
        <EachFormSignup item={signupInputsData[3]} />
      </AnimatedPages>
    </div>
  );
};

export default PhoneNumberPage;
