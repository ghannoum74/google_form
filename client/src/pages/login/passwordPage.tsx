/* eslint-disable @typescript-eslint/ban-ts-comment */
import EachFormLogin from "../../components/EachFormLogin";
import AnimatedPages from "../../utilities/AnimatedPages";
import { loginInputsData } from "../../utilities/loginInputsData";

const PasswordPage = () => {
  return (
    <div className="PasswordPage">
      <AnimatedPages>
        {/* @ts-expect-error */}
        <EachFormLogin item={loginInputsData[1]} />
      </AnimatedPages>
    </div>
  );
};

export default PasswordPage;
