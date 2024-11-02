import { ReactElement } from "react";

export interface RadioOption {
  id: number;
  value: string;
  label: string;
}

export interface RadioButtonProps {
  option: RadioOption;
  selectedValue: string;
  onChange: (value: string) => void;
  isDisabled: boolean;
  className?: string;
  autoFocus : boolean;
  icon?: ReactElement | null;
  radioGroupName: string;
  LabelComponent: ReactElement;
}
