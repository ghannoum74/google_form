/* eslint-disable @typescript-eslint/ban-ts-comment */
import EachFormLogin from "../../components/login/EachFormLogin";
import AnimatedPages from "../../utilities/AnimatedPages";
import { loginInputsData } from "../../utilities/loginInputsData";

const FullnameChecking = () => {
  return (
    <div className="loginPage">
      <AnimatedPages>
        {/* @ts-expect-error */}
        <EachFormLogin item={loginInputsData[3]} />
      </AnimatedPages>
    </div>
  );
};

export default FullnameChecking;
