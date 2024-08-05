const useValidation = () => {
  const invalidInputs: string[] = [];
  const validate = (value: { [key: string]: string }, pattern: string) => {
    // pattern in a string so we should convert it to regex object
    const regex = new RegExp(pattern);

    // cz my value passed is object not array or single string i caste it to array and loop through it and test the validation
    Object.keys(value).forEach((key: string) => {
      // check if regex dosen't match push in array so i return the array to display the error message for input in the invalidInputs
      if (!regex.test(value[key])) {
        invalidInputs.push(key);
      }
    });
  };
  return { validate, invalidInputs };
};

export default useValidation;
