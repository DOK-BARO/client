import { useState } from "react";

interface UseInputReturn {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetInput: (newInitialValue?: string) => void;
  isValid: boolean;
}

const useInput = (
  initialValue: string,
  validate?: (value: string) => boolean
): UseInputReturn => {
  const [value, setValue] = useState<string>(initialValue);
  const [isValid, setIsValid] = useState<boolean>(true);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    setValue(inputValue);

    if (validate) {
      setIsValid(validate(inputValue));
    }
  };
  const resetInput = (newInitialValue: string = initialValue) => {
    setValue(newInitialValue);
  };

  return { value, onChange, resetInput, isValid };
};
export default useInput;
