import { useState } from "react";

const useTextarea = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const resetTextarea = (
    newInitialValue: string | undefined = initialValue
  ) => {
    setValue(newInitialValue);
  };

  return { value, onChange, resetTextarea };
};

export default useTextarea;
