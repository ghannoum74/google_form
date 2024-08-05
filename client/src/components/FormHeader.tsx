interface FormHeaderProps {
  header: string;
  caption: string;
}

const FormHeader: React.FC<FormHeaderProps> = ({ header, caption }) => {
  return (
    <>
      <img
        src="https://cdn.pixabay.com/photo/2017/06/19/04/31/logo-2418158_1280.png"
        alt="invalid"
      />
      <h3 className="header">{header}</h3>
      <div className="caption">{caption}</div>
    </>
  );
};

export default FormHeader;
