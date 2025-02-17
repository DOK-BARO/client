import { gray60 } from "@/styles/abstracts/colors";
import styles from "./_question_form.module.scss";
import { QuestionTemplateType } from "@/types/QuestionTemplateType";

interface Props {
  onClick: (optionTitle: QuestionTemplateType) => void;
  list: QuestionTemplateType[];
}

export default function QuestionTemplateUtilList({ list, onClick }: Props) {
  return (
    <ul
      className={styles["question-template-type-util-list"]}
      data-no-dnd="true"
    >
      {list.map((item) => (
        <QuestionTemplateUtilListItem
          key={item.text}
          {...item}
          onClick={onClick}
        />
      ))}
    </ul>
  );
}

export function QuestionTemplateUtilListItem(
  item: QuestionTemplateType & {
    onClick: (option: QuestionTemplateType) => void;
  },
) {
  return (
    <li
      onClick={() => item.onClick(item)}
      className={styles["question-template-type-util-list-item"]}
    >
      <item.Icon width={18} height={18} stroke={gray60} />
      <span>{item.text}</span>
    </li>
  );
}
