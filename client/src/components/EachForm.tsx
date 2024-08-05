import FormHeader from "../utilities/FormHeader";

interface InputProps {
  id: number;

  name: string;
  type: string;
  required: boolean;
  pattern?: string;
  label: string;
  errorsMsgs?: string;
}

interface ItemProps {
  id: number;
  header: string;
  caption: string;
  inputs: InputProps[];
  leftBtn: string;
  rightBtn: string;
}

interface EachFormProps {
  item: ItemProps;
}

const EachForm: React.FC<EachFormProps> = ({ item }) => {
  console.log(item);
  return (
    <div className="form-container" key={item.id}>
      <FormHeader header={item.header} caption={item.caption} />
      <form>
        {item.inputs.map((input) => (
          <>
            <input
              key={input.id}
              required={input.required}
              name={input.name}
              type={input.type}
              pattern={input.pattern}
            />
            <label>{input.label}</label>
            <div className="errormsg">{input.errorsMsgs}</div>
          </>
        ))}
        <div className="btns">
          <button className="leftBtn">{item.leftBtn}</button>
          <button className="leftBtn">{item.rightBtn}</button>
        </div>
      </form>
    </div>
  );
};

export default EachForm;
