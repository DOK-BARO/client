import styles from "./_quiz_write_form_type_util_list.module.scss";
import {
  QuizWriteFormTypeUtilListItemProps,
} from "@/pages/CreateQuiz/composite/quizWriteForm/quizWriteFormTypeUtilButton.tsx";

// TODO : 뭔가 리팩토링 필요
type Props = {
  onClick: (optionTitle: QuizWriteFormTypeUtilListItemProps) => void;
  list: QuizWriteFormTypeUtilListItemProps[];
}

export default function QuizWriteFormTypeUtilList({ list, onClick } : Props) {

  return (
    <ul className={styles["quiz-write-form-type-util-list"]}>
      {list.map((item) => (
        <QuizWriteFormTypeUtilListItem
          key={item.text}
          {...item}
          onClick={onClick}
        />
      ))}
    </ul>
  );
}



export function QuizWriteFormTypeUtilListItem (item: QuizWriteFormTypeUtilListItemProps & { onClick: (option: QuizWriteFormTypeUtilListItemProps) => void; }) {
  return (
    <li
      onClick={() => item.onClick(item)}
      className={styles["quiz-write-form-type-util-list-item"]}
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