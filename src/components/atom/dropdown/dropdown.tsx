import React from "react";
import styles from "../../styles/components/_dropdown.module.scss";

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  options: Option[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  size?: "large" | "medium" | "small";
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onChange,
  value,
  size = "medium",
}) => {
  const className = `${styles.dropdown} ${styles[`dropdown--${size}`]}`;
  return (
    <select onChange={onChange} value={value} className={className}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
