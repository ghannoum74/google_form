/* eslint-disable @typescript-eslint/ban-ts-comment */

import EachFormLogin from "../../../components/login/EachFormLogin";
import AnimatedPages from "../../../utilities/AnimatedPages";
import { loginInputsData } from "../../../utilities/loginInputsData";

const Forget = () => {
  return (
    <div className="forgetEmail">
      <AnimatedPages>
        {/* @ts-expect-error */}
        <EachFormLogin item={loginInputsData[2]} />
      </AnimatedPages>
    </div>
  );
};

export default Forget;
