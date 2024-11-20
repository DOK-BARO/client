import { useState } from "react";

const useRadioGroup = (initialValue: string|null) => {
  const [selectedValue, setSelectedValue] = useState<string|null>(initialValue);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };
  return { selectedValue, handleChange };
};

export default useRadioGroup;