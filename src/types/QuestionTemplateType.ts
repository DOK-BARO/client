import React, { ReactElement } from "react";
import { SVGProps } from "@/types/SVGProps.ts";

export type QuestionTemplateType = {
  Icon: React.FC<SVGProps>,
  text : string,
  answerType: "OX" | "FILL_BLANK" | "MULTIPLE_CHOICE" | "SHORT" | "CHECK_BOX";
  FormComponent : ReactElement,
}
