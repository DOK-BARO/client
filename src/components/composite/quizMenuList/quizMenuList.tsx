import styles from "./_header_quiz_util_list.module.scss";
import { Pencil } from "@/svg/pencil.tsx";
import { CheckSquare } from "@/svg/checkSquare";
import { gray70 } from "@/styles/abstracts/colors.ts";
import { useNavigate } from "react-router-dom";
import { useQueryCurrentUser } from "@/hooks/useQueryCurrentUser.ts";
type Props = {
  closeDropDownList: () => void;
};

export default function HeaderQuizUtilList({ closeDropDownList }: Props) {
  const navigate = useNavigate();
  const { isLoggedIn }= useQueryCurrentUser();

  const onClickMakeQuiz = () => {
    closeDropDownList();
    if(!isLoggedIn) {
      navigate("/",  { state: { openModal: true } }); //TODO: 랜딩페이지로 이동
    }else{
      navigate("/create-quiz");
    }
  };

  const onClickDoingQuiz = () => {
    closeDropDownList();
  };

  return (
    <ul className={styles["header-quiz-util-list"]}>
      <li
        onClick={onClickMakeQuiz}
        className={styles["header-quiz-util-list-item"]}
      >
        <Pencil
          className={styles["header-quiz-util-icon"]}
          width={24}
          height={24}
          stroke={gray70}
        />
        <span>퀴즈 만들기</span>
      </li>
      <li
        onClick={onClickDoingQuiz}
        className={styles["header-quiz-util-list-item"]}
      >
        <CheckSquare
          className={styles["header-quiz-util-icon"]}
          width={24}
          height={24}
          stroke={gray70}
          alt=""
        />
        <span>퀴즈 풀기</span>
      </li>
    </ul>
  );
}
