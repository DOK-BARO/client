import styles from "./_question_form.module.scss";
import { QuestionTemplateType } from "@/types/QuestionFormTypeType.ts";

type Props = {
  onClick: (optionTitle: QuestionTemplateType) => void;
  list: QuestionTemplateType[];
}

export default function QuestionTemplateUtilList({ list, onClick } : Props) {

  return (
    <ul className={styles["question-template-type-util-list"]}>
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



export function QuestionTemplateUtilListItem (item: QuestionTemplateType & { onClick: (option: QuestionTemplateType) => void; }) {
  return (
    <li
      onClick={() => item.onClick(item)}
      className={styles["question-template-type-util-list-item"]}
    >
      <item.Icon
        width={24}
        height={24}
        stroke={"black"}
      />
      <span>{item.text}</span>
    </li>
  );
}