import { Dispatch } from "react";
import { SetStateAction } from "jotai";

export interface FormComponentProps {
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

export interface Step {
  order: number;
  icon?: string;
  title: string;
  description?: string;
  formComponent?: (props?: FormComponentProps) => JSX.Element;
  subSteps?: Step[];
  isDone?: boolean;
  sectionId?: string;
  pageLink?: string;
}
