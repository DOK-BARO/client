import { ReactElement } from "react";
// TODO: multipleChoiceQuizForm과 겹치는 부분 리팩토링 필요

export interface CheckBoxOption {
  id: number;
  value: string;
  label: string;
  answerIndex?: number;
}

export interface CheckBoxProps {
  option: CheckBoxOption;
  selectedValue: string;
  onChange: (value: string) => void;
  isDisabled: boolean;
  className?: string;
  autoFocus: boolean;
  icon?: ReactElement | null;
  LabelComponent: ReactElement;
}
