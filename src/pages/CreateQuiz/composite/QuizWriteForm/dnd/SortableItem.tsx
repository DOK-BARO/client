import { QuestionFormType } from "@/types/QuizType";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cloneElement, CSSProperties, ReactElement } from "react";

export const SortableItem = ({ item }: { item: QuestionFormType }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item.id,
    });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const formItemComponent = cloneElement(item.component as ReactElement, {
    dragHandleProps: {
      attributes,
      listeners,
    },
  });
  return (
    <div ref={setNodeRef} style={style} {...listeners}>
      {formItemComponent}
    </div>
  );
};
