import React, { ReactElement } from "react";
import { SVGProps } from "@/types/SVGProps.ts";

export type QuestionTemplateType = {
  Icon: React.FC<SVGProps>;
  text: string;
  answerType:
    | "OX"
    | "FILL_BLANK"
    | "MULTIPLE_CHOICE_SINGLE_ANSWER"
    | "SHORT"
    | "MULTIPLE_CHOICE_MULTIPLE_ANSWER";
  FormComponent: ReactElement;
};
