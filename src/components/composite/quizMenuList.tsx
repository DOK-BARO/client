import styles from "../../styles/composite/_header_quiz_util_list.module.scss";
import { PencilIcon } from "../../../public/assets/svg/pencilIcon.tsx";
import { CheckSquareIcon } from "../../../public/assets/svg/checkSquareIcon.tsx";
type Props = {
  closeDropDownList : () => void;
}

export default function HeaderQuizUtilList({ closeDropDownList } : Props) {
  const onClickMakeQuiz = () => {
    closeDropDownList();
  };
  
  const onClickDoingQuiz = () => {
    closeDropDownList();
  };

  return (
    <ul className={styles["header-quiz-util-list"]}>
      <li onClick={onClickMakeQuiz}  className={styles["header-quiz-util-list-item"]}>
        <PencilIcon className={styles["header-quiz-util-icon"]} width={24} height={24}/>
        <span>퀴즈 만들기</span>
      </li>
      <li onClick={onClickDoingQuiz}  className={styles["header-quiz-util-list-item"]}>
        <CheckSquareIcon className={styles["header-quiz-util-icon"]} width={24} height={24}/>
        <span>퀴즈 풀기</span>
      </li>
    </ul>
  );
}