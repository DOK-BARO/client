import styles from "./_header_quiz_util_list.module.scss";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { isLoggedInAtom } from "@/store/userAtom";
import pencil from "/public/assets/svg/header/pencil.svg";
import checkSquare from "/public/assets/svg/header/check-square.svg";
import ROUTES from "@/data/routes";
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
      navigate(ROUTES.ROOT); //TODO: 랜딩페이지로 이동
      openLoginModal();
    } else {
      navigate(ROUTES.CREATE_QUIZ);
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
        <img src={pencil} width={24} height={24} alt="" />
        <span>퀴즈 만들기</span>
      </li>
      <li
        onClick={onClickDoingQuiz}
        className={styles["header-quiz-util-list-item"]}
      >
        <img src={checkSquare} width={24} height={24} />
        <span>퀴즈 풀기</span>
      </li>
    </ul>
  );
}
