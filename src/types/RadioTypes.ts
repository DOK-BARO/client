export interface RadioOptions {
  id: number;
  value: string;
  label: string;
}

export interface RadioButtonProps {
  options: RadioOptions[];
  selectedValue: string;
  onChange: (value: string) => void;
  correctOption : string | null;
  isDisabled: boolean;
}
