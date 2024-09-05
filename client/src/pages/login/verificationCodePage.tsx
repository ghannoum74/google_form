/* eslint-disable @typescript-eslint/ban-ts-comment */
import EachFormLogin from "../../components/login/EachFormLogin";
import AnimatedPages from "../../utilities/AnimatedPages";
import { loginInputsData } from "../../utilities/loginInputsData";
const verificationCodePage = () => {
  return (
    <div className="verificationPage">
      <AnimatedPages>
        {/* @ts-expect-error */}
        <EachFormLogin item={loginInputsData[4]} />
      </AnimatedPages>
    </div>
  );
};

export default verificationCodePage;
