import EachForm from "../components/EachForm";
import { inputsData } from "../utilities/inputsData";

const Fullname = () => {
  return (
    <div className="fullname">
      {inputsData.map((item) => (
        <EachForm key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Fullname;
