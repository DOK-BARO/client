import React, { ReactElement } from "react";
import { SVGProps } from "@/types/SVGProps.ts";

export type QuestionFormTypeType = {
  Icon: React.FC<SVGProps>,
  text : string,
  typeFlag: "OX" | "FILL_BLANK" | "MULTIPLE_CHOICE" | "SHORT" | "CHECK_BOX";
  FormComponent : ReactElement,
}
