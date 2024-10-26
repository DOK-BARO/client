import React, { ReactElement } from "react";
import { SVGProps } from "@/types/SVGProps.ts";

export type QuestionFormTypeType = {
  Icon: React.FC<SVGProps>,
  text : string,
  FormComponent : ReactElement,
}
