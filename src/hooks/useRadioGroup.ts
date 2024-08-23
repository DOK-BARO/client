import { useState } from "react";

const useRadioGroup = (initialValue: string) => {
  const [selectedValue, setSelectedValue] = useState<string>(initialValue);
  const handleChange = (value: string) => {
    setSelectedValue(value);
  };
  return { selectedValue, handleChange };
};

export default useRadioGroup;