import styles from "../../styles/composite/_header_quiz_util_list.module.scss";
import { Pencil } from "../../../public/assets/svg/pencil.tsx";
import { CheckSquare } from "../../../public/assets/svg/checkSquare.tsx";
import { gray70 } from "../../styles/abstracts/colors.ts";
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
        <Pencil className={styles["header-quiz-util-icon"]} width={24} height={24} stroke={gray70}/>
        <span>퀴즈 만들기</span>
      </li>
      <li onClick={onClickDoingQuiz}  className={styles["header-quiz-util-list-item"]}>
        <CheckSquare className={styles["header-quiz-util-icon"]} width={24} height={24} stroke={gray70} alt="" />
        <span>퀴즈 풀기</span>
      </li>
    </ul>
  );
}