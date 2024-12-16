import styles from "./_header_quiz_util_list.module.scss";
import { Pencil } from "@/svg/pencil.tsx";
import { CheckSquare } from "@/svg/checkSquare";
import { gray70 } from "@/styles/abstracts/colors.ts";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { isLoggedInAtom } from "@/store/userAtom";

interface HeaderQuizUtilListProps {
  closeDropDownList: () => void;
  openLoginModal: () => void;
}

export default function HeaderQuizUtilList({
  closeDropDownList,
  openLoginModal,
}: HeaderQuizUtilListProps) {
  const navigate = useNavigate();
  const [isLoggedIn] = useAtom(isLoggedInAtom);

  const onClickMakeQuiz = () => {
    closeDropDownList();
    if (!isLoggedIn) {
      navigate("/"); //TODO: 랜딩페이지로 이동
      openLoginModal();
    } else {
      navigate("/create-quiz");
    }
  };

  const onClickDoingQuiz = () => {
    closeDropDownList();
  };

  return (
    // TODO: 버튼으로 만들기
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
