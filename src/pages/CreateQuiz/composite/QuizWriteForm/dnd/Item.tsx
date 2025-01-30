import { QuestionFormType } from "@/types/QuizType";
import { forwardRef } from "react";

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  item: QuestionFormType;
}

export const Item = forwardRef<HTMLDivElement, ItemProps>(
  ({ item, ...props }, ref) => {
    return (
      <div {...props} ref={ref}>
        {item.component}
      </div>
    );
  },
);
