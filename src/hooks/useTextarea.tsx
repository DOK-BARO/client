import { useState } from "react";

const useTextarea = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return { value, onChange };
};

export default useTextarea;
