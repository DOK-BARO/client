import styles from "./_header_quiz_util_list.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import pencil from "/public/assets/svg/header/pencil.svg";
import checkSquare from "/public/assets/svg/header/check-square.svg";
import ROUTES from "@/data/routes";
import useLoginAction from "@/hooks/useLoginAction";
import toast from "react-hot-toast";
interface HeaderQuizUtilListProps {
  closeDropDownList: () => void;
}

export default function HeaderQuizUtilList({
  closeDropDownList,
}: HeaderQuizUtilListProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleAuthenticatedAction } = useLoginAction();

  const onClickMakeQuiz = () => {
    closeDropDownList();
    handleAuthenticatedAction(() => navigate(ROUTES.CREATE_QUIZ()));
  };

  const onClickDoingQuiz = () => {
    closeDropDownList();
    if (location.pathname === ROUTES.BOOK_LIST) {
      toast("퀴즈를 풀 책을 선택해 주세요.", {
        icon: "🔍",
      });
    }
    navigate(ROUTES.BOOK_LIST);
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
