import { useState } from "react";

const useValidation = () => {
  const [invalidInputs, setInvalidInputs] = useState<string[]>([]);
  const validate = (value: { [key: string]: string }, pattern: string) => {
    const invalidSet = new Set<string>();
    // pattern in a string so we should convert it to regex object
    const regex = new RegExp(pattern);

    // cz my value passed is object not array or single string i caste it to array and loop through it and test the validation
    Object.keys(value).forEach((key: string) => {
      // check if regex dosen't match push in array so i return the array to display the error message for input in the invalidInputs
      if (!regex.test(value[key].trim())) {
        invalidSet.add(key);
      }
    });
    // in this case validate fct return true or false if the is invalid or not
    // so when i called in my EachForm cmpnt the result is based on this return not on the invalidInputs
    // after checking if validate is false it takes the data from invalidInputs
    const invalidArray = Array.from(invalidSet);
    setInvalidInputs(invalidArray);

    return invalidArray.length === 0;
  };
  return { validate, invalidInputs };
};

export default useValidation;
