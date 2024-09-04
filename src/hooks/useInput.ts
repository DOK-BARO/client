import { useState } from "react";

interface UseInputReturn {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetInput: (newInitialValue?: string) => void;
}

const useInput = (initialValue: string): UseInputReturn => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const resetInput = (newInitialValue: string = initialValue) => {
    setValue(newInitialValue);
  };

  return { value, onChange, resetInput };
};
export default useInput;
