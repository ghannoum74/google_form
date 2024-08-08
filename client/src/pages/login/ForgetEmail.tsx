/* eslint-disable @typescript-eslint/ban-ts-comment */
import EachFormLogin from "../../components/EachFormLogin";
import AnimatedPages from "../../utilities/AnimatedPages";
import { loginInputsData } from "../../utilities/loginInputsData";

const ForgetEmail = () => {
  return (
    <div className="loginPage">
      <AnimatedPages>
        {/* @ts-expect-error */}
        <EachFormLogin item={loginInputsData[2]} />
      </AnimatedPages>
    </div>
  );
};

export default ForgetEmail;
