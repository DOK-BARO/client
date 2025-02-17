import { Dispatch } from "react";
import { SetStateAction } from "jotai";

export interface FormComponentType {
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

export interface Step {
  order: number;
  icon?: string;
  title: string;
  description?: string;
  formComponent?: (props?: FormComponentType) => JSX.Element;
  subSteps?: Step[];
  isDone?: boolean;
  sectionId?: string;
  pageLink?: string;
}
