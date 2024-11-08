import { useState } from "react";

const useRadioGroup = (initialValue: string|null) => {
  const [selectedValue, setSelectedValue] = useState<string|null>(initialValue);
  const handleChange = (value: string|null) => {
    setSelectedValue(value);
  };
  return { selectedValue, handleChange };
};

export default useRadioGroup;